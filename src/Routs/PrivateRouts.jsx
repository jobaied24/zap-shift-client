import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation} from 'react-router';

const PrivateRouts = ({children}) => {
    const {loading,user} = useContext(AuthContext);
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

if(!user){
  return <Navigate state={{from:location.pathname}} to='/login'></Navigate>
};

return children;

};


export default PrivateRouts;