import type { RequiredAtLeastOne } from '$lib/types/generics';
import type { ConstArray } from '$lib/types/objects';
import type { NodeIdType } from './Graph';
import Graph from './Graph';

type SocketIdType = string;

/**
 * has value 0-3 to represent all states within a turn
 * (X move 1, X move 2, Y move 1, Y move 2)
 */
type SubTurnNumType = 0 | 1 | 2 | 3;

export type PlayerType = 'X' | 'Y';
export type TurnNumType = 1 | 2 | 3 | 4 | 5 | 6;
export type TurnType = `${PlayerType}${TurnNumType}`;

type SquareNumType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type StatusType = RequiredAtLeastOne<{ [P in PlayerType]: string }>;

export type StateType = {
	/**
	 * `i`th element contains classical mark for `i`th square, `null` if it has none
	 * (3x3 grid of squares is represented as 1D array of length 9).
	 */
	cSquares: ConstArray<null, 9> | ConstArray<TurnType, 9>;

	/**
	 * `i`th element contains list of quantum marks contained in square `i`th square,
	 * `null` if it has none.
	 */
	qSquares: ConstArray<null, 9> | ConstArray<TurnType[], 9>;

	turnNum: TurnNumType;
	subTurnNum: SubTurnNumType;
	lastMove?: number;

	/**
	 * Array of indexes of Squares involved in a cycle, `null` if none exists.
	 */
	cycleSquares: NodeIdType[] | null;

	/**
	 * Array of marks (eg. 'X1', 'Y3') involved in a cycle, `null` if none exists.
	 */
	cycleMarks: TurnType[] | null;

	/**
	 * Square selected to be origin of collapse, if there is a cycle.
	 */
	collapseSquare: number | null;

	xTimeLeft: number; // in seconds
	yTimeLeft: number; // in seconds

	gameOver: boolean;
	xScore: number;
	yScore: number;
	status?: StatusType; // display messages
};

export default class Game {
	g: Graph;
	state: StateType;
	X?: SocketIdType;
	Y?: SocketIdType;
	constructor(_controller: unknown) {
		this.g = new Graph();
		this.timer = this.timer.bind(this);
		this.state = {
			cSquares: (Array(9) as ConstArray<any, 9>).fill(null),
			qSquares: (Array(9) as ConstArray<any, 9>).fill(null),
			turnNum: 1,
			subTurnNum: 0,
			cycleSquares: null,
			cycleMarks: null,
			collapseSquare: null,
			gameOver: false,
			xTimeLeft: 60 * 5,
			yTimeLeft: 60 * 5,
			xScore: 0,
			yScore: 0
		};
	}

	setState(obj: Readonly<RequiredAtLeastOne<StateType>>): void {
		Object.assign(this.state, obj);
	}
	setStatus(msg: Readonly<StatusType>) {
		this.setState({ status: msg });
	}

	whoseTurn(): PlayerType {
		return this.state.subTurnNum < 2 ? 'X' : 'Y';
	}
	notWhoseTurn(): PlayerType {
		return this.state.subTurnNum < 2 ? 'Y' : 'X';
	}

	timer(): void {
		if (this.whoseTurn() === 'X') {
			if (this.state.xTimeLeft <= 0) {
				this.setState({
					gameOver: true,
					status: {
						X: '時間切れ負け',
						Y: 'X が持ち時間を使い果たしました．勝利！'
					}
				});
			} else this.setState({ xTimeLeft: this.state.xTimeLeft - 1 });
		}

		if (this.whoseTurn() === 'Y') {
			if (this.state.yTimeLeft <= 0) {
				this.setState({
					gameOver: true,
					status: {
						X: 'Y が持ち時間を使い果たしました．勝利！',
						Y: '時間切れ負け'
					}
				});
			} else this.setState({ yTimeLeft: this.state.yTimeLeft - 1 });
		}
	}

	// dispatches click to appropriate handler based on state
	handleSquareClick(i: number): StatusType {
		if (this.state.turnNum === 1 && this.state.subTurnNum === 0)
			// initialize timer at game start
			setInterval(this.timer, 1000);

		if (this.state.gameOver)
			return {
				X: 'This game is already over! Start a new game!!',
				Y: 'This game is already over! Start a new game!!'
			};

		if (this.state.cycleSquares) return this.handleCyclicEntanglement(i);

		if (this.state.cSquares[i])
			return {
				[this.whoseTurn()]:
					'This square already has a classical mark! No more quantum marks can go here >:('
			} as RequiredAtLeastOne<{ X?: string; Y?: string }>;

		if (this.isSecondMove() && this.state.lastMove === i)
			return {
				[this.whoseTurn()]:
					"Can't move twice in the same square! \n What do you think this is... regular tic-tac-toe??"
			} as RequiredAtLeastOne<{ X?: string; Y?: string }>;

		return this.handleNormalMove(i);
	}

