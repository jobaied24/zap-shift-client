// import React, { useContext } from 'react';
// import { AuthContext } from '../Context/AuthContext';
// import { Navigate, useLocation } from 'react-router';
// import useUserRole from '../../Hook/useUserRole';

// const AdminSecureRouts = ({children}) => {
//     const {user,loading} = useContext(AuthContext);
//     const location = useLocation();
//     const {role,isLoading} =useUserRole();
    
//         if(loading || isLoading){
//         return <>
//         <span className="loading loading-ball loading-xs"></span>
// <span className="loading loading-ball loading-sm"></span>
// <span className="loading loading-ball loading-md"></span>
// <span className="loading loading-ball loading-lg"></span>
// <span className="loading loading-ball loading-xl"></span>
//         </>
//     };


//     if(!user || role !=='admin'){
//         return <Navigate state={{from:location.pathname}} to='/forbidden'></Navigate>
//     }

//     return children;
// };

// export default AdminSecureRouts;


import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useUserRole from '../../Hook/useUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminSecureRouts = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const {role} = useUserRole();
    const location = useLocation();
    

      if(loading){
        return <>
        <span className="loading loading-ball loading-xs"></span>
<span className="loading loading-ball loading-sm"></span>
<span className="loading loading-ball loading-md"></span>
<span className="loading loading-ball loading-lg"></span>
<span className="loading loading-ball loading-xl"></span>
        </>
    };


    if(!user || role !== 'admin'){
      return   <Navigate state={{from:location.pathname}} to='/forbidden'></Navigate>
    };


    return children;
};

export default AdminSecureRouts;