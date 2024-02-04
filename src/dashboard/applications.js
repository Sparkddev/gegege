import React, { useState, useEffect } from 'react';
import './dashboard.css';

import moment from 'moment';
import { useNavigate,Link } from 'react-router-dom';


import logo from '../logo.svg';



import {db, auth} from '../firebase';

import axios from 'axios'

import { collection, getDocs, where, query, doc, setDoc,deleteDoc } from "firebase/firestore";



function Application(){


    const navigate = useNavigate();


    React.useEffect(()=>{
        var docId = localStorage.getItem("authid");

        if(docId == null){
            navigate('/');
        }
        
     

     
    },[]);

    const [applications, setApplication] = useState([]);

    const fetchApplication = async () => {
        const applicationCollection = collection(db, 'Applications');
        const q = query(applicationCollection);
  
        try {
          const querySnapshot = await getDocs(q);
          const applicationData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setApplication(applicationData);
        } catch (error) {
          console.error('Error fetching jobs: ', error);
        }
      };

    useEffect(() => {
        
    
        fetchApplication();
      }, []); 




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


    //   const[title, setTitle] = useState("");
    //   const[category, setCategory] = useState("");
    //   const[employment, setEmployment] = useState("");
    //   const[location, setLocation] = useState("");
    //   const[city, setCity] = useState("");
    //   const[zipcode, setZipCode] = useState("");
    //   const[salary, setSalary] = useState("");
    //   const[description, setDescription] = useState("");

    //   const[isLoading , setLoading] = useState(false);

    //   const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');







    return (
        <>


<div className='main row'>
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
                        <p className='font-weight-bold py-1 mx-2 my-3 hoverme rounded'>Dashboard</p>
                        </Link>
                        
                        <Link style={{
                            textDecoration:"none",
                        }} to='/super/jobs'>
                        <p className='font-weight-bold py-1 mx-2 my-3 hoverme rounded'>Jobs</p>
                        </Link>


                        <Link style={{
                            textDecoration:"none",
                        }} to='/applications'>
                        <p className='font-weight-bold py-1 mx-2 my-3 activelink  rounded'>Applications</p>
                        </Link>

                        <br/>
                        <button onClick={handleSignOut} className='btn btn-danger text-light font-weight-bold'>Logout</button>

                 

               

       



                    </div>




                </div>

                <div className='col-md-9 full bg-light m-0 px-0'>

                    <h5 className='card card-heading py-3 text-center m-0'style={{
                        fontWeight:"700",
                    }}>{moment(new Date()).format('dddd, MMMM DD, YYYY')}</h5>

                    <br/>
                 


                   




                    <div className='table-responsive'>
                        <table className='table table-striped table-hover table-borderless'>
                            <thead className='tablehead'style={{
                                color:"white",
                                fontSize:"13px"
                            }}>
                                <tr style={{
                                color:"white",
                                fontSize:"13px"
                            }}>
                                    <th >Job Title</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Resume Url</th>
                                    
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>


                             {applications.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.job}</td>
                                <td>{job.firstname}</td>
                                <td>{job.lastname}</td>
                                <td>{job.email}</td>
                              
                                <td>{job.phone}</td>
                                <td>

                                    <a href={job.resume} target="_blank">View Resume</a>
                                </td>
                                <td>
                                   Action
                                </td>
                               
                           
                                </tr>
                            ))} 
                                
                            </tbody>
                        </table>

                    </div>

                   
                    
                </div>



                
               




            </div>
        
        </>
    );
}

export default Application;