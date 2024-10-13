import { describe, test, expect } from 'vitest';
import QuantumTTT from '$lib/games/quantum-tictactoe/QuantumTTT';

describe('QuantumTTT', () => {
	const game = new QuantumTTT();
	expect(game).toBeInstanceOf(QuantumTTT);
	expect(game.state.status).toMatch('プレイヤーXのターンです');

	test('first turn of X', () => {
		expect(game.handleSquareClick(0)).toMatch('2個目の量子マークを置いてください');
		expect(game.handleSquareClick(0)).toMatch('置けません');
		expect(game.handleSquareClick(1)).toMatch('プレイヤーYのターンです');

		// X1 | X1 | --
		// -- | -- | --
		// -- | -- | --
		const { qSquares } = game.state;
		expect(qSquares).toHaveLength(9);
		expect(qSquares[0]).toHaveLength(1);
		expect(qSquares[0][0]).toStrictEqual('X1');
		expect(qSquares[1]).toHaveLength(1);
		expect(qSquares[1][0]).toStrictEqual('X1');
		expect(qSquares[2]).toHaveLength(0);
	});

	test('first turn of Y', () => {
		expect(game.handleSquareClick(0)).toMatch('2個目の量子マークを置いてください');
		expect(game.handleSquareClick(0)).toMatch('置けません');
		expect(game.handleSquareClick(2)).toMatch('プレイヤーXのターンです');

		// X1 Y1 |  X1  |  Y1
		//  --  |  --  |  --
		//  --  |  --  |  --
		const { qSquares } = game.state;
		expect(qSquares).toHaveLength(9);
		expect(qSquares[0]).toHaveLength(2);
		expect(qSquares[0][0]).toStrictEqual('X1');
		expect(qSquares[0][1]).toStrictEqual('Y1');
		expect(qSquares[1]).toHaveLength(1);
		expect(qSquares[1][0]).toStrictEqual('X1');
		expect(qSquares[2]).toHaveLength(1);
		expect(qSquares[2][0]).toStrictEqual('Y1');
		expect(qSquares[3]).toHaveLength(0);
	});

	test('second turn of X', () => {
		expect(game.handleSquareClick(1)).toMatch('2個目の量子マークを置いてください');
		expect(game.handleSquareClick(1)).toMatch('置けません');
		expect(game.handleSquareClick(4)).toMatch('プレイヤーYのターンです');

		// X1 Y1 | X1 X2 |  Y1
		//  --  |  X2  |  --
		//  --  |  --  |  --
		const { qSquares } = game.state;
		expect(qSquares).toHaveLength(9);
		expect(qSquares[0]).toHaveLength(2);
		expect(qSquares[0][0]).toStrictEqual('X1');
		expect(qSquares[0][1]).toStrictEqual('Y1');
		expect(qSquares[1]).toHaveLength(2);
		expect(qSquares[1][0]).toStrictEqual('X1');
		expect(qSquares[1][1]).toStrictEqual('X2');
		expect(qSquares[2]).toHaveLength(1);
		expect(qSquares[2][0]).toStrictEqual('Y1');
		expect(qSquares[3]).toHaveLength(0);
		expect(qSquares[4]).toHaveLength(1);
		expect(qSquares[4][0]).toStrictEqual('X2');
	});

	test('second turn of Y', () => {
		expect(game.handleSquareClick(7)).toMatch('2個目の量子マークを置いてください');
		expect(game.handleSquareClick(7)).toMatch('置けません');
		expect(game.handleSquareClick(4)).toMatch('プレイヤーXのターンです');

		// X1 Y1 | X1 X2 |  Y1
		//  --  | X2 Y2 |  --
		//  --  |  Y2  |  --
		const { qSquares } = game.state;
		expect(qSquares).toHaveLength(9);
		expect(qSquares[0]).toHaveLength(2);
		expect(qSquares[0][0]).toStrictEqual('X1');
		expect(qSquares[0][1]).toStrictEqual('Y1');
		expect(qSquares[1]).toHaveLength(2);
		expect(qSquares[1][0]).toStrictEqual('X1');
		expect(qSquares[1][1]).toStrictEqual('X2');
		expect(qSquares[2]).toHaveLength(1);
		expect(qSquares[2][0]).toStrictEqual('Y1');
		expect(qSquares[3]).toHaveLength(0);
		expect(qSquares[4]).toHaveLength(2);
		expect(qSquares[4][0]).toStrictEqual('X2');
		expect(qSquares[4][1]).toStrictEqual('Y2');
		expect(qSquares[5]).toHaveLength(0);
		expect(qSquares[6]).toHaveLength(0);
		expect(qSquares[7]).toHaveLength(1);
		expect(qSquares[7][0]).toStrictEqual('Y2');
		expect(qSquares[8]).toHaveLength(0);
	});

	test('third turn of X', () => {
		expect(game.handleSquareClick(4)).toMatch('2個目の量子マークを置いてください');
		expect(game.handleSquareClick(4)).toMatch('置けません');
		expect(game.handleSquareClick(0)).toMatch('循環もつれが発生しました');

		// X1 Y1 X3 |  X1  X2  |    Y1
		//   ----   | X2 Y2 X3 |   ----
		//   ----   |    Y2    |   ----
		const { qSquares } = game.state;
		expect(qSquares).toHaveLength(9);
		expect(qSquares[0]).toHaveLength(3);
		expect(qSquares[0][0]).toStrictEqual('X1');
		expect(qSquares[0][1]).toStrictEqual('Y1');
		expect(qSquares[0][2]).toStrictEqual('X3');
		expect(qSquares[1]).toHaveLength(2);
		expect(qSquares[1][0]).toStrictEqual('X1');
		expect(qSquares[1][1]).toStrictEqual('X2');
		expect(qSquares[2]).toHaveLength(1);
		expect(qSquares[2][0]).toStrictEqual('Y1');
		expect(qSquares[3]).toHaveLength(0);
		expect(qSquares[4]).toHaveLength(3);
		expect(qSquares[4][0]).toStrictEqual('X2');
		expect(qSquares[4][1]).toStrictEqual('Y2');
		expect(qSquares[4][2]).toStrictEqual('X3');
		expect(qSquares[5]).toHaveLength(0);
		expect(qSquares[6]).toHaveLength(0);
		expect(qSquares[7]).toHaveLength(1);
		expect(qSquares[7][0]).toStrictEqual('Y2');
		expect(qSquares[8]).toHaveLength(0);
	});

	test('resolve cyclic entanglement', () => {
		expect(game.handleSquareClick(0)).toMatch('確定させるマークを次から選択します');
		expect(game.handleCollapse('X1')).toMatch('プレイヤーYのターンです');

		// X1 | X2 | Y1
		// -- | X3 | --
		// -- | Y2 | --
		const { cSquares, qSquares } = game.state;
		expect(cSquares).toHaveLength(9);
		expect(cSquares[0]).toStrictEqual('X1');
		expect(cSquares[1]).toStrictEqual('X2');
		expect(cSquares[2]).toStrictEqual('Y1');
		expect(cSquares[3]).toBeNull();
		expect(cSquares[4]).toStrictEqual('X3');
		expect(cSquares[5]).toBeNull();
		expect(cSquares[6]).toBeNull();
		expect(cSquares[7]).toStrictEqual('Y2');
		expect(cSquares[8]).toBeNull();

		expect(qSquares).toHaveLength(9);
		expect(qSquares[0]).toHaveLength(0);
		expect(qSquares[1]).toHaveLength(0);
		expect(qSquares[2]).toHaveLength(0);
		expect(qSquares[3]).toHaveLength(0);
		expect(qSquares[4]).toHaveLength(0);
		expect(qSquares[5]).toHaveLength(0);
		expect(qSquares[6]).toHaveLength(0);
		expect(qSquares[7]).toHaveLength(0);
		expect(qSquares[8]).toHaveLength(0);
	});

	test('third turn of Y', () => {
		expect(game.handleSquareClick(4)).toMatch('置けません');
		expect(game.handleSquareClick(8)).toMatch('2個目の量子マークを置いてください');
		expect(game.handleSquareClick(5)).toMatch('プレイヤーXのターンです');

		// X1 | X2 | Y1
		// -- | X3 | Y3
		// -- | Y2 | Y3
		const { cSquares, qSquares } = game.state;
		expect(cSquares).toHaveLength(9);
		expect(cSquares[0]).toStrictEqual('X1');
		expect(cSquares[1]).toStrictEqual('X2');
		expect(cSquares[2]).toStrictEqual('Y1');
		expect(cSquares[3]).toBeNull();
		expect(cSquares[4]).toStrictEqual('X3');
		expect(cSquares[5]).toBeNull();
		expect(cSquares[6]).toBeNull();
		expect(cSquares[7]).toStrictEqual('Y2');
		expect(cSquares[8]).toBeNull();

		expect(qSquares).toHaveLength(9);
		expect(qSquares[0]).toHaveLength(0);
		expect(qSquares[1]).toHaveLength(0);
		expect(qSquares[2]).toHaveLength(0);
		expect(qSquares[3]).toHaveLength(0);
		expect(qSquares[4]).toHaveLength(0);
		expect(qSquares[5]).toHaveLength(1);
		expect(qSquares[5][0]).toStrictEqual('Y3');
		expect(qSquares[6]).toHaveLength(0);
		expect(qSquares[7]).toHaveLength(0);
		expect(qSquares[8]).toHaveLength(1);
		expect(qSquares[8][0]).toStrictEqual('Y3');
	});

	test('fourth turn of X', () => {
		expect(game.handleSquareClick(5)).toMatch('2個目の量子マークを置いてください');
		expect(game.handleSquareClick(5)).toMatch('置けません');
		expect(game.handleSquareClick(8)).toMatch('循環もつれが発生しました');
	});

	test('resolve cyclic entanglement 2', () => {
		expect(game.handleSquareClick(4)).toMatch('関係しているマスを選択してください');
		expect(game.handleSquareClick(5)).toMatch('確定させるマークを次から選択します');
		expect(game.handleSquareClick(4)).toMatch('関係しているマスを選択してください');
		expect(game.handleCollapse('Y3')).toMatch('Xの勝利');

		// X1 | X2 | Y1
		// -- | X3 | Y3
		// -- | Y2 | X4
		const { cSquares, scores } = game.state;
		expect(cSquares).toHaveLength(9);
		expect(cSquares[0]).toStrictEqual('X1');
		expect(cSquares[4]).toStrictEqual('X3');
		expect(cSquares[8]).toStrictEqual('X4');

		expect(scores).toMatchObject({ X: 1, Y: 0 });
	});
});
