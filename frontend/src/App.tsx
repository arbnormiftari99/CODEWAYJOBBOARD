import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/HomePage'
import Navbar from './components/Navbar'
// import JobsCard from './components/JobsCard/JobsCard'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Profile from './components/Auth/Profile';
import CreateJobs from './components/JobsCard/CreateJobs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';
import JobsCardDetails from './components/JobsCard/JobsCardDetails';
import ApplicationForm from './components/JobApplication/ApplicationForm';

const App: React.FC = () => (
  <div className="container">
    <CookiesProvider>
     <BrowserRouter>
    <Navbar/>
    <ToastContainer/>
		<Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createjob" element={<CreateJobs />} />
      <Route path="/jobs/:id" element={<JobsCardDetails />} />
      <Route path="/applyjob/:id" element={<ApplicationForm/>}/>
		</Routes>
    </BrowserRouter>
    </CookiesProvider>
    </div>
);

export default App;
