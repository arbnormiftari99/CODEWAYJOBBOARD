import React, { useEffect } from 'react';
import { useFetchJobsQuery } from '../../slices/jobsApiSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobsCard: React.FC = () => {
  const {data, isError, isLoading} = useFetchJobsQuery({});
  type Job = {
    _id: string;
    title: string;
    companyname: string;
    location: string;
    description: string;
  };



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{toast.success('Error fetching jobs')}</div>;

  return (
    <div className="container">
      <div className="flex grid grid-cols-4 gap-4 mx-5">
        {data?.map((job: Job) => ( 
          <div className="col-md-4 mb-3" key={job._id}>
            <div className="card">
              <img
                src="https://source.unsplash.com/random/300x200"
                alt=""
                className="card-img-top"
              />
              <div className="card-body">
                <h2 className="card-header">{job.title}</h2>
                <p className="text-content2">Company: {job.companyname}</p>
                <p className="text-content2">Location: {job.location}</p>
                <p className="text-content2">Description: {job.description}</p>
				<div className="card-footer">
        <Link to={`/jobs/${job._id}`} className="btn-secondary btn">Learn More</Link>
		</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsCard;
