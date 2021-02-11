import React from 'react'

export default function CurrentVisits({queueData}) {
    return (
        <>
                        {queueData.map((visit, key)=>{
            return (
                    <h1 key={key}>{visit.desk} ----{'>'} {visit.currentPatient.token}</h1>
            ) 
            })}
        </>
    )
}
