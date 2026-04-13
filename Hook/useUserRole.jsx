// import React, { useContext } from 'react';
// import { AuthContext } from '../src/Context/AuthContext';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const useUserRole = () => {
//     const {user,loading:authLoading} = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();

//     const {data:role=[],isLoading} = useQuery({
//         queryKey:['role',user?.email],
//         queryFn:async()=>{
//             const res = await axiosSecure.get(`/users/role/${user?.email}`);
//             return res.data;
//         }
       
//     })
//     return {
//         role,
//         isLoading,
//         authLoading
//     }
// };

// export default useUserRole;



import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../src/Context/AuthContext';
import useAxiosSecure from './useAxiosSecure';


const useUserRole = () => {
const {user,loading:authLoading}=useContext(AuthContext);
const axiosSecure = useAxiosSecure();
    
const {data:role=[],isLoading}=useQuery({
    queryKey:['role',user?.email],
    enabled:!authLoading && !!user?.email,
    queryFn:async()=>{
        const result = await  axiosSecure.get(`/users/role/${user?.email}`);
        return result.data;                                                    
    }
})
    return {
        role,
        isLoading,
        authLoading
    }
};

export default useUserRole;