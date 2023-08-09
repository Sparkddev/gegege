import React, { useState } from 'react';
import './dashboard.css';
import edo from '../auth/edo.png';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import diagnoses from './diagnosis';
import laboratory from './laboratory';
import surgical from './surgical';
import scan from './scan';
import medication from './medication';
import db from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { async } from '@firebase/util';

function Dashboard(){

    // Form data here

    // Personal information
    const[firstname , setFirstName] = useState("");
    const[lastname, setLastName] = useState("");
    const[gender, setGender] = useState("");
    const[card_number, setCardNumber] = useState("");
    const[dob, setDob] = useState("");
    const[date_of_admission, setDateOfAdmission] = useState("");

    const[outcome,setOutcome] = useState("");

    const[discharged_date, setDisChargedDate] = useState("");

    const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');

    // Vital Signs

    const[temperature,setTemperature] = useState("");
    const[heartrate,setHeartRate] = useState("");
    const[bloodpressure,setBloodPressure] = useState("");
    const[weight,setWeight] = useState("");
    const[oxygen_saturation, setOxygenSaturation] = useState("");

    // diagnosis

    const[diagnosesList , setDiagnosesList]= useState({ name: '', isSuspected: false });
    // For Diagnoses searches functions
    const [diagnosisTerm, setDiagnosisTerm] = useState('');

    //handle Diagnosis change
    const handleDiagnosisChange = (event) => {
        setDiagnosisTerm(event.target.value);
      };

      //filter diagnosis

      const filteredDiagnosis = diagnoses.filter((dynos) =>
      dynos.toLowerCase().includes(diagnosisTerm.toLowerCase())
    );

    React.useEffect(()=>{
        
     

     
    },[diagnosesList.isSuspected]);


    // laboratory 
    const[laboratoryList , setLaboratoryList] = useState([]);
    //for laboratory search
    const [laboratoryTerm, setLaboratoryTerm] = useState('');
    

    const handleLaboratoryChange = (event) => {
        setLaboratoryTerm(event.target.value);
    };
    
    const filteredLaboratory = laboratory.filter((pros) =>
        pros.toLowerCase().includes(laboratoryTerm.toLowerCase())
    );


    // surgical 

  
      const[surgicalList , setSurgicalList] = useState([]);
      //for laboratory search
      const [surgicalTerm, setSurgicalTerm] = useState('');

      const handleSurgicalChange = (event) => {
        setSurgicalTerm(event.target.value);
    };

    const filteredSurgical = surgical.filter((pros) =>
        pros.toLowerCase().includes(surgicalTerm.toLowerCase())
    );
    

    // scan 

    const[scanList , setScanList] = useState([]);
    //for laboratory search
    const [scanTerm, setScanTerm] = useState('');

    const handleScanChange = (event) => {
      setScanTerm(event.target.value);
  };

  const filteredScan = scan.filter((pros) =>
      pros.toLowerCase().includes(scanTerm.toLowerCase())
  );



  //medication

  const[medicationList , setMedicationList] = useState([]);
    //for laboratory search
    const [medicationTerm, setMedicationTerm] = useState('');

    const handleMedicationChange = (event) => {
      setMedicationTerm(event.target.value);
  };

  const filteredMedication = medication.filter((pros) =>
      pros.toLowerCase().includes(medicationTerm.toLowerCase())
  );




      


    




    // End of form data

     const navigate = useNavigate();
    React.useEffect(() => {

       
        
        var hospital = localStorage.getItem("hospital");

        if(hospital == null){
            navigate('/');
        }

  



}, []);


async function addToFireStore(e){
    e.preventDefault();

    try {

        const first_name = firstname;
        const last_name = lastname;
        const mygender = gender;
        const mydob = dob;
        const mycard = card_number;
        const dateofadmission = date_of_admission;
        const temp = temperature;
        const heart = heartrate;
        const blood = bloodpressure;
        const weigh = weight;
        const oxygen = oxygen_saturation;
        const diagnosis = diagnosesList;
        const lab = laboratoryList;
        const surgery = surgicalList;
        const scann = scanList;
        const med =  medicationList;
        const outcomes = outcome;
        const discharged = discharged_date;

        setFirstName("");
        setLastName("");
        setGender("");
        setDob("");
        setCardNumber("");
        setDateOfAdmission("");
        setTemperature("");
        setHeartRate("");
        setBloodPressure("");
        setWeight("");
        setOxygenSaturation("");
        setDiagnosesList({ name: '', isSuspected: false });
        setLaboratoryList([]);
        setSurgicalList([]);
        setScanList([]);
        setMedicationList([]);
        setOutcome("");
        setDisChargedDate("");
        




        await setDoc(doc(db, "hospitals", currentTimestamp), {
             firstname:first_name,
             lastname:last_name,
             gender:mygender,
             dob:mydob,
             card_number:mycard,
             date_of_admission:dateofadmission,

            //  vitals

            temperature:temp,
            heartrate:heart,
            bloodpressure:blood,
            weight:weigh,
            oxygen_saturation:oxygen,

            // diagnosis

            diagnosis:diagnosis,
            lab:lab,
            surgery:surgery,
            scan:scann,
            medications:med,

            // outcome
            outcome:outcomes,
            discharged:discharged,




            refcode:currentTimestamp,
            date:moment(new Date()).format('dddd, MMMM DD, YYYY'),

          });

          console.log("Record Added Successfully");

         
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    console.log("done")

    //   setFirstName("");
    
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

                    </div>




                </div>

                <div className='col-md-9 full bg-light m-0 px-0'>

                    <h5 className='card card-heading py-3 text-center m-0'style={{
                        fontWeight:"700",
                    }}>{moment(new Date()).format('dddd, MMMM DD, YYYY')}</h5>

                    <br/>
                    <br/>


                    <form onSubmit={addToFireStore}>

                    <section className='patientinfo px-3'>
                    <p className='font-weight-bold'style={{
                        color:"#293D34",
                    }}>Patient's Information</p>

                    <div className='py-3 px-2 rounded'style={{
                        background:"white",
                    }}>

                        <div class="row">
                            <div class="col">
                            <label>First Name <span className='text-danger'>*</span> </label>
                            <input onChange={function(e){
                                setFirstName(e.target.value);
                            }} value={firstname} type="text" class="form-control" required/>
                            </div>
                            <div class="col">
                            <label>Last Name  <span className='text-danger'>*</span> </label>
                            <input onChange={function(e){
                                setLastName(e.target.value);
                            }} value={lastname} type="text" class="form-control"  required/>
                            </div>
                            <div class="col">
                                <label>Gender  <span className='text-danger'>*</span> </label>
                                <select onChange={function(e){
                                setGender(e.target.value);
                            }} value={gender} className='form-control'required>
                                    <option value="">Choose Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <br/>

                        <div class="row">
                            <div class="col">
                            <label>Card Number  <span className='text-danger'>*</span> </label>
                            <input onChange={function(e){
                                setCardNumber(e.target.value);
                            }}value={card_number} type="text" class="form-control"/>
                            </div>
                            <div class="col">
                            <label>Date of Birth <span className='text-danger'>*</span></label>
                            <input onChange={function(e){
                                setDob(e.target.value);
                            }} value={dob} type="date" class="form-control" />
                            </div>
                            <div class="col">
                            <label>Date of Admission<span className='text-danger'>*</span></label>
                            <input onChange={function(e){
                                setDateOfAdmission(e.target.value);
                            }} value={date_of_admission} type="date" class="form-control" />
                            </div>
                        </div>
                    
                     </div>
                       

                </section>


                <section className='patientinfo px-3'>
                    <p className='font-weight-bold'style={{
                        color:"#293D34",
                    }}>Vital Signs </p>

                    <div className='py-3 px-2 rounded'style={{
                        background:"white",
                    }}>

                        <div class="row">
                            <div class="col">
                            <label>Temperature <span className='font-weight-bold'style={{
                                fontSize:"12px"
                            }}>(°C)</span></label>
                            <input onChange={function(e){
                                setTemperature(e.target.value);
                            }} value={temperature} type="number" class="form-control" />
                            </div>
                            <div class="col">
                            <label>Heart Rate  <span className='font-weight-bold'style={{
                                fontSize:"12px"
                            }}>(bpm)</span></label>
                            <input onChange={function(e){
                                setHeartRate(e.target.value);
                            }} value={heartrate} type="number" class="form-control"  required/>
                            </div>


                            <div class="col">
                            <label>Blood pressure <span className='font-weight-bold'style={{
                                fontSize:"12px"
                            }}>(mmHg)</span></label>
                            <input onChange={function(e){
                                setBloodPressure(e.target.value);
                            }} value={bloodpressure} type="text" class="form-control"  required/>
                            </div>

                            <div class="col">
                            <label>Weight <span className='font-weight-bold'style={{
                                fontSize:"12px"
                            }}>(kg)</span></label>
                            <input onChange={function(e){
                                setWeight(e.target.value);
                            }} value={weight} type="number" class="form-control"  required/>
                            </div>

                            <div class="col">
                            <label>Oxygen saturation <span className='font-weight-bold'style={{
                                fontSize:"12px"
                            }}>(%)</span></label>
                            <input onChange={function(e){
                                setOxygenSaturation(e.target.value);
                            }}value={oxygen_saturation} type="number" class="form-control"  required/>
                            </div>


                            
                        </div>

                        <br/>

                        
                    
                     </div>
                       

                </section>



                <section className='patientinfo px-3'>
                    <p className='font-weight-bold'style={{
                        color:"#293D34",
                    }}>Diagnosis & Procedures</p>

                    <div className='py-3 px-2 rounded'style={{
                        background:"white",
                    }}>

                        <div class="row">
                            <div class="col">
                                <label>Diagnosis </label>
                                <input onChange={handleDiagnosisChange} value={diagnosisTerm} type="text" class="form-control" />

                                    {diagnosisTerm && filteredDiagnosis.length > 0 && 
                                            <ul className=''style={{
                                                listStyle:"none",
                                            }}>
                                                {filteredDiagnosis.map((item, index) => (
                                                <li onClick={function(e){

                                                    setDiagnosesList({...diagnosesList, name:item});
                                                    setDiagnosisTerm('');
                                                }} className='searchItem py-1 px-2 rounded' key={index}>{item}</li>
                                                ))}
                                            </ul>

                                    }

                    {diagnosesList.name !== '' &&  <div className='row pl-3'> <p className="badge px-2 py-1" style={{
                        background:"#293D34",
                        color:"white",
                     
                        
                    }} >{diagnosesList.name} </p>
                    
                            <input className='mycheck mb-3 mx-3' type='checkbox'onChange={function(e){
                                let SuspectedStatus = diagnosesList.isSuspected;
                                    setDiagnosesList({...diagnosesList, isSuspected:!SuspectedStatus});
                                    console.log("checked");
                                }}  /><span style={{
                                    fontSize:"12px",
                                    fontWeight:"bold",
                                }} className="mt-1">Suspected <img data-toggle="modal" data-target="#exampleModal" style={{
                                    width:"15px",
                                }} src='https://res.cloudinary.com/edifice-solutions/image/upload/v1686664736/Vector_p5jnby.svg' /> </span>
                            
                            <span className='px-5'></span>
                            <a onClick={function(e){
                                    e.preventDefault();
                                    
                                    setDiagnosesList({...diagnosesList, name:"", isSuspected: false});
                                }} href='' className='symptomscancel   text-info px-2 font-weight-bold text-right'> X</a>
                            </div>
                    
                    }


                            </div>
                         


                            

                          

                            <div class="col">
                                    <label>Laboratory Test</label>
                                    <input onChange={handleLaboratoryChange} value={laboratoryTerm} type="text" class="form-control" />

                                    {laboratoryTerm && filteredLaboratory.length > 0 && 
                                        <ul style={{
                                            listStyle:"none",
                                        }} className='mt-3'>
                                            {filteredLaboratory.map((item, index) => (
                                            <li onClick={function(e){

                                                setLaboratoryList([...laboratoryList , item]);
                                                setLaboratoryTerm('');
                                            }} className='searchItem py-1 px-2 rounded' key={index}>{item}</li>
                                            ))}
                                        </ul>

                                    }

                                    {laboratoryList.map((list, index) => (
                                        <p style={{
                                            background:"#293D34",
                                            color:"white",
                                         
                                            
                                        }} className='badge mx-1 my-2'key={index}>{list} <a onClick={function(e){
                                            e.preventDefault();
                                            const updatedLaboratory = [...laboratoryList];
                                            updatedLaboratory.splice(index, 1);
                                            setLaboratoryList(updatedLaboratory);
                                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                                    ))}
                            </div>


                            
                        </div>

                        <br/>

                        <div class="row">
                            <div class="col">
                            <label>Surgical Intervention </label>
                            <input onChange={handleSurgicalChange} value={surgicalTerm} type="text" class="form-control" />

                            {surgicalTerm && filteredSurgical.length > 0 && 
                                        <ul style={{
                                            listStyle:"none",
                                        }} className='mt-3'>
                                            {filteredSurgical.map((item, index) => (
                                            <li onClick={function(e){

                                                setSurgicalList([...surgicalList , item]);
                                                setSurgicalTerm('');
                                            }} className='searchItem py-1 px-2 rounded' key={index}>{item}</li>
                                            ))}
                                        </ul>

                            }


                                    {surgicalList.map((list, index) => (
                                        <p style={{
                                            background:"#293D34",
                                            color:"white",
                                         
                                            
                                        }} className='badge mx-1 my-2'key={index}>{list} <a onClick={function(e){
                                            e.preventDefault();
                                            const updatedSurgical = [...surgicalList];
                                            updatedSurgical.splice(index, 1);
                                            setSurgicalList(updatedSurgical);
                                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                                    ))}
                            </div>
                         


                            

                          

                            <div class="col">
                                <label>Xray & Ultrasound</label>
                                <input onChange={handleScanChange} value={scanTerm} type="text" class="form-control"  />

                                {scanTerm && filteredScan.length > 0 && 
                                        <ul style={{
                                            listStyle:"none",
                                        }} className='mt-3'>
                                            {filteredScan.map((item, index) => (
                                            <li onClick={function(e){

                                                setScanList([...scanList , item]);
                                                setScanTerm('');
                                            }} className='searchItem py-1 px-2 rounded' key={index}>{item}</li>
                                            ))}
                                        </ul>

                                }

                                {scanList.map((list, index) => (
                                        <p style={{
                                            background:"#293D34",
                                            color:"white",
                                         
                                            
                                        }} className='badge mx-1 my-2'key={index}>{list} <a onClick={function(e){
                                            e.preventDefault();
                                            const updatedScan = [...scanList];
                                            updatedScan.splice(index, 1);
                                            setScanList(updatedScan);
                                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                                ))}


                            </div>


                            
                        </div>

                        <br/>

                        
                    
                     </div>
                       

                </section>

                <section className='patientinfo px-3'>
                    <p className='font-weight-bold'style={{
                        color:"#293D34",
                    }}>Medications & Outcome </p>

                    <div className='py-3 px-2 rounded'style={{
                        background:"white",
                    }}>

                        <div class="row">
                            <div class="col">
                            <label>Medications Given </label>
                            <input onChange={handleMedicationChange} value={medicationTerm} type="text" class="form-control" />

                            {medicationTerm && filteredMedication.length > 0 && 
                                        <ul style={{
                                            listStyle:"none",
                                        }} className='mt-3'>
                                            {filteredMedication.map((item, index) => (
                                            <li onClick={function(e){

                                                setMedicationList([...medicationList , item]);
                                                setMedicationTerm('');
                                            }} className='searchItem py-1 px-2 rounded' key={index}>{item}</li>
                                            ))}
                                        </ul>

                            }


                                {medicationList.map((list, index) => (
                                        <p style={{
                                            background:"#293D34",
                                            color:"white",
                                         
                                            
                                        }} className='badge mx-1 my-2'key={index}>{list} <a onClick={function(e){
                                            e.preventDefault();
                                            const updatedMedication = [...medicationList];
                                            updatedMedication.splice(index, 1);
                                            setScanList(updatedMedication);
                                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                                ))}



                            </div>



                            <div class="col">
                            <label>Outcome  </label>
                             <select onChange={function(e){
                                 setOutcome(e.target.value)
                             }} value={outcome} className="form-control">
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

                        <br/>

                        
                    
                     </div>
                       

                </section>

                <section className='patientinfo px-3'>
                    <p className='font-weight-bold'style={{
                        color:"#293D34",
                    }}>Discharged Information </p>

                    <div className='py-3 px-2 rounded'style={{
                        background:"white",
                    }}>

                        <div class="row">
                            <div class="col-6">
                            <label>Discharged Date </label>
                            <input onChange={function(e){
                                setDisChargedDate(e.target.value)
                            }} value={discharged_date} type="date" class="form-control" />
                            </div>
                            


                            

                            

                            


                            
                        </div>

                        <br/>

                        
                    
                     </div>
                       

                </section>

                {
                    firstname && lastname && gender && dob && card_number && date_of_admission && <section className='buttonsection col-md-6 m-auto'>
                    <button className='btn py-3 rounded w-100'style={{
                        background:"#293D34",
                        color:"white",
                        fontSize:"18px",
                        fontWeight:"bold",
                    }}>Save and Submit</button>
                </section>
                }

                </form>
                    
                </div>


               




            </div>
            

        </>
    );


}

export default Dashboard;