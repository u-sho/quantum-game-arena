import type { ConstArray, MaxLengthArray } from '$lib/types/generics';

/**
 * The game board has 9 squares numbered like
 * [ 0 | 1 | 2 ] \n [ 3 | 4 | 5 ] \n [ 6 | 7 | 8 ]
 */
export type SquareType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type PlayerType = 'X' | 'Y';

/**
 * A turn is the set of X's 2 moves and Y's 2 moves.
 */
export type TurnNumType = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * `Pi` is `i`th turn mark of player `P`.
 */
export type MarkType = `${PlayerType}${TurnNumType}`;

/**
 * `0`: first move of X,
 * `1`: second move of X,
 *
 * `2`: first move of Y,
 * `3`: second move of Y,
 *
 * in a turn
 */
export type SubTurnType = 0 | 1 | 2 | 3;

// type OnlineStatusType = Record<PlayerType, string>;
type OfflineStatusType = string;
export type StatusType = OfflineStatusType;

// type SocketIdType = string;

export type StateType = {
	/**
	 * Every turn contains X's 2 moves & Y's 2 moves.
	 */
	currentTurn: TurnNumType;

	/**
	 * `currentSubTurn` represents the state within current turn now.
	 *
	 *   `0`: first move of X, `1`: second move of X,
	 *   `2`: first move of Y, `3`: second move of Y, in a turn
	 */
	currentSubTurn: SubTurnType;

	/**
	 * `null` means that is on first move on the game.
	 */
	lastMove: SquareType | null;

	/**
	 * `cSquares[i]` is a classical mark on `i`th square.
	 * `null` square has been not determined yet.
	 */
	cSquares: ConstArray<null | MarkType, 9>;

	/**
	 * `qSquares[i]` is an array of quantum marks on `i`th square.
	 */
	qSquares: ConstArray<MaxLengthArray<MarkType, 9>, 9>;

	/**
	 * Cyclic-entanglement squares. `null` if no cyclic-entanglement.
	 */
	cycleSquares: MaxLengthArray<SquareType, 9> | null;

	/**
	 * Cyclic-entanglement marks. `null` if no cyclic-entanglement.
	 */
	cycleMarks: MaxLengthArray<MarkType, 9> | null;

	/**
	 * Square selected to be origin of collapse, if there is a cycle.
	 */
	collapseSquare: SquareType | null;

	/**
	 * Left times every players.
	 */
	leftTimes: Record<PlayerType, number>;

	/**
	 * Game is overed or not
	 */
	isOver: boolean;

	/**
	 * For each players,
	 *   +0.5 points: gets  a  bingo  BUT lose,
	 *   +1   point:  gets  a  bingo  and win,
	 *   +1.5 points: gets two bingos and win
	 */
	scores: Record<PlayerType, number>;

	/**
	 * Status message for players
	 */
	status: OfflineStatusType;
};
