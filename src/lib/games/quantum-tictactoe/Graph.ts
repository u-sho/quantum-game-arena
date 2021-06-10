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

import type { MarkType } from './QuantumTTT.type';

export type NodeIdType = number;
export type EdgeKeyType = MarkType;

type NodesType = {
	[id in NodeIdType]: Node;
};
type EdgesType = {
	[key in EdgeKeyType]?: Edge;
};

class Node {
	id: NodeIdType;
	edges: Edge[];
	constructor(id: Readonly<NodeIdType>) {
		this.id = id;
		this.edges = [];
	}
}

/** Need both Node and Edge for multi-graph, as each node can have multiple
    edges between them, whose uniqueness needs to be accounted for.
*/
class Edge {
	start: Node;
	end: Node;
	key: EdgeKeyType;
	constructor(node1: Node, node2: Node, key: Readonly<EdgeKeyType>) {
		this.start = node1;
		this.end = node2;
		this.key = key;
	}
}

export default class Graph {
	nodes: NodesType;
	edges: EdgesType;
	constructor() {
		this.nodes = {};
		this.edges = {};
	}

	addNode(id: Readonly<NodeIdType>): void {
		this.nodes[id] = new Node(id);
	}

	getNode(id: Readonly<NodeIdType>): Node {
		return this.nodes[id];
	}

	hasNode(id: Readonly<NodeIdType>): boolean {
		return id in this.nodes;
	}

	addEdge(id1: Readonly<NodeIdType>, id2: Readonly<NodeIdType>, key: Readonly<EdgeKeyType>): void {
		if (!(id1 in this.nodes)) this.addNode(id1);
		if (!(id2 in this.nodes)) this.addNode(id2);

		const edge = new Edge(this.getNode(id1), this.getNode(id2), key);
		const reverseEdge = new Edge(this.getNode(id2), this.getNode(id1), key);

		this.getNode(id1).edges.push(edge);
		this.getNode(id2).edges.push(reverseEdge);
		this.edges[key] = edge;
	}

	numNodes(): number {
		return Object.keys(this.nodes).length;
	}

	/**
	 * @param startId - id of one of the nodes involved in the cycle
	 * @return List of Nodes and Edges involved in cycle
	 */
	getCycle(startId: Readonly<NodeIdType>): null | [NodeIdType[], EdgeKeyType[]] {
		// case one: graph too small for cycles
		if (this.numNodes() < 2) return null;

		// case two: cycle of len 2
		const start = this.getNode(startId);
		const visited: Set<Node> = new Set();
		const endToEdge: Map<Node, Edge> = new Map();

		for (const edge of start.edges) {
			if (visited.has(edge.end)) {
				return [
					[edge.start.id, edge.end.id],
					[edge.key, endToEdge.get(edge.end)?.key as EdgeKeyType]
				];
			}

			visited.add(edge.end);
			endToEdge.set(edge.end, edge);
		}

		// case three: cycle of len > 2
		const q = [start];
		const layers: Map<Node, number> = new Map(); // maps node to layer
		const prev: Map<Node, Edge | null> = new Map(); // maps node to its associated edge
		layers.set(start, 0);
		prev.set(start, null);

		while (q !== undefined && q.length > 0) {
			const curr = q.shift() as Node;
			const layer = layers.get(curr) as number;

			for (const edge of curr.edges) {
				if (layers.has(edge.end)) {
					if (layers.get(edge.end) === layer - 1) continue; // node we just came from
					return this._constructPath(edge, prev);
				}

				q.push(edge.end);
				layers.set(edge.end, layer + 1);
				prev.set(edge.end, edge);
			}
		}

		return null;
	}

	private _constructPath(
		edge: Readonly<Edge>,
		prev: Readonly<Map<Node, Edge | null>>
	): [NodeIdType[], EdgeKeyType[]] {
		const cycleNodeIds = [];
		const cycleEdgeKeys = [edge.key];
		let currNode: Node, currEdge: Edge;

		// go around one way
		currNode = edge.start;
		while (prev.get(currNode)) {
			currEdge = prev.get(currNode) as Edge;
			cycleNodeIds.push(currNode.id);
			cycleEdgeKeys.push(currEdge.key);
			currNode = currEdge.start;
		}
		cycleNodeIds.push(currNode.id); /// get start node only once

		// go around the other way
		currNode = edge.end;
		while (prev.get(currNode)) {
			currEdge = prev.get(currNode) as Edge;
			cycleNodeIds.unshift(currNode.id);
			cycleEdgeKeys.unshift(currEdge.key);
			currNode = currEdge.start;
		}

		return [cycleNodeIds, cycleEdgeKeys];
	}
}
