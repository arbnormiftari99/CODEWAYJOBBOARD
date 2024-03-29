// Homepage.tsx
import React from 'react';
import JobsCard from './JobsCard/JobsCard'
const Homepage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Job Board</h1>
      <p>Find your dream job or post your job openings.</p>
      <JobsCard/>
    </div>
  );
}

export default Homepage;