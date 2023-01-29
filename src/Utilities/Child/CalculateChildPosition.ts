import { nodeItem } from "../../store/NodeStore";

const widthOffset = 170;
const heightOffset = 44;

export const CalculateChildPosition = (
	parent: nodeItem,
	childList: nodeItem[]
): nodeItem[] => {
	const x = parent.position.x + widthOffset;
	const nodeWidth = parent.width;
	if (childList.length == 1) {
		childList[0].position.x = x;
		childList[0].position.y = parent.position.y;
		return childList;
	}
	const noOfRightChilds = Math.floor(childList.length / 2);
	const noOfLeftChilds = childList.length - noOfRightChilds;

	const isLREqual = noOfLeftChilds === noOfRightChilds;

	const leftHeightOffset = noOfLeftChilds % 2 ? heightOffset / 2 : 0;
	const rightHeightOffset = noOfRightChilds % 2 ? heightOffset / 2 : 0;

	console.log(
		"noOfleftChilds: ",
		noOfLeftChilds,
		"noOfRightchilds: ",
		noOfRightChilds
	);

	for (let i = 0; i < noOfRightChilds; i++) {
		const y =
			i % 2
				? parent.position.y + Math.floor(i / 2) * heightOffset
				: parent.position.y - Math.floor(i / 2) * heightOffset;
		childList[2 * i].position.x = x - nodeWidth - 2 * widthOffset;
		childList[2 * i].position.y =
			y + (i % 2 ? leftHeightOffset : -leftHeightOffset);
		childList[2 * i + 1].position.x = x;
		childList[2 * i + 1].position.y =
			y + (i % 2 ? rightHeightOffset : -rightHeightOffset);
	}

	if (!isLREqual) {
		childList[childList.length - 1].position.x =
			x - nodeWidth - 2 * widthOffset;
		childList[childList.length - 1].position.y = -(
			parent.position.y +
			(noOfLeftChilds / 2) * heightOffset +
			leftHeightOffset
		);
	}

	console.log(JSON.parse(JSON.stringify(childList)));

	return childList;
};
