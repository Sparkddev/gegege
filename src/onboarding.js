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



function Onboarding(){


    const location  = useLocation();
    const navigate = useNavigate();


    


    //   application data

    const[firstname, setFirstName] = useState("");
    const[lastname, setLastName] = useState("");
    const[middlename, setMiddleName] = useState("");
    const[maiden_name, setMaidenName] = useState("");
    const[dob, setDob] = useState("");
    const[ssn, setSSN] = useState("");
    const[address, setAddress] = useState("");


    const[upload, setUpload] = useState(null);
    const[uploadUrl, setUploadUrl] = useState("");
    const[isLoading , setLoading] = useState(false);

      const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');

      const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxFileSize = 512 * 1024; // 512KB

      const [error, setError] = useState('');
    


      const handleFileChange = (event) => {
        // Set the selected file to the state

        const selectedFile = event.target.files[0];

    // Validate file type
    if (selectedFile && !allowedFileTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Only .pdf, .doc, or .docx files are accepted.');
      return;
    }

    // Validate file size
    if (selectedFile && selectedFile.size > maxFileSize) {
      setError('File size exceeds the maximum allowed (512KB).');
      return;
    }

    // Reset error if file is valid
    setError('');
        setUpload(event.target.files[0]);
      };


    async function addToFireStore(e){
        e.preventDefault();
    
        try {
    
            setLoading(true);
    
           
    
            
            const storageRef = ref(storage, `resumes/${upload.name}`);
            await uploadBytes(storageRef, upload);
        
            // Get download URL for the uploaded file
            const downloadURL = await getDownloadURL(storageRef);
        
            console.log("Resume uploaded successfully to Firebase Storage");
            setUploadUrl(downloadURL) ;
    
    
    
            await setDoc(doc(db, "Applications", currentTimestamp), {
            //     job:title,
            //    firstname:firstname,
            //    lastname:lastname,
            //    email:email,
            //    phone:phone,
            //    resume:downloadURL,

    
              });
    
              console.log("Record Added Successfully");
    
              setLoading(false);
           
    
             setFirstName("");
             setLastName("");
             
             setUploadUrl("");
             setUpload(null);

    
              navigate('/');
    
             
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
            
            
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    
       
    
        //   setFirstName("");
        
    }
    

    return(
        <>
             <nav className="navbar containerr navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#"><img className='mylogo' src={logo}/></a>
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
                    <h2 className='titleheadtwo text-center'>Final Stage Onboarding Information Form</h2>

                 
                    <form>
                        <div className='form-group row'>
                            <div className='col-md-4'>
                                <label>First Name</label>
                                <input onChange={function(e){
                                    setFirstName(e.target.value)
                                }} value={firstname} className='form-control'required />
                            </div>

                            <div className='col-md-4'>
                                <label>Middle Name</label>
                                <input onChange={function(e){
                                    setMiddleName(e.target.value)
                                }} value={middlename} className='form-control'required />
                            </div>

                            <div className='col-md-4'>
                                <label>Last Name</label>
                                <input onChange={function(e){
                                    setLastName(e.target.value)
                                }} value={lastname} className='form-control'required />
                            </div>

                        </div>


                        <div className='form-group row'>
                            <div className='col-md-4'>
                                <label>Mother's Maiden Name</label>
                                <input onChange={function(e){
                                    setMaidenName(e.target.value)
                                }} value={maiden_name} className='form-control'required />
                            </div>

                            <div className='col-md-4'>
                                <label>Date of Birth</label>
                                <input onChange={function(e){
                                    setDob(e.target.value)
                                }} value={dob} type="date" className='form-control'required />
                            </div>

                            <div className='col-md-4'>
                            <label>SSN</label>
                                
                                <input onChange={function(e){
                                    setSSN(e.target.value)
                                }} value={setSSN} className='form-control'required />
                            </div>

                        </div>

                        <div className='form-group row'>
                        <label>Full Contact Address</label>
                            <textarea onChange={function(e){
                                    setAddress(e.target.value)
                                }} value={address} className='form-control'></textarea>
                        </div>



                        <div className='form-group row'>
                            <div className='col-md-4'>
                                <label>Driver's License (Front)</label>
                                <input type="file" required />
                            </div>

                            <div className='col-md-4'>
                            <label>Driver's License (Back)</label>
                                <input type="file" required />
                            </div>

                            <div className='col-md-4'>
                            <label>Photo of you holding Driver's License</label>
                                <input type="file" required />
                            
                            </div>

                        </div>


                    <hr />

                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label>Normal Photograph</label> <br/>
                                <input type="file" required />
                            </div>

                            <div className='col-md-6'>
                            <label>Previous W2 Form</label><br></br>
                                <input type="file" required />
                            </div>

                            

                        </div>


                        <br/>
                        <br/>


                        <div className='form-group mt-3 text-center'>
                            <button className='btn apply'>Complete Onboarding</button>

                        </div>

                        
                    </form>
                    

                 
             


               



                








               
               
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

export default Onboarding;