import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
export default function Main() {
    return (
        <div className='operation-buttons'>
            <Link to='/reservation'>CUSTOMER</Link>
            <Link to='/signin'>SPECIALIST</Link>
        </div>
    )
}