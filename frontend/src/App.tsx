import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/HomePage'
import Navbar from './components/Navbar'
// import JobsCard from './components/JobsCard/JobsCard'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <div className="container">
    <Navbar/>
    <ToastContainer/>
  <BrowserRouter>
		<Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

		</Routes>
    </BrowserRouter>
    </div>
);

export default App;
