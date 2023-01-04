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

import type { RangeLengthArray } from '$lib/types/generics';

export type IdType = number | string | symbol;

type NodesType<NodeIdType extends IdType, EdgeIdType extends IdType> = Map<
	NodeIdType,
	Node<NodeIdType, EdgeIdType>
>;
type EdgesType<EdgeIdType extends IdType, NodeIdType extends IdType> = {
	[key in EdgeIdType]?: Edge<EdgeIdType, NodeIdType>;
};

class Node<NodeIdType extends IdType, EdgeIdType extends IdType> {
	id: NodeIdType;
	edges: Array<Edge<EdgeIdType, NodeIdType>>;
	constructor(id: Readonly<NodeIdType>) {
		this.id = id;
		this.edges = [];
	}
}

/** Need both Node and Edge for multi-graph, as each node can have multiple
 * edges between them, whose uniqueness needs to be accounted for.
 */
class Edge<EdgeIdType extends IdType, NodeIdType extends IdType> {
	start: NodeIdType;
	end: NodeIdType;
	key: EdgeIdType;
	constructor(node1: Readonly<NodeIdType>, node2: Readonly<NodeIdType>, key: Readonly<EdgeIdType>) {
		this.start = node1;
		this.end = node2;
		this.key = key;
	}
}

export default class Graph<NodeIdType extends IdType, EdgeIdType extends IdType> {
	nodes: NodesType<NodeIdType, EdgeIdType>;
	edges: EdgesType<EdgeIdType, NodeIdType>;
	constructor() {
		this.nodes = new Map();
		this.edges = {};
	}

	addNode(id: Readonly<NodeIdType>): void {
		this.nodes.set(id, new Node(id));
	}

	getOrInsertNode(id: Readonly<NodeIdType>): Node<NodeIdType, EdgeIdType> {
		if (!this.hasNode(id)) this.addNode(id);
		return this.nodes.get(id) as Node<NodeIdType, EdgeIdType>;
	}

	hasNode(id: Readonly<NodeIdType>): boolean {
		return this.nodes.has(id);
	}

	addEdge(id1: Readonly<NodeIdType>, id2: Readonly<NodeIdType>, key: Readonly<EdgeIdType>): void {
		const edge = new Edge(id1, id2, key);
		const reverseEdge = new Edge(id2, id1, key);

		this.getOrInsertNode(id1).edges.push(edge);
		this.getOrInsertNode(id2).edges.push(reverseEdge);
		this.edges[key as EdgeIdType] = edge;
	}

	numNodes(): number {
		return this.nodes.size;
	}

	/**
	 * @param startId - id of one of the nodes involved in the cycle
	 * @return List of Nodes and Edges involved in cycle
	 */
	getCycle(
		startId: Readonly<NodeIdType>
	): null | [RangeLengthArray<NodeIdType, 2>, RangeLengthArray<EdgeIdType, 2>] {
		// startId has no edge
		if (!this.hasNode(startId)) return null;

		// case one: graph too small for cycles
		if (this.numNodes() < 2) return null;

		// case two: cycle of len 2
		if (this.numNodes() === 2) {
			const { end: maybeEnd, key: edge1 } = this.getOrInsertNode(startId).edges[0];
			const { end: maybeStart, key: edge2 } = this.getOrInsertNode(maybeEnd).edges[0];
			if (edge1 !== edge2) return null;
			return [
				[maybeStart, maybeEnd],
				[edge1, edge2]
			];
		}

		// case three: cycle of len > 2
		const queue = [startId];
		const visitedNodes = new Set<NodeIdType>();
		visitedNodes.add(startId);
		const passedEdges: EdgeIdType[] = [];

		while (queue && queue.length > 0) {
			const currentNode = queue.shift() as NodeIdType;
			for (const edge of this.getOrInsertNode(currentNode).edges) {
				passedEdges.push(edge.key);
				if (visitedNodes.has(edge.end)) {
					return this._constructPath(edge.end, passedEdges as RangeLengthArray<EdgeIdType, 1>);
				}
				queue.push(edge.end);
			}
		}

		return null;
	}

	private _constructPath(
		lastNodeId: Readonly<NodeIdType>,
		edgeIdsIncludeACycle: Readonly<RangeLengthArray<EdgeIdType, 1>>
	): [RangeLengthArray<NodeIdType, 2>, RangeLengthArray<EdgeIdType, 2>] {
		const cycleNodeIds: NodeIdType[] = [lastNodeId];
		const cycleEdgeIds: EdgeIdType[] = [];

		for (let i = edgeIdsIncludeACycle.length - 1; i >= 0; i--) {
			const currEdge: Edge<EdgeIdType, NodeIdType> = this.edges[edgeIdsIncludeACycle[i]] as Edge<
				EdgeIdType,
				NodeIdType
			>;
			const prevNodeId: NodeIdType = cycleNodeIds.at(-1) as NodeIdType;
			if (currEdge.start !== prevNodeId && currEdge.end !== prevNodeId) continue;
			const currNodeId: NodeIdType = currEdge.end === prevNodeId ? currEdge.start : currEdge.end;
			cycleNodeIds.push(currNodeId);
			cycleEdgeIds.push(currEdge.key);
			if (currNodeId === lastNodeId)
				return [
					cycleNodeIds as RangeLengthArray<NodeIdType, 2>,
					cycleEdgeIds as RangeLengthArray<EdgeIdType, 1>
				];
		}
		return [
			cycleNodeIds as RangeLengthArray<NodeIdType, 2>,
			cycleEdgeIds as RangeLengthArray<EdgeIdType, 1>
		];
	}
}
