
import {
	BrowserRouter,
	Routes, // instead of "Switch"
	Route,
  } from "react-router-dom";

import Home from "./component/Home";
import Register from "./component/Register";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/edit/:id" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
