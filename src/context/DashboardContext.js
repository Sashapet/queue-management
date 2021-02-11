import React, {useContext, useState} from 'react'
import {database} from '../config/firebase'
import {auth} from '../config/firebase'

const DashboardContext = React.createContext();

export const useDashboard = () => {
    return useContext(DashboardContext);
}

export function DashboardProvider( {children} ) {
    const [specialistData, setSpecialistData] = useState();
    const fetchSpecialist = () => {
        const userId = auth.currentUser.uid;
        const specialistRef =  database.ref('specialists/'+userId);

        specialistRef.on('value', snap =>{
            const specialistInfo = snap.val();
            fetchCustomers(specialistInfo);
        })
    }
    const fetchCustomers = (specialistInfo) => {
        const role = specialistInfo.role;
        const reservationsRef = database.ref("reservations");
        const query = reservationsRef
            .orderByChild('specialist')
            .equalTo(role);
        query.on('value', snap => {
            const data = snap.val();
            const customersArray = [];
            for(let i in data){
                customersArray.push(data[i])
            }
            customersArray.sort((a, b)=>{
                return a.timestamp - b.timestamp
            })
            setSpecialistData({specialistInfo, customers:customersArray})
        })
    }
    const callMeeting = async (token, reservationCode, name) => {
        const userId = auth.currentUser.uid;
        const displayRef =  await database.ref('display/'+userId);
        const specialistRef =  await database.ref('specialists/'+userId);
        const reservationRef = await database.ref('reservations/'+reservationCode)
        await displayRef.update({ token });
        await reservationRef.update({status:'called'});
        await specialistRef.update({currentPatient:{name:name, token:token, status:'called'}})
    }
    const startMeeting = async (reservationCode) => {
        const userId = auth.currentUser.uid;
        const date = new Date();
        const reservationRef = await database.ref('reservations/'+reservationCode);
        const currentPatientRef =  await database.ref('specialists/'+userId+'/currentPatient');
        await reservationRef.update({status:'started', meetingStartTime:date.getTime()});
        await currentPatientRef.update({status:'started'})
    }
    const endMeeting = async (reservationCode) => {
        const userId = auth.currentUser.uid;
        const reservationRef = await database.ref('reservations/'+reservationCode);
        const currentPatientRef =  await database.ref('specialists/'+userId+'/currentPatient');
        await reservationRef.update({status:"ended"});
        await reservationRef.remove();
        await currentPatientRef.update({status:'', token:'',name:''})
    }
    const cancelMeeting = async (reservationCode, token, currentPatientToken) => {
        const userId = auth.currentUser.uid;
        const reservationRef = await database.ref('reservations/'+reservationCode)
        const currentPatientRef =  await database.ref('specialists/'+userId+'/currentPatient');
        await reservationRef.update({status:"canceled"});
        await reservationRef.remove();
        if (currentPatientToken === token) {
            await currentPatientRef.update({status:'', token:'',name:''})
        }
    }
    const value = {
        specialistData,
        fetchSpecialist,
        fetchCustomers,
        callMeeting,
        startMeeting,
        endMeeting,
        cancelMeeting
    }
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}
