import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';



import {db, auth} from '../firebase';
import { useNavigate } from 'react-router-dom';


function Nav(){

    const navigate = useNavigate();
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
        <div className='col-md-3 third 'style={{
            background:"#154470",
        }}>

            <div className='text-center py-5'>

            <img src={logo} className="" style={{
                width:"115px",
                height:"115px",
                borderRadius:"100%",
            }} />

            <br></br>

            <br></br>


        
                

<Link style={{
                    textDecoration:"none",
                }} to='/super/dashboard'>
                <p className='font-weight-bold py-1 mx-2 my-3 activelink rounded'>Dashboard</p>
                </Link>
                
                <Link style={{
                    textDecoration:"none",
                }} to='/super/jobs'>
                <p className='font-weight-bold py-1 mx-2 my-3 hoverme rounded'>Jobs</p>
                </Link>


                <Link style={{
                    textDecoration:"none",
                }} to='/applications'>
                <p className='font-weight-bold py-1 mx-2 my-3 hoverme rounded'>Applications</p>
                </Link>


                <Link style={{
                    textDecoration:"none",
                }} to='/admin-onboard'>
                <p className='font-weight-bold py-1 mx-2 my-3 hoverme rounded'>Onboarding</p>
                </Link>

                <br/>
                <button onClick={handleSignOut} className='btn btn-danger text-light font-weight-bold'>Logout</button>

         

       





            </div>




        </div>
    );
}

export default Nav;