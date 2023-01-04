import { FC, Fragment } from "react";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/NodeStore";

const AddParent: FC = () => {
	const [noOfParents, setNoOfParents] = useState(0);
	const dispatch = useDispatch();

	const nodeHeight = 44;

	const changeNoOfParents = (type: number) => {
		type === 1
			? setNoOfParents((prev) => prev + 1)
			: setNoOfParents((prev) => (prev > 0 ? prev - 1 : prev));

		if (type === 1) {
			const nodeType = noOfParents === 0 ? "input" : "output";

			if (noOfParents > 1) {
				dispatch(
					nodeActions.changeType({
						id: `${noOfParents - 1}`,
						type: "default",
					})
				);
			}

			return dispatch(
				nodeActions.addNode({
					id: `${noOfParents}`,
					position: {
						x: 350,
						y: nodeHeight * (noOfParents + (noOfParents + 1)),
					},
					type: nodeType,
					isParent: true,
					data: { label: `parent ${noOfParents}` },
					width: 200,
					height: 1,
					children: [],
				})
			);
		}

		if (noOfParents > 2)
			dispatch(
				nodeActions.changeType({
					id: `${noOfParents - 2}`,
					type: "output",
				})
			);

		return dispatch(nodeActions.removeNode(`${noOfParents - 1}`));
	};

	return (
		<Fragment>
			<Typography
				variant="h5"
				gutterBottom
				component={"span"}
				pr="0.5rem"
			>
				Parent nodes
			</Typography>
			<IconButton onClick={() => changeNoOfParents(-1)} size="small">
				<RemoveIcon />
			</IconButton>
			<Typography
				variant="h5"
				gutterBottom
				component="span"
				fontWeight={"bold"}
				px={1}
			>
				{noOfParents}
			</Typography>

			<IconButton onClick={() => changeNoOfParents(1)} size="small">
				<AddIcon />
			</IconButton>
		</Fragment>
	);
};

export default AddParent;
