import type { ConstArray, RequiredAtLeastOne } from '$lib/types/generics';
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
export type MarkType = `${PlayerType}${TurnNumType}`;
export type TurnType = MarkType;

export type SquareNumType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type PlayersMsg = RequiredAtLeastOne<{ [P in PlayerType]: string }>;
type StatusType = PlayersMsg | string;

export type StateType = {
	/**
	 * `i`th element contains classical mark for `i`th square, `null` if it has none
	 * (3x3 grid of squares is represented as 1D array of length 9).
	 */
	cSquares: ConstArray<null | MarkType, 9>;

	/**
	 * `i`th element contains list of quantum marks contained in square `i`th square,
	 * `null` if it has none.
	 */
	qSquares: ConstArray<null | MarkType[], 9>;

	turnNum: TurnNumType;
	subTurnNum: SubTurnNumType;
	lastMove: SquareNumType | null;

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
	collapseSquare: SquareNumType | null;

	xTimeLeft: number; // in seconds
	yTimeLeft: number; // in seconds

	isGameOver: boolean;
	xScore: number;
	yScore: number;
	status?: StatusType; // display messages
};

export default class QuantumTTT {
	g: Graph;
	state: StateType;
	X?: SocketIdType;
	Y?: SocketIdType;
	constructor() {
		this.g = new Graph();
		this.timer = this.timer.bind(this);
		this.state = {
			cSquares: Array(9).fill(null) as ConstArray<null, 9>,
			qSquares: Array(9).fill(null) as ConstArray<null, 9>,
			turnNum: 1,
			subTurnNum: 0,
			lastMove: null,
			cycleSquares: null,
			cycleMarks: null,
			collapseSquare: null,
			isGameOver: false,
			xTimeLeft: 60 * 5,
			yTimeLeft: 60 * 5,
			xScore: 0,
			yScore: 0
		};
	}

