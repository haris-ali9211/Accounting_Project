import logo from './logo.svg';
import './App.css';
import Input from './component//input'
import Table from './component/Table';
import TrialBalance from './component/TrialBalance'
import BalanceSheet from './component/balanceSheet';
import IncomeStatement  from './component/IncomeStatement';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  console.log('testing')
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/table" element={<Table />} />
          <Route path="/trialBalance" element={<TrialBalance />} />
          <Route path="/incomeStatement" element={<IncomeStatement />} />
          <Route path="/balanceSheet" element={<BalanceSheet />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
