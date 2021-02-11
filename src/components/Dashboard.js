import React, {useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import { useDashboard} from '../context/DashboardContext'
import {useHistory} from 'react-router-dom'

export default function Dashboard() {
    const {logOut} = useAuth();
    const {fetchSpecialist, specialistData,
         callMeeting, startMeeting, endMeeting, cancelMeeting} = useDashboard();
    // const [currentStatus, setCurrentStatus] = useState()
    const history = useHistory();
    useEffect(() => {
        fetchSpecialist();
    }, [])
    const handleLogOut = async () => {
       try {
           await logOut()
            history.push('/');
        }catch(e){
            console.log(e.message);
        }
    }
    if (!specialistData) {
        return <div>Loading...</div>
    }
    console.log(specialistData);
    const {specialistInfo} = specialistData;
    const {currentPatient} = specialistData.specialistInfo;
    return (
        <div className='dashboard-container'>
            <h1>DashBoard</h1>
            <h1>Specialist : {specialistInfo.role}</h1>
            <p>Current patient: {currentPatient.name}</p>
            <p>Patient token: {currentPatient.token}</p>
            <p>Status: {currentPatient.status}</p>
            <div className='customer-container'>
                {specialistData.customers.map((customer, key)=>{
                    return (
                        <div key={key} className='customer'>
                            <p>{customer.token}</p>
                            <p>{customer.name}</p>
                            <button 
                                className={(key === 0 && currentPatient.token==='')   ? 'allow' : 'restrict'} 
                                onClick={()=>callMeeting(customer.token, customer.reservationCode, customer.name)}>
                                Call
                            </button>
                            <button 
                                className={(currentPatient.token === customer.token && currentPatient.status==='called') ? 'allow' : 'restrict'} 
                                onClick={()=>startMeeting(customer.reservationCode)}>
                                Start meeting
                            </button>
                            <button 
                                className={(currentPatient.token === customer.token && currentPatient.status==='started') ? 'allow' : 'restrict'} 
                                onClick={()=>endMeeting(customer.reservationCode)}>
                                End meeting
                            </button>
                            <button 
                                className='cancel'
                                onClick={()=>cancelMeeting(customer.reservationCode, customer.token, currentPatient.token)}>
                                Cancel meeting
                            </button>
                        </div>
                    )
                })}
                </div>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}
