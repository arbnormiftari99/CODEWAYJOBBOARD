import React, { useEffect, useState } from 'react';
import { useFetchJobsQuery, useDeleteJobMutation } from '../../slices/jobsApiSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';



const JobsCard: React.FC = () => {
  const {data, isError, isLoading} = useFetchJobsQuery({});
 const [deleteJob] = useDeleteJobMutation();

 const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(data || []);
  
  type Job = {
    _id: string;
    title: string;
    companyname: string;
    location: string;
    description: string;
    userId: string;
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setFilteredJobs(data);
    }
  }, [data, isError, isLoading]);

  const handleDeleteJob = async (id: string) => {
   try {
    await deleteJob(id);
    toast.success('Job deleted successfully');
   } catch (error) {
    toast.error('Delete job failed');
   }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterJobs(query);
  };

  const filterJobs = (query: string) => {
    if (!query) {
      setFilteredJobs(data || []);
      return;
    }

    const filtered = data.filter(
      (job: any) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase()) ||
        job.companyname.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

 
  const { userInfo } = useSelector((state: any) => state.auth);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{toast.success('Error fetching jobs')}</div>;

  return (

     <div className="container">
  <form className="max-w-lg mx-auto mt-10">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" 
        id="default-search" 
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Find your dream job" 
        required 
        value={searchQuery}
        onChange={handleSearch}
        />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
<div className="grid grid-cols-4 gap-4">
</div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mx-10 mt-5">
        {filteredJobs?.map((job: Job) => ( 
          <div className="col-md-4 mb-3" key={job._id}>
            <div className="card">
              <img
                // src="https://source.unsplash.com/random/300x200"
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
        {userInfo && userInfo._id === job.userId && ( 
          <button className="btn btn-error" onClick={() => handleDeleteJob(job._id)}>Delete</button>
        )}
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
