import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    // create user
    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

  
        // user sign in 
        const userSignIn = (email,password) =>{
            setLoading(true);
            return signInWithEmailAndPassword(auth,email,password)
        };

        // googleSignIn 
        const googleSignIn = () =>{
            setLoading(true);
            return signInWithPopup(auth,googleProvider);
        };

        // currentUser
        useEffect(()=>{
         const unSubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('currentUser: ',currentUser);
            setLoading(false);
         });

         return ()=>{
            unSubscribe();
         };

        },[]);
       

        // update User Profile picture
        // const updateUserProfilePic = profileInfo =>{
        //     return updateProfile(auth.currentUser,profileInfo);
        // };


        const updateProfilePic = async(profilePic) =>{
          return updateProfile(auth.currentUser,profilePic);
        }

        
        //  user logout
        const logOut = ()=>{
            return signOut(auth);
        }

    const authInfo = {
    createUser,
    userSignIn,
    user,
    loading,
    googleSignIn,
    updateProfilePic,
    logOut
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;