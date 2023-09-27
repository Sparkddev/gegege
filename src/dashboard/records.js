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


import { collection, getDocs, where, query } from "firebase/firestore";




function Records(){

    // states here

    const[hospital_code,setHospitalCode] = useState("");
    const[pullData, setPullData] = useState([]);
    const[todayEntry , setTodayEntry] = useState([]);
    const[dischargedEntry, setDischargeEntry] = useState([]);

    const[selected ,setSelectedModal] = useState({});
    const[selected_Array , setSelectedArray] = useState([]); 

    const[selected_Surgical, setSelectedSurgical] = useState([]);

    const[selected_xray, setSelectedXray] = useState([]);

    const[selected_medication, setSelectedMedication] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('');

    const[outcome, setOutcome] = useState("");




    // end of states



    const navigate = useNavigate();


    const getCollectionDate =  async() => {
        try {
           // const q= await getDocs(collection(db, 'hospitals'));
            const hospitalsRef = collection(db, 'hospitals');
            const q = query(hospitalsRef, where('hospital_code', '==', hospital_code)
            
            );
    
    
        const querySnapshot = await getDocs(q);
            const fetchedData = [];
          querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            fetchedData.push({ id: doc.id, ...doc.data() });
          });
          setPullData(fetchedData);
    
          console.log(pullData)
       
    
    
        }
    
    
        catch(e){
            console.error("Error getting documents: ", e);
        }
    }



    // get today entry

    const getTodayEntry =  async() => {
        try {
           // const q= await getDocs(collection(db, 'hospitals'));
            const hospitalsRef = collection(db, 'hospitals');
            const q = query(hospitalsRef, where('hospital_code', '==', hospital_code),where('date', '==', moment(new Date()).format('dddd, MMMM DD, YYYY')));
    
    
        const querySnapshot = await getDocs(q);
            const fetchedData = [];
          querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            fetchedData.push({ id: doc.id, ...doc.data() });
          });
          setTodayEntry(fetchedData);
    
    
          console.log(pullData)
    
    
        }
    
    
        catch(e){
            console.error("Error getting documents: ", e);
        }
    }


    // getDischargedEntry

    const getDischargedEntry =  async() => {
        try {
           // const q= await getDocs(collection(db, 'hospitals'));
            const hospitalsRef = collection(db, 'hospitals');
            const q = query(hospitalsRef, where('hospital_code', '==', hospital_code),where('outcome', '==', "Discharged to Home"));
    
    
        const querySnapshot = await getDocs(q);
            const fetchedData = [];
          querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            fetchedData.push({ id: doc.id, ...doc.data() });
          });
          setDischargeEntry(fetchedData);
    
    
        
    
    
        }
    
    
        catch(e){
            console.error("Error getting documents: ", e);
        }
    }

    



    // 
    

   


    React.useEffect(() => {

    
        
        var hospital = localStorage.getItem("hospital");

        if(hospital == null){
            navigate('/');
        }
        else{
            setHospitalCode(hospital);

            
        }

        

  



}, []);


React.useEffect(() => {
getCollectionDate();
getTodayEntry();
getDischargedEntry();


}, [hospital_code]);




// pull data 

const filteredData = pullData.filter(item => {
    const genderMatch = genderFilter === '' || item["gender"] === genderFilter;
    const nameMatch = searchTerm === '' || item["firstname"].includes(searchTerm) || item["lastname"].includes(searchTerm);
    
    const outcomeMatch = outcome === '' || item["outcome"] === outcome;
    return genderMatch && nameMatch && outcomeMatch;
  });



//   const filteredData = laboratory.filter((pros) =>
//   pros["gender"].toLowerCase().includes(laboratoryTerm.toLowerCase())
// );




function handleLogout(){
    var hospital = localStorage.getItem("hospital");

    if(hospital != null){
        localStorage.removeItem('hospital');
        navigate('/');
    }
}



