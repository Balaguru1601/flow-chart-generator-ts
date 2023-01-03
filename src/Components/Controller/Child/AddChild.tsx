import { IconButton, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/NodeStore";
import { RootState } from "../../../store/redux";

const nodeHeight = 44;

const AddChild = () => {
	const [noOfChild, setNoOfChild] = useState(0);
	const parent = useSelector((state: RootState) => state.node.selected);
	const dispatch = useDispatch();

	const changeNoOfChild = (type: number) => {
		type === 1
			? setNoOfChild((prev) => prev + 1)
			: setNoOfChild((prev) => (prev > 0 ? prev - 1 : prev));

		console.log("parent Id:", parent.id);

		if (type === 1 && parent) {
			const nodeType = "default";

			return dispatch(
				nodeActions.addChildNode({
					id: `${parent.id}-child${
						parent.children ? parent.children?.length + 1 : 1
					}`,
					position: {
						x: parent.position.x + 200,
						y:
							parent.position.y +
							nodeHeight * (noOfChild + (noOfChild + 1)),
					},
					type: nodeType,
					isParent: false,
					isChild: true,
					parentId: parent.id,
					data: { label: `child ${noOfChild}` },
					width: 200,
					height: 1,
				})
			);
		}

		return dispatch(nodeActions.removeNode(`${noOfChild - 1}`));
	};

	console.log(parent);
	return (
		<Fragment>
			<Typography variant="h6">
				Parent : {parent && parent.data.label}
			</Typography>
			<IconButton onClick={() => changeNoOfChild(-1)} size="small">
				<RemoveIcon />
			</IconButton>
			<Typography
				variant="h5"
				gutterBottom
				component="span"
				fontWeight={"bold"}
				px={1}
			>
				{noOfChild}
			</Typography>

			<IconButton onClick={() => changeNoOfChild(1)} size="small">
				<AddIcon />
			</IconButton>
		</Fragment>
	);
};

export default AddChild;
