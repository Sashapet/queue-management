import React, {useState, useContext} from 'react'
import {database} from '../config/firebase'
import {useHistory} from 'react-router-dom'

const CustomerContext = React.createContext();

export const useCustomer = () => {
    return useContext(CustomerContext);
}

export function CustomerProvider( {children} ) {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [incomingVisits, setIncomingVistis] = useState();
    const [queueData, setQueueData] = useState();
    const history = useHistory();

    const reservation = (specialist, name) => {
        const reservationsRef = database.ref('reservations');
        const counterRef = database.ref('/reservations/counter');
        counterRef.transaction(value=>{
            if (value === null) {
              // the counter doesn't exist yet, start at one
              return 1;
            } else if (typeof value === 'number') {
              // increment - the normal case
              return value + 1;
            }else{
                console.log('Not a number');
            }
        })
        .then((snap)=>{
            let token = snap.snapshot.node_.value_;
            const key = reservationsRef.push().getKey();
            const date = new Date();
            const customer = {
                name,
                specialist,
                token,
                status:"incoming",
                reservationCode:key,
                timestamp:date.getTime(),
            }
            reservationsRef.child(key).set(customer).then(() => {
                history.push(`/queue-management/display/${key}`);
            })
        })
    }

    const fetchUserData = (id) => {
        const reservationRef = database.ref('/reservations')
        reservationRef.on('value', snap => {
            if (snap.child(id).exists()) {
                let user = snap.child(id).val();
                setUserData(user);
                fetchDisplay();
            }else{
                console.log('dont exist');
                setLoading(false);
            }
        })
    }
    const fetchDisplay = () => {
        const currentVisits = database.ref('/specialists');
        currentVisits.on('value', snap => {
            const data = snap.val();
            const queueArray = [];
            for(let i in data){
                queueArray.push(data[i]);
            }
            setLoading(false)
            setQueueData(queueArray);
        })
    }
    const fetchIncomingVisits = () => {
        const reservationsRef = database.ref('/reservations');
        const query = reservationsRef
            .orderByChild('status')
            .equalTo('incoming')
            .limitToFirst(5);

        query.on('value',snap => {
            const data = snap.val();
            const visitsArray = [];
            for(let i in data){
                visitsArray.push(data[i])
            }
            setIncomingVistis(visitsArray);
        })                     
    }
    const cancelMeeting = async (reservationCode, queueData, token ) => {
        const reservationRef = await database.ref('reservations/'+reservationCode)
        await reservationRef.update({status:"canceled"});
        await reservationRef.remove();
        const findSpecialist = queueData.find(el=>el.currentPatient.token === token);
        if (findSpecialist) {
            const specialistId = findSpecialist.id;
            const currentPatientRef =  await database.ref('specialists/'+specialistId+'/currentPatient');
            await currentPatientRef.update({status:'', token:'',name:''})
        }
    }
    const value = {
        reservation,
        fetchUserData,
        fetchDisplay,
        fetchIncomingVisits,
        cancelMeeting,
        userData,
        incomingVisits,
        queueData,
        loading,
    }
    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    )
}
