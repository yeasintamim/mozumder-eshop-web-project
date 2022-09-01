import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from './../LoadingError/Toast';
import Message from "../LoadingError/Error";
import Loading from "./../LoadingError/Loading";
import { toast } from 'react-toastify';
import { updateUserProfile } from "../../Redux/Actions/userActions";


const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);


  const Toastobjects = {
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable:false,
    autoclose:2000,//means 2 seconds

  }

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading,error,user } = userDetails;


  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading:updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    

    //password and confirm password should be same
    if (password !== confirmPassword) {
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
    }

  };



  return (
    <>
    <Toast/>
    {error && <Message variant="alert alert-danger">{error}</Message>}
    {loading && <Loading />}
    {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input
            className="form-control" type="text"
            required
            value={name}
            onChange={(e) =>setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input 
            className="form-control" type="email" 
            required
            value={email}
            onChange={(e) =>setEmail(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input 
            className="form-control" 
            type="password"
            required
            value={password}
            onChange={(e) =>setPassword(e.target.value)} 
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input 
            className="form-control" 
            type="password" 
            required
            value={confirmPassword}
            onChange={(e) =>setConfirmPassword(e.target.value)}

            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
