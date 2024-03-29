import React, { useEffect } from 'react';
import { useFetchJobsQuery } from '../../slices/jobsApiSlice';
import { toast } from 'react-toastify';

const JobsCard: React.FC = () => {
  const {data, isError, isLoading} = useFetchJobsQuery({});
  type Job = {
    id: string;
    title: string;
    companyname: string;
    location: string;
    description: string;
  };



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{toast.success('Error fetching jobs')}</div>;

  return (
    <div className="container">
      <div className="row">
        {data?.map((job: Job) => ( 
          <div className="col-md-4 mb-3" key={job.id}>
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
			<button className="btn-secondary btn">Learn More</button>
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
