import React, {useEffect, useState} from 'react'
import {useDashboard} from '../context/DashboardContext'

export default function Queue({userData}) {
    const [position, setPosition] = useState()
    const [startTimer, setStartTimer] = useState(false);
    const {fetchCustomers, specialistData} = useDashboard();
    const [min, setMin] = useState();
    const [sec, setSec] = useState();
    useEffect(() => {
        const fetchData = async () => {
            await fetchCustomers({role:userData.specialist})
        }
        fetchData();
    }, [])
    useEffect(() => {
        specialistData && calculateWaitingTime();
    }, [specialistData])
    useEffect(() => {
        if (startTimer) {
            if (sec < 0) {
                setMin(min-1)
                setSec(59);
                return;
            }
            if (min === 0 && sec ===0) {
                setSec(0)
                setMin((position-1)*10)
                setStartTimer(false);
            }
            // save intervalId to clear the interval when the
            // component re-renders
            const intervalId = setInterval(() => {
                setSec(sec - 1);
            }, 1000);
            // clear interval on re-render to avoid memory leaks
            return () => clearInterval(intervalId);
            // add timeLeft as a dependency to re-rerun the effect
            // when we update it

        }
      }, [sec, startTimer]);
    if(!specialistData){
        return (
        <div className='queue-container'>
            <h1>Loading...</h1>
        </div>
        )
    }
    // console.log(specialistData.customers);
    const calculateWaitingTime = () => {
        const {customers} = specialistData;
        let indexInQueue;
        customers.forEach((customer, index) => {
            if (userData.reservationCode === customer.reservationCode) {
                indexInQueue = index;
            }
        });
        setPosition(indexInQueue);
        //LETS SAY, THAT ONE SERVICE IS APPROXIMATELY 10min.
        let serviceTime = 10;
        //START OF THE MEETING
        let begginTimestamp = customers[0].meetingStartTime;
        if (begginTimestamp) {
            let startTime = new Date (begginTimestamp);
                    // END TIME IS MAX 10min
            let endTime = new Date ( startTime );
            endTime.setMinutes ( startTime.getMinutes() + 10 );
            //NOW TIME
            let now = new Date().getTime();
            //SUBRTRACTING TO GET SECONDS AND MINUTES BETWEEN THIS TIME AND MAX END MEETING TIME
            if (now>endTime.getTime()) {
                console.log('Time already passed, current meeting is longer than 10 minutes');
                setSec(0)
                setMin(indexInQueue*serviceTime)
                setStartTimer(false);
            }else{
                let distance = endTime.getTime() - now;
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                console.log('minutes : '+minutes);
                console.log('seconds : '+seconds);
                setSec(seconds);
                setMin(minutes);
                setStartTimer(true);
            }
        }else{
            setSec(0)
            setMin(indexInQueue*serviceTime)
            setStartTimer(false);
        }
    }
    return (
        <div className='queue-container'>
            <h1>Your're {position+1}th in the queue</h1>
            <h1>Queue waiting time</h1>
            {!startTimer ? <p>{min} : {sec}</p> : (position === 0 ? <p>00:00</p> : <p>{min+(position-1)*10}:{sec}</p>)}
        </div>
    )
}
