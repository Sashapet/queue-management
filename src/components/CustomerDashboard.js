import React, {useEffect, useState} from 'react'
import {useCustomer} from '../context/CustomerContext'
import {useDashboard} from '../context/DashboardContext'
import CurrentVisits from '../components/CurrentVisits'
import IncomingVisits from '../components/IncomingVisits'
import Queue from './Queue'

let myInterval;

export default function CustomerDashboard(props) {
    const [queueView, setQueueView] = useState(false);
    const id = props.match.params.id;
    const {fetchUserData, userData, queueData,
         fetchIncomingVisits, loading, incomingVisits, cancelMeeting} = useCustomer();
    useEffect(() => {
        const handleUser = async () => {
          await fetchUserData(id);
          await fetchIncomingVisits();        }
         handleUser();
    }, [])
    if (loading || !queueData || !incomingVisits) {
        return <div className='customerDashboard-container'><h1>Loading...</h1></div>
    }
    if (!userData) {
        return <div className='customerDashboard-container'><h1>Page is don't exist</h1></div>
    }
    if (userData.status === 'ended') {
        return <div className='customerDashboard-container'><h1>A meeting has been ended, have a nice day!</h1></div>
    }else if(userData.status === 'canceled'){
        return <div className='customerDashboard-container'><h1>A meeting has been canceled</h1></div>
    }
    let customerView;
    if (!queueView) {

        customerView = (
            <>
                <p>Hello {userData.name}, Your token : {userData.token}</p>
                {userData.status === 'called' && <p>Your turn is up, please proceede to the counter</p>}
                {userData.status === 'started' && <p>A meeting have been started</p>}
                <button onClick={()=>cancelMeeting(userData.reservationCode, userData, userData.token)}>Cancel visit</button>
                <div className='display'>
                    <div className='current-visits'>
                        <CurrentVisits queueData={queueData} />
                    </div>
                    <div className='incoming-visits'>
                        <IncomingVisits incomingVisits={incomingVisits} />
                    </div>
                </div>
            </>
        )
    }else{
        customerView = <Queue userData={userData}/>
    }
    return (
        <div className='customerDashboard-container'>
            <h1>customerDashboard</h1>
            <button onClick={()=>setQueueView(false)}>Display</button>
            <button onClick={()=>setQueueView(true)}>Queue time</button>
            {customerView}
        </div>
    )
}
