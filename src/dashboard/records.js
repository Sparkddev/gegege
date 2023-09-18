import React, { useState } from 'react';
import './dashboard.css';
import edo from '../auth/edo.png';
import moment from 'moment';
import { useNavigate,Link } from 'react-router-dom';
import diagnoses from './diagnosis';
import laboratory from './laboratory';
import surgical from './surgical';
import scan from './scan';
import medication from './medication';
import db from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { async } from '@firebase/util';
import axios from 'axios'

import { collection, getDocs } from "firebase/firestore";




function Records(){

    // states here

    const[hospital_code,setHospitalCode] = useState("");
    const[pullData, setPullData] = useState([]);



    // end of states



    const navigate = useNavigate();

    const getCollectionDate =  async() => {
        try {
            const querySnapshot = await getDocs(collection(db, 'hospitals'));
    
            const fetchedData = [];
          querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            fetchedData.push({ id: doc.id, ...doc.data() });
          });
          setPullData(fetchedData);
        }
    
    
        catch(e){
            console.error("Error getting documents: ", e);
        }
    }


    React.useEffect(() => {

       
        
        var hospital = localStorage.getItem("hospital");

        if(hospital == null){
            navigate('/');
        }
        else{
            setHospitalCode(hospital);

            getCollectionDate();
        }

        

  



}, []);



// pull data 





function handleLogout(){
    var hospital = localStorage.getItem("hospital");

    if(hospital != null){
        localStorage.removeItem('hospital');
        navigate('/');
    }
}



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


                
                        {/* <Link style={{
                            textDecoration:"none",
                        }} to={'/today'}>
                        <p className='font-weight-bold alert alert-success text-success font-weight-bold py-1 mx-2 my-2'>Today's Record</p>
                        </Link> */}


                        {/* <Link style={{
                            textDecoration:"none",
                        }} to={'/today'}>
                        <p className='font-weight-bold  font-weight-bold py-1 mx-2 my-2'>Today's Record</p>
                        </Link>

                            <br/> */}

<Link style={{
                            textDecoration:"none",
                        }} to={'/dashboard'}>
                        <p className='font-weight-bold py-1 mx-2 my-3 hoverme  rounded'>Dashboard</p>
                        </Link>
                        
                        <Link style={{
                            textDecoration:"none",
                        }} to={'/records'}>
                        <p className='font-weight-bold py-1 mx-2 my-3 activelink rounded'>View Records</p>
                        </Link>

                        <br/>
                        <button onClick={handleLogout} className='btn btn-danger text-light font-weight-bold'>Logout</button>

                 

               

       



                    </div>




                </div>

                <div className='col-md-9 full bg-light m-0 px-0'>

                    {/* <h5 className='card card-heading py-3 text-center m-0'style={{
                        fontWeight:"700",
                    }}>{moment(new Date()).format('dddd, MMMM DD, YYYY')}</h5>

                    <br/>
                    <br/> */}
                    <br/>



                    <div className='container row m-auto'>
                        <div className='col-md-4 py-2 bg-info rounded'>
                            <i className='fa fas-users'></i>

                            <h3 className='text-center font-weight-bold showcasetext'>88</h3>
                            <h5 className='text-center font-weight-bold showcasetext'>Total Patients</h5>
                        </div>

                        <div className='col-md-4 py-2 bg-secondary rounded'>
                             <i className='fa fas-users'></i>

                            <h3 className='text-center font-weight-bold showcasetext'>3</h3>
                            <h5 className='text-center font-weight-bold showcasetext'>Admitted Today</h5>
                        </div>

                        <div className='col-md-4 py-2 rounded'style={{
                            backgroundColor:"rgb(41, 61, 52)",
                        }}>
                                <i className='fa fas-users'></i>

                            <h3 className='text-center font-weight-bold showcasetext'>88</h3>
                            <h5 className='text-center font-weight-bold showcasetext'>Discharged</h5>
                        </div>

                    </div>

                    {/* search section  */}

                    <div class="card shadow rounded py-3 mx-2 mt-4">
                        <div className='row mx-3 py-2'>
                            <div class="col">
                            
                            <input type="text"placeholder='Search by Name' class="form-control"/>
                            </div>
                            {/* <div class="col">
                            <label>Last Name   </label>
                            <input type="text" class="form-control" />
                            </div> */}
                            <div class="col">
                                {/* <label>Gender </label> */}
                                <select className='form-control'>
                                    <option value="">Choose Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div class="col">
                                {/* <label>Outcome </label> */}
                                <select className='form-control'>
                                    <option value="">Choose Outcome</option>
                                    <option value="">Select Outcome</option>
                             <option value="Improved Condition">Improved Condition</option>
                                <option value="Stable Condition">Stable Condition</option>
                                <option value="Discharged to Home">Discharged to Home</option>
                               
                                <option value="Surgical Success">Surgical Success</option>
                                <option value="Complications Resolved">Complications Resolved</option>
                                <option value="Functional Improvement">Functional Improvement</option>
                                <option value="Pain Management">Pain Management</option>
                                <option value="Disease Management">Disease Management</option>
                                <option value="Infection Control">Infection Control</option>
                                <option value="Preventive Measures">Preventive Measures</option>
                                <option value="Medication Management">Medication Management</option>
                                <option value="Symptom Relief">Symptom Relief</option>
                                <option value="Patient and Family Education">Patient and Family Education</option>
                                <option value="Patient Satisfaction">Patient Satisfaction</option>
                                <option value="Long-term Management Plan">Long-term Management Plan</option>
                                <option value="Referred">Referred</option>
                               
                                <option value="Death">Death</option>
                                </select>
                            </div>
                        </div>

                        </div>

                        <br/>


                        <div className='table-responsive mt-4'>
                    <table className='table table-stripe'>

                        <thead style={{
                             backgroundColor:"rgb(41, 61, 52)",
                             color:"white",
                        }}>

                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Card Number</th>
                                <th>DOB</th>
                                <th>Date of Entry</th>
                                {/* <th>Date of Discharged</th> */}

                                <th>Actions</th>

                                {/* seconda */}
                            </tr>

                        </thead>
                        

                        <tbody>
                            {pullData.map(function(d,index){
                                return (
                                    <tr key={index}>
                                        <td>{d.firstname}</td>
                                        <td>{d.lastname}</td>
                                        <td>{d.gender}</td>
                                        <td>{d.card_number}</td>
                                        <td>{d.dob}</td>
                                        <td>{d.date}</td>
                                        <td>
                                            <a className='btn btn-sm font-weight-bold'style={{
                                                    background: "rgb(41, 61, 52)",
                                                    color:"white",
                                            }}>View</a> || <a className='btn btn-sm btn-warning text-dark font-weight-bold'>Edit</a>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>

                </div>


                        {/* end of col-9 */}

                </div>


             

            </div>
        </>
    );
}


export default Records;