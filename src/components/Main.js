import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
export default function Main() {
    return (
        <div className='operation-buttons'>
            <Link to='/queue-management/reservation'>CUSTOMER</Link>
            <Link to='/queue-management/current-customer'>CURRENT CUSTOMER</Link>
            <Link to='/queue-management/signin'>SPECIALIST</Link>
        </div>
    )
}