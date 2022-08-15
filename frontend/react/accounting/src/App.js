import logo from './logo.svg';
import './App.css';
import Input from './component//input'
import Table from './component/Table';
import TrialBalance from './component/TrialBalance'

import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/table" element={<Table />} />
          <Route path="/trialBalance" element={<TrialBalance />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
