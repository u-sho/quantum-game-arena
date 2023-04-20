/**
 * QuantumTicTacToe is made by Rohan Pandit in 2017 and changed by Shouhei Uechi in 2021.
 *   Copyright (C) 2021  Shouhei Uechi
 *   Copyright (C) 2017  Rohan Pandit, available at <https://github.com/rohanp/QuantumTicTacToe/tree/master/>
 *
 * This file is part of QuantumTicTacToe.
 *
 * QuantumTicTacToe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * QuantumTicTacToe is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with QuantumTicTacToe.  If not, see <https://www.gnu.org/licenses/>.
 */

import type { ConstArray, MaxLengthArray, RequiredAtLeastOne } from '$lib/types/generics';
import type {
	MarkType,
	PlayerType,
	SquareType,
	StateType,
	StatusType,
	SubTurnType,
	TurnNumType
} from './QuantumTTT.type';
import Graph from './Graph';

export default class QuantumTTT {
	g: Graph<SquareType, MarkType>;
	state: StateType;
	constructor() {
		this.g = new Graph();
		this.timer = this.timer.bind(this);
		this.state = {
			cSquares: [null, null, null, null, null, null, null, null, null],
			qSquares: [[], [], [], [], [], [], [], [], []],
			currentTurn: 1,
			currentSubTurn: 0,
			lastMove: null,
			cycleSquares: null,
			cycleMarks: null,
			collapseSquare: null,
			isOver: false,
			leftTimes: {
				X: 60 * 5,
				Y: 60 * 5
			},
			scores: { X: 0, Y: 0 },
			status: 'プレイヤーXのターンです！'
		};
	}

	setState(obj: Readonly<RequiredAtLeastOne<StateType>>): void {
		Object.assign(this.state, obj);
	}
	setLeftTimes(obj: Readonly<RequiredAtLeastOne<StateType['leftTimes']>>): void {
		Object.assign(this.state.leftTimes, obj);
	}

	whoseTurn(): PlayerType {
		return this.state.currentSubTurn < 2 ? 'X' : 'Y';
	}
	notWhoseTurn(): PlayerType {
		return this.state.currentSubTurn < 2 ? 'Y' : 'X';
	}

	timer(): void {
		if (this.whoseTurn() === 'X') {
			if (this.state.leftTimes.X <= 0) {
				this.setState({
					isOver: true,
					status: 'プレイヤーXの時間切れです。プレイヤーYの勝利です！'
				});
			} else {
				this.setLeftTimes({ X: this.state.leftTimes.X - 1 });
			}
		}

		if (this.whoseTurn() === 'Y') {
			if (this.state.leftTimes.Y <= 0) {
				this.setState({
					isOver: true,
					status: 'プレイヤーYの時間切れです。プレイヤーXの勝利です！'
				});
			} else {
				this.setLeftTimes({ Y: this.state.leftTimes.Y - 1 });
			}
		}
	}

	// dispatches click to appropriate handler based on state
	handleSquareClick(i: SquareType): StatusType {
		if (this.state.currentTurn === 1 && this.state.currentSubTurn === 0)
			// initialize timer at game start
			setInterval(this.timer, 1000);

		if (this.state.isOver)
			return 'ゲームは既に終了しています！\n' + '新しいゲームを開始してください';

		if (this.state.cycleSquares) return this._handleCyclicEntanglement(i);

		if (this.state.cSquares[i])
			return 'このマスはマークが既に確定しています！　このマスには量子マークを置けません。';

		if (this.isSecondMove() && this.state.lastMove === i)
			return '同じマスには同じターンに置けません。';

		return this._handleNormalMove(i);
	}

	// adds quantum mark to square that was clicked on then checks if that created a cycle
	private _handleNormalMove(i: SquareType): StatusType {
		const qSquares: StateType['qSquares'] = [...this.state.qSquares];
		const marker: MarkType = `${this.whoseTurn()}${this.state.currentTurn}`;

		if (qSquares[i].length >= 1)
			(qSquares[i] as Exclude<(typeof qSquares)[typeof i], []>).push(marker);
		else qSquares[i] = [marker];

		if (!this.g.hasNode(i)) this.g.addNode(i);
		if (this.isSecondMove()) this.g.addEdge(this.state.lastMove as SquareType, i, marker);

		// if cycle is not null, there is a cyclic entanglement.
		const cycle = this.g.getCycle(i);
		if (cycle) {
			const status =
				'循環もつれが発生しました！\n' +
				`プレイヤー${this.notWhoseTurn()}はマークを確定させるマスを選択してください。`;
			this.setState({
				status,
				qSquares,
				cycleSquares: cycle[0],
				cycleMarks: cycle[1],
				lastMove: i
			});
			return status;
		}

		const status = this.isSecondMove()
			? '2個目の量子マークを置いてください。\n' +
			  '循環もつれが発生すると、マスにある量子マークのうち1つのマークがそのマスの確定マークになります。'
			: `プレイヤー${this.whoseTurn()}のターンです！` + '　量子マークを置いてください。';
		this.setState({
			status,
			qSquares,
			currentTurn: (this.state.currentTurn +
				Number(this.state.currentSubTurn === 3)) as TurnNumType,
			currentSubTurn: ((this.state.currentSubTurn + 1) % 4) as SubTurnType,
			lastMove: i
		});
		return status;
	}

