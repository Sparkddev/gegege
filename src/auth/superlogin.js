import React, { useEffect } from 'react';
import './login.css';

import { useState } from 'react';



import { async } from '@firebase/util';

import { Link, useNavigate}  from 'react-router-dom';

import logo from '../footer.svg';



import { auth, db } from "../firebase";

import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";





function SuperLogin(){

    


   
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

  

    const [showError, setShowError] = useState(false);

   const[email, setEmail] = useState("");
   const[message, setMessage] = useState("");



  


        React.useEffect(() => {

          
                // var hospital = localStorage.getItem("hospital");

                // if(hospital != null){
                //     navigate('/dashboard');
                // }
        
          
        
    
    
        }, []);


        async function handleSignIn(e) {
            e.preventDefault();
            setShowError(false);
          
            try {
              const userCredential = await signInWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;
              console.log("Signed in as:", user);
        
              localStorage.setItem("authid", user.uid);
          
             
          
              // Continue with your navigation logic
              navigate('/super/dashboard');
            } catch (error) {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Error signing in:", errorCode, errorMessage);
              setShowError(true);
              setMessage(errorMessage);
            }
          }
    

  
    return (
        <div className='maindiv'style={{
            
            minHeight:"100vh",
            width:"100%",
            overflow:'hidden',
            display:'flex',
            flexDirection:'column',
            justifyContent:"center",
           
            
            
        }}>



            <form onSubmit={handleSignIn}>
                {/* <div className='form-group'>
                    <input onChange={function(e){
                        setHospitalCode(e.target.value);
                    }} value={hospital_code} type="text"name="hospital_code"className='form-control'placeholder='Enter Hospital Code'required />

                </div> */}

                <div className='col-md-4 m-auto'>

                    <div className='text-center py-5'>

                        {showError && <div className='alert alert-danger text-danger text-center'>
                            <p className='text-center'>Invalid Login Credentials</p>

                        </div>}

                    <img src={logo} className="" style={{
                        width:"150px",
                        height:"150px",
                        borderRadius:"100%",
                    }} />

                    </div>

                    


                    <div className='form-group'>
                        <input onChange={function(e){
                            setEmail(e.target.value);

                        }} value={email} type="text"className='form-control py-4'placeholder='Enter Email Address'required />

                    </div>

                 

                    <div className='form-group'>
                        <input onChange={function(e){
                            setPassword(e.target.value);

                        }} value={password} type="password"className='form-control py-4'placeholder='Enter Secured Password'required />

                    </div>
                   

                    <div className='text-center'>
                <button type='submit' className='btn btn-sm submit py-2'>Go To Dashboard</button>

                </div>

                </div>

                {/* <input type="text"className='form-control w-100'placeholder='Enter Hospital Name'/> */}

               
                <br/>

                {/* <Link to={}></Link> */}

                
                

                
            </form>



            

            
            
            
        
        
        </div>
    );
}

export default SuperLogin;