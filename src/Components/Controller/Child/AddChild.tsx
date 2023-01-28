import { IconButton, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/NodeStore";
import { RootState } from "../../../store/redux";

const nodeHeight = 44;

const AddChild = () => {
	const [noOfChild, setNoOfChild] = useState(0);
	const parent = useSelector((state: RootState) => {
		const node = state.node.nodeList.find(
			(item) => item.id === state.node.selected
		);
		return node;
	});
	// console.log("parent: ", parent, noOfChild);
	const dispatch = useDispatch();

	useEffect(() => setNoOfChild(parent?.children.length || 0), [parent]);

	const changeNoOfChild = (type: number) => {
		type === 1
			? setNoOfChild((prev) => prev + 1)
			: setNoOfChild((prev) => (prev > 0 ? prev - 1 : prev));

		if (type === 1 && parent) {
			const nodeType = "default";

			return dispatch(
				nodeActions.addChildNode({
					id: `${parent.id}-child-${
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
					children: [],
				})
			);
		}

		return dispatch(
			nodeActions.removeNode(`${parent!.id}-child-${noOfChild}`)
		);
	};

	return (
		<Fragment>
			<Typography variant="h6">Parent : {parent!.data.label}</Typography>
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
