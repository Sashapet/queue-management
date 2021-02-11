import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import {useCustomer} from '../context/CustomerContext'

export default function Reservation() {
    const {reservation} = useCustomer();
    const specialistRef = useRef();
    const nameRef = useRef();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        let specialist = specialistRef.current.value;
        let name = nameRef.current.value;
        await reservation(specialist, name);
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
                <Link to='/'>Back</Link>
                <input type="submit" onClick={handleSubmit} value="Reserve" />
            </form>
        </div>
    )
}
