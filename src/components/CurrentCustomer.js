import React, {useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

export default function CurrentCustomer() {

    const reservationCodeRef = useRef(null);
    
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let reservationCode = reservationCodeRef.current.value;
            history.push(`/queue-management/display/${reservationCode}`);
    }
       return (
       <div className='login-container'>
            <form>
                <label>Reservation Code : </label><br />
                <input ref={reservationCodeRef} type="text"/><br />
                <input type="submit" onClick={handleSubmit} value="Proceed" />
            </form>
            <Link to='/queue-management/'>Back</Link>
        </div>
        )
}
