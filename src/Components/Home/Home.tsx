import Chart from "../Chart/Chart";
import Controller from "../Controller/Controller";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";

const Home: FC = (props) => {
	return (
		<Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
			<Grid container spacing={2} m={0} height={"100%"}>
				<Grid xs={8}>
					<Chart />
				</Grid>
				<Grid xs={4}>
					<Controller />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;
