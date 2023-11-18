import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

    const auth = getAuth(app)

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState("loading")
    const provider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const googleLogin = () => {
        return signInWithPopup(auth, provider )
    }

    const logOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("current user",currentUser)
        })

        return () => {
            unSubscribe()
        }
    }, [])

    // const profileUpdate = (name, photo) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName : name,  
    //         photoURL : photo,
    //     })
    // }

    const userInfo = {
        user,
        setUser,
        isLoading,
        createUser,
        googleLogin,
        signIn,
        logOut,
        
    }




    



    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;