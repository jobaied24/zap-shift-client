import React from 'react';
import useUserRole from '../../../Hook/useUserRole';
import Loading from '../../../src/Components/Loading';
import UserDashBoard from '../../../src/Components/UserDashBoard';
import RiderDashBoard from '../../../src/Components/RiderDashBoard';
import AdminDashBoard from '../../../src/Components/AdminDashBoard';
import Forbidden from '../../Forbidden/Forbidden';

const DashBoardHome = () => {
    const {role,isLoading} = useUserRole();


    if(isLoading){
        return <Loading></Loading>
    };

    if(role === 'user'){
        return <UserDashBoard></UserDashBoard>
    }
    else if(role === 'rider'){
        return <RiderDashBoard></RiderDashBoard>
    }
    else if(role === 'admin'){
        return <AdminDashBoard></AdminDashBoard>
    }
    else{
        return <Forbidden></Forbidden>
    }

};

export default DashBoardHome;