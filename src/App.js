import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './redux/store';
import Pages from './pages/Pages';
import LoginPage from "./components/login/LoginPage.jsx";
import InfraApprovals from './components/listItems/InfraApprovals.jsx';
import NetworkPage from './components/listItems/NetworkPage.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Pages />} />
          <Route path="/infra-approvals" element={<InfraApprovals />} />
          <Route path="/network-page" element={<NetworkPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
