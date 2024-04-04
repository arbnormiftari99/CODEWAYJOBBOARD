import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateJobsMutation } from '../../slices/jobsApiSlice';



const CreateJobs: React.FC = () => {
	const [title, setTitle] = useState<string>('');
    const [companyname, setCompanyName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [description, setDescription] = useState<string>('');
	
	const navigate = useNavigate();
	const dispatch = useDispatch();

    const [createJobs, { isLoading, isSuccess, isError}] = useCreateJobsMutation();


	const { userInfo } = useSelector((state: any) => state.auth);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);		
    };

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);		
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

     useEffect(() => {
        isSuccess && toast.success('Job created successfully') && navigate('/');
        isError && toast.error('Job creation failed');
     },[isSuccess, isError])


    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!userInfo || !userInfo._id) {
            throw new Error('User information is missing');
        }
        const createJob = {
            title,
            companyname,
            location,
            description,
            userId: userInfo._id,
            
            
         };
         const res =  createJobs(createJob);
               
        }
    
    return (
        
        <div className="mx-auto w-full max-w-lg">
            <div className="mt-8 bg-white py-8 px-6 shadow-md rounded-md">
                <h1 className="text-3xl font-semibold mb-4">Add a job</h1>
                <form onSubmit={handleSubmit}>
				<div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="input max-w-full"
                            placeholder="Type here"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="company" className="block text-sm font-medium mb-1">Company name</label>
                        <input
                            type="text"
                            id="company"
                            className="input max-w-full"
                            placeholder="Type here"
                            value={companyname}
                            onChange={handleCompanyChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            id="location"
                            className="input max-w-full"
                            placeholder="Type here"
                            value={location}
                            onChange={handleLocationChange}
                        />
                    </div>
                    <div className="mb-4">
                    <textarea className="textarea-ghost-primary textarea" 
                      id="description"
                      value={description}
                      onChange={handleDescriptionChange}
                    placeholder="Type here" />

                    </div>
                    <button type="submit" className="btn-primary w-full mb-4 h-10">Create a job</button>
                </form>
            </div>
        </div>
    );
};


export default CreateJobs