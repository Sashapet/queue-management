import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {useCustomer} from '../context/CustomerContext'
import {useHistory} from 'react-router-dom'

export default function Reservation() {
    const [reservationDone, setReservationDone] = useState(false)
    const {reservation, reservationCode} = useCustomer();
    const history = useHistory();
    const specialistRef = useRef();
    const nameRef = useRef();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        let specialist = specialistRef.current.value;
        let name = nameRef.current.value;
        try{
            await reservation(specialist, name);
            setReservationDone(true);
        }
        catch(e){
            console.log(e.message);
        }
    }
    const handleProceed = (e) => {
        e.preventDefault();
        history.push(`/queue-management/display/${reservationCode}`);
    }
    if (reservationDone) {
        if (reservationCode) {
            return (
                <div className='reservation-container'>
                    <h1>PLEASE SAVE YOUR RESERVATION CODE : {reservationCode}</h1>
                    <button onClick={handleProceed}>Proceed</button>
                </div>
            )
        }else{
        <div className='reservation-container'>
            <h1>LOADING...</h1>
        </div>
        }

    }
    return (
        <div className='reservation-container'>
            <form>
                <label>Choose a specialist : </label><br />
                <select ref={specialistRef} name="specialists">
                    <option value="cardiologist">Cardiologist</option>
                    <option value="psychiatrist">Psychiatrist</option>
                    <option value="allergist">Allergist</option>
                    <option value="orthodontist">Orthodontist</option>
                </select><br />
                <label>Your Name</label><br/>
                <input ref={nameRef} type="text" /><br /><br />
                <Link to='/queue-management/'>Back</Link>
                <input type="submit" onClick={handleSubmit} value="Reserve" />
            </form>
        </div>
    )
}
