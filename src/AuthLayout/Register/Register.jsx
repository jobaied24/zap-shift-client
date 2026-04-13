import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin';
import useAxios from '../../../Hook/useAxios';


const Register = () => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const {createUser,updateProfilePic} = useContext(AuthContext);
    const [profilePic,setProfilePic]=useState('');
    const axiosInstance = useAxios();
    const navigate = useNavigate();


    const onSubmit = data =>{
        console.log(data);

        createUser(data.email,data.password)
        .then(async(result)=>{
          console.log(result.user);

         navigate('/');

          // update user info in database
          // const userInfo = {
          //   email:data.email,
          //   role:'user',
          //   create_at:new Date().toISOString(),
          //   last_login:new Date().toISOString()
          // };

          // const userResult = await axiosInstance.post('/users',userInfo);
          // console.log(userResult.data);

        const userInfo = {
          email:data.email,
          role:'user',
          create_at:new Date().toISOString(),
          last_login:new Date().toISOString()
        };


        const userRes = await axiosInstance.post('/users',userInfo);
        console.log(userRes.data);
        


          // update User ProfilePic in firebase

          const updateProfile = {
            displayName:data.name,
            profilePic:profilePic
          }

        updateProfilePic(updateProfile)
        .then(()=>{
          console.log('Profile picture updated');
        })
        .catch(error=>{
          console.log(error);
        })
          
      
        })
        .catch(error=>{
          console.log(error);
        });     
    };


    const handleImageUpload = async(e) =>{
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('image',image);
      const uploadImageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_upload_img_key}`;
      const res = await axiosInstance.post(uploadImageUrl,formData);
      setProfilePic(res.data.data.url);
    }

    
    return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
      <div className="card-body">
              <h1 className="text-4xl text-center font-bold">Create account</h1>
       
       {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">

        {/* name */}
          <label className="label">Name</label>
          <input type="text"
          {...register('name',{
            required:true
          })}
          className="input" placeholder="Your name" />

          {
            errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
          }
          

        {/* image */}
          <label className="label">Image</label>
          <input type="file"
          className="input"
          onChange={handleImageUpload}
          placeholder="Image" />



        {/* email */}
          <label className="label">Email</label>
          <input type="email"
          {...register('email',{
            required:true
          })}
          className="input" placeholder="Email" />

          {
            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
          }
          
          {/* password */}
          <label className="label">Password</label>
          <input type="password"
          {...register('password',{
            required:true,
            minLength:6
          })}
          className="input" placeholder="Password" />

          {
             errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
          }

          {
             errors.password?.type === 'minLength' && <p className='text-red-500'>password must be 6 characters or longer</p>
          }
         
          <div><a className="link link-hover">Forgot password?</a></div>
          
          <button className="btn btn-primary text-black mt-4">Register</button>
        </fieldset>
        </form>
       <p className='text-blue-500'><small>Already have an account? <Link to='/login' className='text-red-500 font-semibold'>Login</Link></small></p>
      <SocialLogin></SocialLogin>
      </div>
    </div>
    );
};

export default Register;
