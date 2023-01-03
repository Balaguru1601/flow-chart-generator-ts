import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Node } from "reactflow";

interface nodeItem extends Node {
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
	children?: string[];
	parentId?: string;
}

interface NodeListState {
	initial: boolean;
	nodeList: nodeItem[];
	selected: nodeItem | null;
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
			console.log([...state.nodeList]);
			return {
				nodeList: [...state.nodeList, action.payload],
				initial: false,
				selected: null,
			};
		},

		addChildNode(state: NodeListState, action: PayloadAction<nodeItem>) {
			const parent = state.selected;
			parent?.children?.push(action.payload.id);
			const newNodeList = state.nodeList.filter(
				(node) => node.id !== action.payload.parentId
			);
			console.log([...newNodeList, parent, action.payload]);
			console.log(state.nodeList[0].position);
			return {
				nodeList: [...state.nodeList, action.payload],
				initial: false,
				selected:
					state.nodeList.find(
						(item) => item.id === action.payload.parentId
					) || null,
			};
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
					selected: selectedNode ? selectedNode : null,
				};
			}

			return { ...state, selected: null };
		},
	},
});

export const nodeActions = NodeSlice.actions;
export const nodeReducers = NodeSlice.reducer;
