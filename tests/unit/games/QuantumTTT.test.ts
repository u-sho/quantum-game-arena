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
});
