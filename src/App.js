import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./Router";
import { registerChartJs } from "./components/dashboard/register-chart-js";

registerChartJs();

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
