import React, { useState, useEffect } from 'react';
import './dashboard.css';

import moment from 'moment';
import { useNavigate,Link } from 'react-router-dom';


import logo from '../logo.svg';



import {db, auth} from '../firebase';

import axios from 'axios'

import { collection, getDocs, where, query } from "firebase/firestore";
import Nav from './nav';


function DashBoardTwo(){


    const navigate = useNavigate();


    React.useEffect(()=>{
        var docId = localStorage.getItem("authid");

        if(docId == null){
            navigate('/');
        }
        
     

     
    },[]);



    const handleSignOut = () => {
        auth.signOut()
          .then(() => {
            // Sign-out successful.
            console.log("User signed out");

            localStorage.removeItem("authid");

         
            navigate('/');

        
          })
          .catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
          });
      };


    return (
        <>


<div className='main row'>
                <Nav />

                <div className='col-md-9 full bg-light m-0 px-0'>

                    <h5 className='card card-heading py-3 text-center m-0'style={{
                        fontWeight:"700",
                    }}>{moment(new Date()).format('dddd, MMMM DD, YYYY')}</h5>

                    <br/>
                    <br/>


                   
                    
                </div>


               




            </div>
        
        </>
    );
}

export default DashBoardTwo;