import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useApplyJobMutation } from '../../slices/jobsApiSlice';
import { toast } from 'react-toastify';

const ApplicationForm = () => {
    const { id } = useParams(); 

  
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [resume, setResume] = useState('');
    const [coverLetter, setCoverLetter] = useState<string>('');


    const [applyJob] = useApplyJobMutation();
    const { userInfo } = useSelector((state: any) => state.auth);

    const handleChangeName = (e: any) => {
      setName(e.target.value);
    }
    const handleChangeEmail = (e: any) => {
      setEmail(e.target.value);
    }

    const handleResumeChange = (e: any) => {
        setResume(e.target.value);
    };

    const handleCoverLetterChange = (e: any) => {
        setCoverLetter(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const apply = {
          userId: userInfo._id,
          jobId: id,
          resume,
          coverLetter
        }
        if(apply){
          console.log(apply);
          await applyJob(apply);
          toast.success('Applied job successfully');
        }else{
          toast.error('Applied job failed');
        }
        console.log({ userId: userInfo._id, job_id: id, resume, coverLetter });
    };

    useEffect( () => {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email])

    return (
      <section className="bg-gray-2 rounded-xl mt-10">
      <div className="p-8 shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
        
            {userInfo && (
              <>
                <div className="w-full">
                <label className="sr-only" htmlFor="name">Name</label>
                <input className="input input-solid max-w-full" 
                placeholder="Name" 
                type="text" 
                id="name" 
                value={name}
                onChange={handleChangeName}
                disabled
                />
              </div>
              <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input className="input input-solid" 
              placeholder="Email address"
               type="email" 
               id="email" 
               value={email}
               onChange={handleChangeEmail}
               disabled
                />
            </div>
            </>
            )}
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="cv">Resume</label>
              <input className="input-file input-file-primary" 
              id="cv"
              type="file"
              value={resume}
              onChange={handleResumeChange}
             
              />

            </div>
          </div>
    
          <div className="w-full">
            <label className="sr-only" htmlFor="message">Cover Letter</label>
    
            <textarea className="textarea textarea-solid max-w-full" 
            placeholder="Cover Letter" 
            rows={8} 
            id="coverletter"
            value={coverLetter}
            onChange={handleCoverLetterChange}
            ></textarea>
          </div>
    
          <div className="mt-4">
            <button type="submit" className="rounded-lg btn btn-primary btn-block">Apply</button>
          </div>
        </form>
      </div>
    </section>
    );
};

export default ApplicationForm;
