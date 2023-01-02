import { Box, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/NodeStore";
import AddParent from "./AddParent";

const Parent: FC = (props) => {
	return (
		<Box>
			<AddParent />
		</Box>
	);
};

export default Parent;
