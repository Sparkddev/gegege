import React from 'react';

import './dashboard.css';
import edo from '../auth/edo.png';
import moment from 'moment';
import { useNavigate,Link } from 'react-router-dom';

import db from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { async } from '@firebase/util';
import axios from 'axios';


function Today (){
    return (
       
        <>

            <div className='main row'>
                <div className='col-md-3 third 'style={{
                    background:"#293D34",
                }}>

                    <div className='text-center py-5'>

                    <img src={edo} className="" style={{
                        width:"115px",
                        height:"115px",
                        borderRadius:"100%",
                    }} />

                    <br></br>

                    <br></br>


                
                        <Link style={{
                            textDecoration:"none",
                        }} to={'/today'}>
                        <p className='font-weight-bold alert alert-success text-success font-weight-bold py-1 mx-2 my-2'>Today's Record</p>
                        </Link>

                            <br/>
                        
                        <Link style={{
                            textDecoration:"none",
                        }} to={'/all-record'}>
                        <p className='font-weight-bold py-1 mx-2 my-2 hoverme rounded'>All Records</p>
                        </Link>

                 

               

       



                    </div>




                </div>

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

export default Today;