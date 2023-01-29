import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Node } from "reactflow";
import { CalculateChildPosition } from "../Utilities/Child/CalculateChildPosition";

export interface nodeItem extends Node {
	id: string;
	position: {
		x: number;
		y: number;
	};
	type: "output" | "default" | "input";
	isParent: boolean;
	isChild?: boolean;
	data: {
		label?: string;
	};
	width: number;
	height: number;
	// stores the ids of all childs
	children: string[];
	parentId?: string;
}

interface NodeListState {
	initial: boolean;
	nodeList: nodeItem[];
	selected: string | null;
}

const initialNodeState: NodeListState = {
	initial: true,
	nodeList: [],
	selected: null,
};

// id: "",
// type: "",
// targetPosition: "",
// position: { x: null, y: null },
// data: { label: "" },
// key: "",
// style: {},
// className: "",
// targetPosition: "",
// sourcePosition: "",
// hidden: false,
// selected: false,
// dragging: false,
// draggable: true,
// selectable: true,
// connectable: true,
// deletable: true,
// focusable: true,
// dragHandle: "",
// width: null,
// height: null,
// parentNode: "",
// zIndex: 1,
// extent: "parent",
// expandParent: false,
// positionAbsolute: { x: null, y: null },
// ariaLabel: "",

const NodeSlice = createSlice({
	name: "Node",
	initialState: initialNodeState,
	reducers: {
		addNode(state: NodeListState, action: PayloadAction<nodeItem>) {
			console.log(JSON.parse(JSON.stringify(state.nodeList)));
			return {
				nodeList: [
					...state.nodeList,
					{ ...action.payload, children: [] },
				],
				initial: false,
				selected: null,
			};
		},

		addChildNode(state: NodeListState, action: PayloadAction<nodeItem>) {
			const parent = state.nodeList.find(
				(item) => item.id === state.selected
			);
			const newChild = action.payload;
			// A list of nodes containing all nodes except the selected node and its children
			const separatedList = state.nodeList.filter(
				(node) =>
					node.id !== action.payload.parentId &&
					node.parentId !== state.selected
			);

			const childList = state.nodeList.filter(
				(node) => node.parentId === state.selected
			);

			console.log(JSON.parse(JSON.stringify(childList)));
			console.log(JSON.parse(JSON.stringify(separatedList)));

			const newChildList = CalculateChildPosition(parent!, [
				...childList,
				newChild,
			]);

			separatedList.push(
				{
					...parent!,
					children: [...parent!.children, action.payload.id],
				},
				...newChildList
			);

			console.log(JSON.parse(JSON.stringify(newChild)));

			state.nodeList = [...separatedList];
			return state;
		},

		removeNode(state: NodeListState, action: PayloadAction<string>) {
			const newNodes = state.nodeList.filter(
				(node) => node.id !== action.payload
			);
			const initial = newNodes.length === 0;
			return { nodeList: [...newNodes], initial, selected: null };
		},

		changeType(
			state: NodeListState,
			action: PayloadAction<{
				id: string;
				type: "output" | "default" | "input";
			}>
		) {
			const changeNodes = state.nodeList.map((node) =>
				node.id === action.payload.id
					? { ...node, type: action.payload.type }
					: node
			);
			return {
				nodeList: [...changeNodes],
				initial: state.initial,
				selected: null,
			};
		},

		updateSelectedNode(
			state: NodeListState,
			{
				payload,
			}: PayloadAction<{
				id?: string;
				type: string;
			}>
		) {
			if (payload.type === "add") {
				const selectedNode = state.nodeList.find(
					(node) => node.id === payload.id
				);
				return {
					...state,
					selected: selectedNode ? selectedNode.id : null,
				};
			}

			return { ...state, selected: null };
		},

		// getNoOfChildren(state: NodeListState, action: PayloadAction<string>) {
		//     const node = state.nodeList.find((item) => item.id === action.payload);
		//     return node?.children.length || 0;
		// }
	},
});

export const nodeActions = NodeSlice.actions;
export const nodeReducers = NodeSlice.reducer;