	// adds quantum mark to square that was clicked on then checks if that created a cycle
	handleNormalMove(i: number): Required<StatusType> {
		const qSquares = this.state.qSquares;
		const marker = (this.whoseTurn() + this.state.turnNum) as TurnType;

		if (qSquares[i]) (qSquares[i] as TurnType[]).push(marker);
		else qSquares[i] = [marker];

		if (!this.g.hasNode(i)) this.g.addNode(i);
		if (this.isSecondMove()) this.g.addEdge(this.state.lastMove as number, i, marker);

		// if cycle is not null, there is a cyclic entanglement.
		const cycle = this.g.getCycle(i);
		this.setState({
			qSquares,
			cycleSquares: cycle?.[0],
			cycleMarks: cycle?.[1],
			turnNum: (this.state.turnNum + Number(this.state.subTurnNum === 3)) as TurnNumType,
			subTurnNum: ((this.state.subTurnNum + 1) % 4) as SubTurnNumType,
			lastMove: i
		});

		if (cycle)
			return {
				[this.notWhoseTurn()]: `循環もつれが発生！ 循環もつれにあるマスのどれかをクリックして ${this.notWhoseTurn()} にしてください．`,
				[this.whoseTurn()]: `循環もつれが発生！ 相手が操作します．`
			} as Required<StatusType>;

		if (this.isSecondMove())
			return {
				[this.whoseTurn()]: 'ターン終了',
				[this.notWhoseTurn()]: 'ターン開始！'
			} as Required<StatusType>;

		return {
			[this.whoseTurn()]: 'Put down a quantum move.',
			[this.notWhoseTurn()]: `相手のターンです．`
		} as Required<StatusType>;
	}

	// selects square to be collapse point
	handleCyclicEntanglement(i: number): StatusType {
		if (!this.state.cycleSquares?.includes(i))
			return {
				[this.whoseTurn()]: '循環もつれ状態にある青いマスを一つ選んでください！'
			} as StatusType;

		this.setState({ collapseSquare: i });
		return {
			[this.whoseTurn()]: '選択したマスを次のどちらにしますか？'
		} as StatusType;
	}

	// collapse square and propagates changes outward
	handleCollapse(mark: TurnType): Required<StatusType> {
		console.log(mark);
		const i = this.state.collapseSquare as number;
		const visited = new Set([mark]);

		this._handleCollapseHelper(mark, i, visited);

		const scores = calculateScores(this.state.cSquares as ConstArray<TurnType, 9>);
		if (!scores) {
			this.setState({
				cycleSquares: null,
				cycleMarks: null,
				collapseSquare: null
			});

			return {
				X: this.whoseTurn() === 'X' ? '次はあなたのターンです' : '次は相手のターンです',
				Y: this.whoseTurn() === 'Y' ? '次はあなたのターンです' : '次は相手のターンです'
			};
		}

		// end of game
		const status = {
			X: getWinnerMsg(scores),
			Y: getWinnerMsg(scores)
		};

		this.setState({
			status,
			gameOver: true,
			xScore: this.state.xScore + scores['X'],
			yScore: this.state.yScore + scores['Y'],
			cycleSquares: null,
			cycleMarks: null,
			collapseSquare: null
		});

		return status;
	}

	private _handleCollapseHelper(mark: TurnType, i: number, visited: Set<TurnType>) {
		const cSquares = this.state.cSquares;
		const qSquares = this.state.qSquares;
		cSquares[i] = mark;
		qSquares[i] = null;

		this.setState({
			cSquares,
			qSquares
		});

		for (const edge of this.g.getNode(i).edges) {
			if (!visited.has(edge.key)) {
				visited.add(edge.key);
				this._handleCollapseHelper(edge.key, edge.end.id, visited);
			}
		}
	}

	handleNotYourTurn() {
		return [this[this.notWhoseTurn()], "It's not your turn!"];
	}

	getPlayer(socketID: SocketIdType) {
		if (this.X === socketID) return 'X';
		if (this.Y === socketID) return 'Y';
	}

	// utility functions
	isTurn(id: SocketIdType) {
		return this[this.whoseTurn()] === id;
	}

	isSecondMove() {
		return this.state.subTurnNum === 1 || this.state.subTurnNum === 3;
	}
}

// pure functions to help with game logic in index.js
function getWinnerMsg(scores: Readonly<{ X: number; Y: number }>) {
	const winner = scores['X'] > scores['Y'] ? 'X' : 'Y';
	const loser = winner === 'X' ? 'Y' : 'X';

	if (scores['X'] + scores['Y'] === 1)
		return `${winner} の勝利!!!\n${winner} は 1 ポイントを獲得！`;

	if (scores['X'] === 1.5 || scores['Y'] === 1.5)
		return `2 ビンゴで ${winner} の勝利!!!\n${winner} は 1.5 ポイントを獲得！`;

	if (scores['X'] + scores['Y'] === 1.5)
		return `${winner} の勝利!!\n${winner} は 1 ポイントを獲得！\n（でも ${loser} も惜しかったので 0.5 ポイント！）`;

	return '';
}

type WinnersType = PlayerType[];
function calculateWinners(squares: ConstArray<[PlayerType, any], 9>): WinnersType {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	] as const;

	const winners: WinnersType = [];

	for (const [a, b, c] of lines) {
		if (
			squares[a] &&
			squares[b] &&
			squares[c] &&
			squares[a][0] === squares[b][0] &&
			squares[a][0] === squares[c][0]
		) {
			winners.push(squares[a][0]);
		}
	}

	return winners;
}

function calculateScores(squares: ConstArray<TurnType, 9>) {
	const winners = calculateWinners(squares);

	if (winners.length === 0) return null;

	winners.sort();
	const scores = { X: 0, Y: 0 };

	if (winners.length >= 1) scores[winners[0]] += 1;
	else if (winners.length >= 2) scores[winners[1]] += 0.5;
	else if (winners.length === 3) scores[winners[2]] += 0.5;

	return scores;
}
