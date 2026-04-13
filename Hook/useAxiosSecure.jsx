import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../src/Context/AuthContext';
import { useNavigate } from 'react-router';



const axiosInstance = axios.create({
    baseURL:'http://localhost:5000'
});

const useAxiosSecure = () => {
    const {user,logOut}=useContext(AuthContext);
    const navigate = useNavigate();

    axiosInstance.interceptors.request.use(config=>{
        config.headers.Authorization=`Berar ${user.accessToken}`;
        return config;
    },error=>{
        return Promise.reject(error);
    });



axiosInstance.interceptors.response.use(res=>{
    return res;
},error=>{
    const status = error.response.status;
    console.log(status);
    if(status ===401){
        logOut()
        .then(()=>{
            navigate('/login')
        })
    }
    // else if(status === 403){
    //  navigate('/forbidden');
    // };

    return Promise.reject(error);
})

    return axiosInstance
};

export default useAxiosSecure;