	setState(obj: Readonly<RequiredAtLeastOne<StateType>>): void {
		Object.assign(this.state, obj);
	}
	setStatus(msg: Readonly<StatusType>): void {
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
					isGameOver: true,
					status: 'Player X has run out of time. Player Y wins!'
				});
			} else this.setState({ xTimeLeft: this.state.xTimeLeft - 1 });
		}

		if (this.whoseTurn() === 'Y') {
			if (this.state.yTimeLeft <= 0) {
				this.setState({
					isGameOver: true,
					status: 'Player Y has run out of time. Player X wins!'
				});
			} else this.setState({ yTimeLeft: this.state.yTimeLeft - 1 });
		}
	}

	// dispatches click to appropriate handler based on state
	handleSquareClick(i: SquareNumType): PlayersMsg {
		if (this.state.turnNum === 1 && this.state.subTurnNum === 0)
			// initialize timer at game start
			setInterval(this.timer, 1000);

		if (this.state.isGameOver)
			return {
				X: 'This game is already over! Start a new game!!',
				Y: 'This game is already over! Start a new game!!'
			};

		if (this.state.cycleSquares) return this._handleCyclicEntanglement(i);

		if (this.state.cSquares[i])
			return {
				[this.whoseTurn()]:
					'This square already has a classical mark! No more quantum marks can go here >:('
			} as PlayersMsg;

		if (this.isSecondMove() && this.state.lastMove === i)
			return {
				[this.whoseTurn()]:
					"Can't move twice in the same square! \n What do you think this is... regular tic-tac-toe??"
			} as PlayersMsg;

		return this.handleNormalMove(i);
	}

	// adds quantum mark to square that was clicked on then checks if that created a cycle
	handleNormalMove(i: SquareNumType): Required<PlayersMsg> {
		const qSquares = this.state.qSquares;
		const marker = `${this.whoseTurn()}${this.state.turnNum}` as TurnType;

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

		if (cycle) {
			const msg =
				`A loop of entanglement has occurred! Player ${this.notWhoseTurn()} will decide which of ` +
				'the possible states the board will collapse into.';
			return {
				[this.notWhoseTurn()]: `${msg} Click one of the squares involved in the loop.`,
				[this.whoseTurn()]: msg
			} as Required<PlayersMsg>;
		}

		if (this.isSecondMove())
			return {
				[this.whoseTurn()]:
					'Now put a second quantum move. This move is entangled with your previous move. When ' +
					'there is a cycle of entanglement, a collapse will occur and only one of these quantum ' +
					'marks will turn into a classical mark.',
				[this.notWhoseTurn()]: `Player ${this.whoseTurn()}'s move.`
			} as Required<PlayersMsg>;

		return {
			[this.whoseTurn()]: 'Your turn! Put down a quantum move (these are the small marks).',
			[this.notWhoseTurn()]: `Now it's ${this.whoseTurn()}'s turn.`
		} as Required<PlayersMsg>;
	}

	// selects square to be collapse point
	private _handleCyclicEntanglement(i: SquareNumType): PlayersMsg {
		if (!this.state.cycleSquares?.includes(i))
			return {
				[this.whoseTurn()]:
					'Must pick square involved in cyclic entanglement! (is highlighted in blue)'
			} as PlayersMsg;

		this.setState({ collapseSquare: i });
		return {
			[this.whoseTurn()]: 'Now, choose below which state you want to occupy the selected square.'
		} as PlayersMsg;
	}

	// collapse square and propagates changes outward
	handleCollapse(mark: TurnType): Required<PlayersMsg> {
		console.log(mark);
		const i = this.state.collapseSquare as number;
		const visited = new Set([mark]);

		this._handleCollapseHelper(mark, i, visited);

		const scores = calculateScores(this.state.cSquares);
		if (scores === null) {
			this.setState({
				cycleSquares: null,
				cycleMarks: null,
				collapseSquare: null
			});

			return {
				X: `${this.whoseTurn()} next!`,
				Y: `${this.whoseTurn()} next!`
			};
		}

		// end of game
		const status = {
			X: getWinnerMsg(scores),
			Y: getWinnerMsg(scores)
		};

		this.setState({
			status,
			isGameOver: true,
			xScore: this.state.xScore + scores.X,
			yScore: this.state.yScore + scores.Y,
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

	handleNotYourTurn(): [SocketIdType | undefined, "It's not your turn!"] {
		return [this[this.notWhoseTurn()], "It's not your turn!"];
	}

	getPlayer(socketID: SocketIdType): PlayerType | void {
		if (this.X === socketID) return 'X';
		if (this.Y === socketID) return 'Y';
	}

	// utility functions
	isTurn(id: SocketIdType): boolean {
		return this[this.whoseTurn()] === id;
	}

	isSecondMove(): boolean {
		return this.state.subTurnNum === 1 || this.state.subTurnNum === 3;
	}
}

// pure functions to help with game logic in index.js
function getWinnerMsg(scores: Readonly<{ X: number; Y: number }>) {
	const winner = scores.X > scores.Y ? 'X' : 'Y';
	const loser = winner === 'X' ? 'Y' : 'X';

	if (scores.X + scores.Y === 1)
		return `${winner} wins!!! \n ${winner} gets 1 point \n ${loser} gets 0 points`;

	if (scores.X === 1.5 || scores.Y === 1.5)
		return (
			`${winner} wins with a double three-in-a-row!!! \n ${winner} gets 1.5 points \n ` +
			`${loser} gets 0 points`
		);

	if (scores.X + scores.Y === 1.5)
		return (
			`Both players got three-in-a-row, but ${winner} got it first! (The mark placed in` +
			`${winner}'s three-in-a-row has a smaller subscript than ${loser} \n ${winner} gets 1 point` +
			` \n ${loser} gets 0.5 points`
		);

	return 'No players get three-in-a-row...';
}

type WinnersType = Array<[TurnNumType, PlayerType, ConstArray<SquareNumType, 3>]>;
function _calculateWinners(squares: Readonly<ConstArray<TurnType | null, 9>>): WinnersType {
	const lines: ConstArray<ConstArray<SquareNumType, 3>, 8> = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	const winners: WinnersType = [];

	for (const line of lines) {
		const [s1, s2, s3] = [squares[line[0]], squares[line[1]], squares[line[2]]];
		if (s1 && s2 && s3 && s1[0] === s2[0] && s1[0] === s3[0]) {
			const subscripts = [s1[1], s2[1], s3[1]].map(Number) as ConstArray<TurnNumType, 3>;
			winners.push([Math.max(...subscripts) as TurnNumType, s1[0] as PlayerType, line]);
		}
	}

	return winners;
}

function calculateScores(squares: Readonly<ConstArray<TurnType | null, 9>>) {
	const winners = _calculateWinners(squares);

	if (winners.length === 0 && squares.filter((x) => !x).length > 1) return null;

	winners.sort();
	const scores = { X: 0, Y: 0 };

	if (winners.length >= 1) scores[winners[0][1]] = 1;
	if (winners.length >= 2) scores[winners[1][1]] += 0.5;
	if (winners.length === 3) scores[winners[2][1]] += 0.5;

	return scores as {
		X: 0 | 0.5 | 1 | 1.5 | 2;
		Y: 0 | 0.5 | 1 | 1.5 | 2;
	};
}
