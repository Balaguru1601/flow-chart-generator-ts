import { Box, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/NodeStore";
import AddChild from "./AddChild";
import { RootState } from "../../../store/redux";

const Child: FC = (props) => {
	const selected = useSelector((state: RootState) => state.node.selected);
	return <Box>{selected && <AddChild />}</Box>;
};

export default Child;
