import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../slices/usersApiSlice';



const Profile: React.FC = () => {
	const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
	
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [updateProfile, { isLoading }] = useUpdateProfileMutation();

	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		setName(userInfo.name);
        setEmail(userInfo.email);
	}, [userInfo.name, userInfo.email]);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);		
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);		
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (userInfo && userInfo._id) {
            console.log('Success');
            console.log(userInfo);
        } else {
            console.log('UserInfo is null or undefined');
        }
    
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else { 
            try {
                if (!userInfo || !userInfo._id) {
                    throw new Error('User information is missing');
                }
    
                const updatedUserData = {
                    // _id: userInfo._id,
                    name,
                    email,
                    password
                };
    
                const res = await updateProfile(updatedUserData).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile updated successfully');
            } catch (error: any) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };
    

  

    return (
        <div className="mx-auto w-full max-w-sm">	
            <div className="mt-8 bg-white py-8 px-6 shadow-md rounded-md">
                <h1 className="text-3xl font-semibold mb-4">Update Profile</h1>
                <form onSubmit={handleSubmit}>
				<div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Full name</label>
                        <input
                            type="text"
                            id="name"
                            className="input max-w-full"
                            placeholder="Type here"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="input max-w-full"
                            placeholder="Type here"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input max-w-full"
                            placeholder="Type here"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="input max-w-full"
                            placeholder="Type here"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <input type="checkbox" className="checkbox mr-2" id="remember-me" />
                            <label htmlFor="remember-me" className="text-sm">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="text-sm text-blue-600">Forgot your password?</Link>
                    </div>
                    <button type="submit" className="btn-primary w-full mb-4">Update</button>
                </form>
                <div className="text-center text-sm">
                    <p>Don't have an account yet? <Link to="/signup" className="text-blue-600">Sign up.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Profile