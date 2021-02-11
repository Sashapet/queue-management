import React, {useRef, useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'

export default function SignIn() {

    const mailRef = useRef(null);
    const passRef = useRef(null);
    const {signIn} = useAuth();
    
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let email = mailRef.current.value;
        let password = passRef.current.value;
        try {
            await signIn(email, password);
            history.push('/queue-management/');
        }catch(e){
            console.log(e.message);
        }
    }
       return (
       <div className='login-container'>
            <form>
                <label>Mail : </label><br />
                <input ref={mailRef} type="text"/><br />
                <label>Password : </label><br/>
                <input ref={passRef} type="text" /><br /><br />
                <input type="submit" onClick={handleSubmit} value="Login" />
            </form>
            <Link to='/queue-management/'>Back</Link>
        </div>
        )
}
