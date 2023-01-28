import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
	Controls,
	Background,
	MiniMap,
	useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeActions } from "../../store/NodeStore";
import { RootState } from "../../store/redux";
import classes from "./Chart.module.css";

const Chart = () => {
	const dispatch = useDispatch();

	const nodes = useSelector((state: RootState) => state.node.nodeList);

	const selectNode = (id: string | null) => {
		if (id)
			return dispatch(
				nodeActions.updateSelectedNode({ type: "add", id })
			);
		return dispatch(nodeActions.updateSelectedNode({ type: "remove" }));
	};

	return (
		<Box
			sx={{
				height: "100%",
			}}
		>
			<ReactFlow
				nodes={nodes}
				className={classes.reactFlow}
				onNodeClick={(evt, node) => selectNode(node.id)}
				onPaneClick={(evt) => selectNode(null)}
			>
				<Background />
				<Controls />
				<MiniMap />
			</ReactFlow>
		</Box>
	);
};

export default Chart;