	// selects square to be collapse point
	private _handleCyclicEntanglement(i: SquareType): StatusType {
		if (!(this.state.cycleSquares as Exclude<StateType['cycleSquares'], null | []>).includes(i)) {
			const status = '循環もつれに関係してるマスを選択してください！';
			this.setState({ status });
			return status;
		}

		const status = 'このマスに確定させるマークを次から選択します。';
		this.setState({ status, collapseSquare: i });
		return status;
	}

	// collapse square and propagates changes outward
	handleCollapse(mark: MarkType): StatusType {
		if (import.meta.env.DEV) console.log(`handleCollapse is called by ${mark}`);
		const i = this.state.collapseSquare as SquareType;
		const visited = new Set([mark]);

		this._handleCollapseHelper(mark, i, visited);

		const scores = _calculateScores(this.state.cSquares);
		if (scores === null) {
			const status = `プレイヤー${this.whoseTurn()}のターンです。`;

			this.setState({
				status,
				cycleSquares: null,
				cycleMarks: null,
				collapseSquare: null,
				currentTurn: (this.state.currentTurn +
					Number(this.state.currentSubTurn === 3)) as TurnNumType,
				currentSubTurn: ((this.state.currentSubTurn + 1) % 4) as SubTurnType
			});

			return status;
		}

		// end of the game
		const status = _getWinnerMsg(scores);

		this.setState({
			status,
			isOver: true,
			scores: {
				X: this.state.scores.X + scores.X,
				Y: this.state.scores.Y + scores.Y
			},
			cycleSquares: null,
			cycleMarks: null,
			collapseSquare: null
		});

		return status;
	}

	private _handleCollapseHelper(mark: MarkType, i: SquareType, visited: Set<MarkType>) {
		const cSquares: StateType['cSquares'] = [...this.state.cSquares];
		const qSquares: StateType['qSquares'] = [...this.state.qSquares];
		cSquares[i] = mark;
		qSquares[i] = [];

		this.setState({ cSquares, qSquares });

		for (const edge of this.g.getOrInsertNode(i).edges) {
			if (!visited.has(edge.key)) {
				visited.add(edge.key);
				this._handleCollapseHelper(edge.key, edge.end, visited);
			}
		}
	}

	isSecondMove(): boolean {
		return this.state.currentSubTurn === 1 || this.state.currentSubTurn === 3;
	}
}

// pure functions to help with game logic in index.js
function _getWinnerMsg(scores: Readonly<{ X: number; Y: number }>) {
	const winner = scores.X > scores.Y ? 'X' : 'Y';
	const loser = winner === 'X' ? 'Y' : 'X';

	if (scores.X + scores.Y === 1)
		return `${winner}の勝利です！！\n ${winner}は1.0ポイント \n ${loser}は0ポイント`;

	if (scores.X === 1.5 || scores.Y === 1.5)
		return (
			`${winner}が同時に2つの列を完成させました！！\n ${winner}は 1.5ポイント\n` +
			`${loser}は 0ポイント`
		);

	if (scores.X + scores.Y === 1.5)
		return (
			`両プレイヤーが同時に1列を完成させました。しかし、${winner}が先に並べました！` +
			` ${winner}は 1.0ポイント` +
			`\n ${loser}は 0.5ポイント`
		);

	return 'どのプレイヤーも列を完成できていません';
}

type WinnersType = Array<[TurnNumType, PlayerType, ConstArray<SquareType, 3>]>;
function _calculateWinners(squares: Readonly<ConstArray<MarkType | null, 9>>): WinnersType {
	const lines: ConstArray<ConstArray<SquareType, 3>, 8> = [
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

function _calculateScores(squares: Readonly<ConstArray<MarkType | null, 9>>) {
	const winners = _calculateWinners(squares);

	if (winners.length === 0 && squares.filter((x) => !x).length > 1) return null;

	winners.sort((line1, line2) => {
		if (line1[0] < line2[0]) return 1;
		if (line1[0] > line2[0]) return -1;
		if (line1[1] === 'X') return -1;
		return 0;
	});

	const scores: {
		X: 0 | 0.5 | 1 | 1.5;
		Y: 0 | 0.5 | 1 | 1.5;
	} = { X: 0, Y: 0 };
	if (winners.length >= 1) scores[winners[0][1]] = 1;
	if (winners.length >= 2) scores[winners[1][1]] += 0.5;
	if (winners.length === 3) scores[winners[2][1]] += 0.5;

	return scores;
}
