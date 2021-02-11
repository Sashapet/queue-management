import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../config/firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthProvider( {children} ) {
    const [currentUser, setCurrentUser] = useState();

    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }
    const logOut = () => {
        return auth.signOut();
    }
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsub;
    }, [])
    
    const value = {
        currentUser,
        signIn,
        logOut,
    }

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}
