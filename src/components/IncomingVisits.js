import React from 'react'

export default function IncomingVisits({incomingVisits}) {
    console.log('yes');
    return (
        <>
                {incomingVisits.map((visit, key)=> {
                return (
                    <h1 key={key}>{visit.token}</h1>
                )
            })}   
        </>
    )
}
