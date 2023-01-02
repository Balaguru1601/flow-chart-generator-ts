import { Provider } from "react-redux";
import "./App.css";
import Home from "./Components/Home/Home";
import store from "./store/redux";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Home />
			</Provider>
		</div>
	);
}

export default App;
