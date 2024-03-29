/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'; 
import { clearCredentials } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { toast } from 'react-toastify';

function Navbar() {
	const { userInfo }= useSelector((state: any) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [ logout ] = useLogoutMutation();


    const logoutHandler = async () => {
		try {
			await logout('logout').unwrap();
			dispatch(clearCredentials());
			navigate('/');
		} catch (error: any) {
			toast.error(error?.data?.message || error.error);
		}
    };

  return (
<div className="navbar rounded-lg">
	<div className="navbar-start">
		<a className="navbar-item">Job Board</a>
	</div>
	<div className="navbar-end">
		<a className="navbar-item">Add a job</a>
	</div>
	<div className="navbar-end">
		<a className="navbar-item">Find a job</a>
	</div>
	{userInfo ? (
	<div className="navbar-end">
	<div className="avatar avatar-ring avatar-md">
		<div className="dropdown-container">
			<div className="dropdown">
					<label className="btn btn-solid-success flex cursor-pointer px-0" tabIndex={0}>
					{/* <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" /> */}
					<a className="dropdown-item text-sm">{userInfo.name}</a>

				</label>
			<div className="dropdown-menu dropdown-menu-bottom-left">
					<Link to="/profile" className="dropdown-item text-sm">Profile</Link>

					<Link to="/" className="dropdown-item text-sm" onClick={logoutHandler}>Logout</Link>

					{/* <a tabIndex={-1} className="dropdown-item text-sm">Account settings</a>
					<a tabIndex={-1} className="dropdown-item text-sm">Subscriptions</a> */}
				</div>
			</div>
		</div>
	</div>
</div>
	) : (
		<div className="navbar-end">
                    <Link to="/login" className="navbar-item">Login</Link>

			</div>
	)}

</div>
  )
}

export default Navbar