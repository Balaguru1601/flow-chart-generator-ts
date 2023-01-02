import { Box, IconButton, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../store/NodeStore";
import Parent from "./Parent/Parent";
import Child from "./Child/Child";

const Controller: FC = (props) => {
	return (
		<Box>
			<Paper sx={{ padding: "2%" }}>
				<Typography variant="h3" gutterBottom>
					Controllers
				</Typography>
				<Parent />
				<Child />
			</Paper>
		</Box>
	);
};

export default Controller;