function showBadge(out){
    if(out == "Stable Condition" || out == "Discharged to Home" || out == "Improved Condition" || out == "Patient Satisfaction" ){
        return (
           <p style={{
               fontSize:"9px"
           }} className='badge badge-sm badge-success text-light'>{out}</p>
        );
    }

    else if (out == "Death") {
        return (
            <p style={{
                fontSize:"9px"
            }} className='badge badge-sm badge-danger text-light'>{out}</p>
         );
    } else {
        return (
            <p style={{
                fontSize:"9px"
            }} className='badge badge-sm badge-warning text-dark'>{out}</p>
         );
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

                            <h3 className='text-center font-weight-bold showcasetext'>{pullData.length}</h3>
                            <h5 className='text-center font-weight-bold showcasetext'>Total Entry</h5>
                        </div>

                        <div className='col-md-4 py-2 bg-secondary rounded'>
                             <i className='fa fas-users'></i>

                            <h3 className='text-center font-weight-bold showcasetext'>{todayEntry.length}</h3>
                            <h5 className='text-center font-weight-bold showcasetext'>Today Records</h5>
                        </div>

                        <div className='col-md-4 py-2 rounded'style={{
                            backgroundColor:"rgb(41, 61, 52)",
                        }}>
                                <i className='fa fas-users'></i>

                            <h3 className='text-center font-weight-bold showcasetext'>{dischargedEntry.length}</h3>
                            <h5 className='text-center font-weight-bold showcasetext'>Discharged</h5>
                        </div>

                    </div>

                    {/* search section  */}

                    <div class="card shadow rounded py-3 mx-2 mt-4">
                        <div className='row mx-3 py-2'>
                            <div class="col">
                            
                            <input value={searchTerm} onChange={function(e){
                                setSearchTerm(e.target.value);
                            }} type="text"placeholder='Search by Name' class="form-control"/>
                            </div>
                            {/* <div class="col">
                            <label>Last Name   </label>
                            <input type="text" class="form-control" />
                            </div> */}
                            <div class="col">
                                {/* <label>Gender </label> */}
                                <select value={genderFilter} onChange={function(e){
                                    setGenderFilter(e.target.value)
                                }} className='form-control'>
                                    <option value="">Choose Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div class="col">
                                {/* <label>Outcome </label> */}
                                <select value={outcome} onChange={function(e){
                                    setOutcome(e.target.value);

                                }} className='form-control'>
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
                               
                                <th>Date of Entry</th>
                                <th>Outcome</th>
                                {/* <th>Date of Discharged</th> */}

                                <th>Actions</th>

                                {/* seconda */}
                            </tr>

                        </thead>
                        

                        <tbody>
                            {filteredData.map(function(d){
                                return (
                                    <tr key={d.id}>
                                        <td>{d.firstname}</td>
                                        <td>{d.lastname}</td>
                                        <td>{d.gender}</td>
                                        <td>{d.card_number}</td>
                                        
                                        <td>{d.date}</td>
                                        <td>
                                            {showBadge(d.outcome)}
                                        </td>
                                        <td>
                                            <a type='button' data-toggle="modal" data-target=".bd-example-modal-lg"onClick={function(){
                                                setSelectedModal(d);
                                                setSelectedArray(d.lab);

                                                setSelectedSurgical(d.surgery);
                                                setSelectedXray(d.scan);
                                                setSelectedMedication(d.medications);
                                            }} className='btn btn-sm font-weight-bold'style={{
                                                    background: "rgb(41, 61, 52)",
                                                    color:"white",
                                            }}>View</a>  <a onClick={function(){
                                                
                                                    // navigate('/edit');
                                                
                                                    navigate('/edit',
                                                    {state:
                                                        {refcode:d.refcode, 
                                                            temperature:d.temperature,
                                                            heartrate:d.heartrate,
                                                            bloodpressure:d.bloodpressure,
                                                            weight:d.weight,
                                                            oxygen_saturation:d.oxygen_saturation,
                                                            diagnosis_name:d.diagnosis_name,
                                                            diagnoses_suspected:d.diagnoses_suspected,
                                                            lab:d.lab,
                                                            surgery:d.surgery,
                                                            medication:d.medications,
                                                            scan:d.scan,
                                                            outcome:d.outcome,
                                                            discharged:d.discharged,
                                                            id:d.id,

                                                            // date:moment(selectedDate).format('dddd, MMMM DD, YYYY'), 
                                                            // time: moment(selectedTime, 'h:mm a').format('h:mm a')
                                                
                                                        }
                                                    }
                                                    );
                                                
                                            }} className='btn btn-sm btn-warning text-dark font-weight-bold'>Edit</a>
                                        </td>

                                      
                                        {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button> */}

                                        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content"style={{
                                                background: "rgb(41, 61, 52)",
                                                color:"white",
                                            }}>
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">View Record</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                                <div className='py-3 px-2'>
                                                    <h6 className='font-weight-bold'>PATIENT'S INFORMATION</h6>
                                                        <div class="row my-4">
                                                            <div class="col">
                                                            <label className='label'>First Name  </label>
                                                            <p className='font-weight-bold'>{selected.firstname}</p>
                                                            </div>
                                                            <div class="col">
                                                            <label className='label'>Last Name  </label>
                                                            <p className='font-weight-bold'>{selected.lastname}</p>
                                                            </div>
                                                            <div class="col">
                                                                <label className='label'>Gender   </label>
                                                                <p className='font-weight-bold'>{selected.gender}</p>
                                                            </div>
                                                        </div>

                                                        <div class="row my-4">
                                                            <div class="col">
                                                            <label className='label'>Card Number  </label>
                                                            <p className='font-weight-bold'>{selected.card_number}</p>
                                                            </div>
                                                            <div class="col">
                                                            <label className='label'>Date of Birth  </label>
                                                            <p className='font-weight-bold'>{selected.dob}</p>
                                                            </div>
                                                            <div class="col">
                                                                <label className='label'>Date of Admission   </label>
                                                                <p className='font-weight-bold'>{selected.date_of_admission}</p>
                                                            </div>
                                                        </div>

                                                       
                                                </div>

                                                {/* VITALS */}
                                               



                                                <div className=' px-2'>
                                                    <h6 className='font-weight-bold'>VITAL SIGNS</h6>
                                                        <div class="row my-3">
                                                            <div class="col">
                                                            <label className='label'>Temperature (°C)  </label>
                                                            <p className='font-weight-bold'>{selected.temperature}</p>
                                                            </div>
                                                            <div class="col">
                                                            <label className='label'>Heart Rate (bpm) </label>
                                                            <p className='font-weight-bold'>{selected.heartrate}</p>
                                                            </div>
                                                            <div class="col">
                                                                <label className='label'>Blood pressure (mmHg)   </label>
                                                                <p className='font-weight-bold'>{selected.bloodpressure}</p>
                                                            </div>

                                                            <div class="col">
                                                                <label className='label'>Weight (kg)  </label>
                                                                <p className='font-weight-bold'>{selected.weight}</p>
                                                            </div>

                                                            
                                                        </div>

                                                        <div class="row ">
                                                        <div class="col-3">
                                                                <label className='label'>Oxygen saturation (%)  </label>
                                                                <p className='font-weight-bold'>{selected.oxygen_saturation}</p>
                                                            </div>
                                                           
                                                        </div>

                                                        

                                                       
                                                </div>



                                                {/* VITALS */}

                                                {/* Diagnosis and procedures */}

                                                <div className=' px-2'>
                                                    <h6 className='font-weight-bold'>DIAGNOSIS AND PROCEDURES</h6>
                                                        <div class="row my-3">
                                                            <div class="col">
                                                            <label className='label'>Diagnosis  </label>
                                                            <p className='font-weight-bold'>{selected.diagnosis_name} {selected.diagnoses_suspected == true && <span><input className='px-3' type="checkbox" checked={selected.diagnoses_suspected} />Suspected</span>} </p>
                                                            </div>
                                                            <div class="col">
                                                            <label className='label'>Laboratory Test </label> <br/>
                                                            {selected_Array.map((list, index) => (
                                                                <p style={{
                                                                    background:"#293D34",
                                                                    color:"white",
                                                                
                                                                    
                                                                }} className='badge mx-1 my-2'key={index}>{list}</p>
                                                            ))}
                                                            </div>
                                                           

                                                            

                                                            
                                                        </div>


                                                        <div class="row my-3">
                                                           
                                                            <div class="col">
                                                            <label className='label'>Surgical Intervention </label> <br/>
                                                            {selected_Surgical.map((list, index) => (
                                                                <p style={{
                                                                    background:"#293D34",
                                                                    color:"white",
                                                                
                                                                    
                                                                }} className='badge mx-1 my-2'key={index}>{list}</p>
                                                            ))}
                                                            </div>
                                                           

                                                            <div class="col">
                                                            <label className='label'>Xray & Ultrasound </label> <br/>
                                                            {selected_xray.map((list, index) => (
                                                                <p style={{
                                                                    background:"#293D34",
                                                                    color:"white",
                                                                
                                                                    
                                                                }} className='badge mx-1 my-2'key={index}>{list}</p>
                                                            ))}
                                                            </div>

                                                            

                                                            
                                                        </div>

                                                        

                                                        

                                                       
                                                </div>
                                                {/* end of diagnosis and procedures */}


                                                {/* medication and outcome */}

                                                <div className=' px-2'>
                                                    <h6 className='font-weight-bold'>MEDICATIONS & OUTCOME</h6>
                                                        <div class="row my-3">

                                                        <div class="col">
                                                            <label className='label'>Medication(s) </label> <br/>
                                                            {selected_medication.map((list, index) => (
                                                                <p style={{
                                                                    background:"#293D34",
                                                                    color:"white",
                                                                
                                                                    
                                                                }} className='badge mx-1 my-2'key={index}>{list}</p>
                                                            ))}
                                                            </div>



                                                            <div class="col">
                                                            <label className='label'>Outcome  </label>
                                                            <p className='font-weight-bold'>{selected.outcome}  </p>
                                                            </div>
                                                            
                                                           {/* adding to database */}

                                                            

                                                            
                                                        </div>


                                                        
                                                        

                                                        

                                                       
                                                </div>

                                                {/* end of medication and outcome */}


                                                {/* Admission and Discharge */}

                                                <div className=' px-2'>
                                                    <h6 className='font-weight-bold'>ADMISSION & DISCHARGE</h6>
                                                        <div class="row my-3">

                                                      
                                                        <div class="col">
                                                            <label className='label'>Date Admitted  </label>
                                                            <p className='font-weight-bold'>{selected.date_of_admission}  </p>
                                                            </div>


                                                            <div class="col">
                                                            <label className='label'>Discharge Date  </label>
                                                            <p className='font-weight-bold'>{selected.discharged}  </p>
                                                            </div>
                                                            
                                                           {/* adding to database */}

                                                            

                                                            
                                                        </div>


                                                        
                                                        

                                                        

                                                       
                                                </div>



                                                 {/* End of Admission and discharge */}



                                               
                                            </div>
                                        </div>
</div>

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