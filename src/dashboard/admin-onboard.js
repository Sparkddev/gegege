import React, { useState, useEffect } from 'react';
import './dashboard.css';

import moment from 'moment';
import { useNavigate,Link } from 'react-router-dom';


import logo from '../logo.svg';



import {db, auth} from '../firebase';

import axios from 'axios'

import { collection, getDocs, where, query, doc, setDoc,deleteDoc } from "firebase/firestore";
import Nav from './nav';


function AdminOnBoard(){


    const navigate = useNavigate();


    React.useEffect(()=>{
        var docId = localStorage.getItem("authid");

        if(docId == null){
            navigate('/');
        }
        
     

     
    },[]);

    const [applications, setApplication] = useState([]);

    const fetchApplication = async () => {
        const applicationCollection = collection(db, 'final');
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


    <Nav />
               
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
                                   
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Last Name</th>
                                    <th>Maiden Name</th>
                                    <th>DOB</th>
                                    <th>SSN</th>
                                    <th>Routing</th>
                                    <th>Account No.</th>
                                    <th>Driver's Front</th>
                                    <th>Driver's Back</th>
                                    <th>Driver's Hold</th>
                                    <th>Normal Photo</th>
                                    <th>W2</th>
                                    
                                  
                                </tr>

                            </thead>


                            <tbody style={{
                                color:"black",
                                fontSize:"13px"
                            }}>


                             {applications.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.firstname}</td>
                                <td>{job.middlename}</td>
                                <td>{job.lastname}</td>
                                <td>{job.maidenname}</td>
                              
                                <td>{job.dob}</td>
                                <td>{job.Sn}</td>
                                <td>{job.routing_number}</td>
                                <td>{job.account_number}</td>
                                
                                <td>

                                    <a href={job.dfront} target="_blank">View</a>
                                </td>

                                <td>

                                <a href={job.dback} target="_blank">View</a>
                                </td>

                                <td>

                                <a href={job.dhold} target="_blank">View</a>
                                </td>


                                <td>

<a href={job.normal} target="_blank">View</a>
</td>


<td>

<a href={job.w2} target="_blank">View</a>
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

export default AdminOnBoard;