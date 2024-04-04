import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFetchJobByIdQuery } from '../../slices/jobsApiSlice';
import { useSelector } from 'react-redux';


const JobsCardDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { data: job, isLoading, isError } = useFetchJobByIdQuery(id);
    const { userInfo } = useSelector((state: any) => state.auth);


    const handleApplyClick = () => {
      navigate(`/applyjob/${id}`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching job details</div>;
    if (!job) return <div>No job found</div>;

  return (
    <div className='p-6'>
    <div className="px-4 sm:px-0">
      <h3 className="text-base font-semibold leading-7 text-gray-900">Job details</h3>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Details about this opportunity.</p>
    </div>
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{job.title}</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Company</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{job.companyname}</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{job.location}</dd>
        </div>
        {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
        </div> */}
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">About the role</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {job.description}
          </dd>
        </div>
        {userInfo ? (
          <button type="submit" className="btn-primary w-full mb-4 h-10" onClick={handleApplyClick}>Apply for this job</button>
        ) : (
          // <button type="submit" className="btn-primary w-full mb-4 h-10">You must Login before you apply for this job</button>
          <Link to="/login" type="submit" className="btn-primary w-full mb-4 h-10">You must Login before you apply for this job</Link>


        )}
      
      </dl>
    </div>
  </div>
  )
}

export default JobsCardDetails