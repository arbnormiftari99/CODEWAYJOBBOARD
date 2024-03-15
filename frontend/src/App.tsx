import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/HomePage'
import Navbar from './components/Navbar'
import JobsCard from './components/JobsCard/JobsCard';

const App: React.FC = () => (
  <div className="container">
    <Navbar/>
    <JobsCard/>
  <BrowserRouter>
		<Routes>
      <Route path="/" element={<Homepage />} />
		</Routes>
    </BrowserRouter>
    </div>
);

export default App;
