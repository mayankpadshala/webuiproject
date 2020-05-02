import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutePaths from "./RoutePaths";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
        <Router>
          <RoutePaths />
        </Router>
    </div>
  );
}

export default App;
