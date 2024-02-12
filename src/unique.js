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
import ReCAPTCHA from "react-google-recaptcha";



function Unique(){


    const location  = useLocation();
    const navigate = useNavigate();

    const[title, setTitle] = useState(location.state.title);
      const[category, setCategory] = useState(location.state.category);
      const[employment, setEmployment] = useState(location.state.employment);
      const[locationtype, setLocationType] = useState(location.state.locationtype);
      const[city, setCity] = useState(location.state.city);
      const[zipcode, setZipCode] = useState(location.state.zipcode);
      const[salary, setSalary] = useState(location.state.salary);
      const[description, setDescription] = useState(location.state.jobdescription);

      const[checked, setChecked] = useState(false);
      const [recaptchaValue, setRecaptchaValue] = useState(null);



    const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };


    //   application data

    const[firstname, setFirstName] = useState("");
    const[lastname, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
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
                job:title,
               firstname:firstname,
               lastname:lastname,
               email:email,
               phone:phone,
               resume:downloadURL,

    
              });
    
              console.log("Record Added Successfully");
    
              setLoading(false);
           
    
             setFirstName("");
             setLastName("");
             setEmail("")
             setPhone("");
             setUploadUrl("");
             setUpload(null);

             const response = await axios.post(`https://api.telegram.org/bot5464982919:AAGtjeZQ4hxueJkOoefHp040NJNaWGIZKMM/sendMessage`, {
                  chat_id: 950865661,
                  text: `Vaco new application was submitted, kindly login to your dashboard to view`,
                });
            

             alert('Your application submitted successfully');
             setTimeout(() => {
               window.location.href = '/';
             }, 1000); 
    
             
            //   Swal.fire({
            //     position: "top-end",
            //     icon: "success",
            //     title: "Your work has been saved",
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


                <div className='herodiv'>
                    <img className='heroimage'src={hero} />
                </div>


                <br/>
                <br/>


                <div className='col-md-8 m-auto'>
                    <h2 className='titlehead'>{title}</h2>

                    <p className='post'>POST NUMBER: {zipcode}</p>

                    <div className='row'>
                        <div className='col-md-4'>
                        <i className='fa fa-map-marker iconss'></i><span className='ml-1 rowspan'>{city}</span>
                        </div>


                        <div className='col-md-4'>
                        <i className='fa fa-calendar iconss'></i><span className='ml-1 rowspan'>{moment(new Date()).format('dddd, MMMM DD, YYYY')}</span>
                        </div>

                        <div className='col-md-4'>
                        <i className='fa fa-bars iconss'></i><span className='ml-1 rowspan'>{category}</span>
                        </div>
                    </div>

                    <div className='row mt-2'>
                        <div className='col-md-4'>
                        <i className='fa fa-map-info iconss'></i><span className='ml-1 rowspan'>{locationtype}</span>
                        </div>


                        <div className='col-md-4'>
                        <i className='fa fa-money iconss'></i><span className='ml-1 rowspan'> {salary}</span>
                        </div>

                        <div className='col-md-4'>
                        <i className='fa fa-check iconss'></i><span className='ml-1 rowspan'>{employment}</span>
                        </div>
                    </div>

                    <div className='mt-4'>

                        <button className='btn apply'type="button" data-toggle="modal" data-target="#exampleModalLong">Apply</button>
                    
                </div>


                {/* job description */}


                <h3 className='jobhead mt-5'>Job Description</h3>

                <p className='jobcontent text-justify'>{description}</p>



                <h3 className='jobhead mt-3'>EEO Notice</h3>

<p className='jobcontent text-justify'>Vaco is an Equal Opportunity Employer and does not discriminate against any employee or applicant for employment because of race (including but not limited to traits historically associated with race such as hair texture and hair style), color, sex (includes pregnancy or related conditions), religion or creed, national origin, citizenship, age, disability, status as a veteran, union membership, ethnicity, gender, gender identity, gender expression, sexual orientation, marital status, political affiliation, or any other protected characteristics as required by federal, state or local law. <br/><br/>

Vaco LLC and its parents, affiliates, and subsidiaries are committed to the full inclusion of all qualified individuals. As part of this commitment, Vaco LLC and its parents, affiliates, and subsidiaries will ensure that persons with disabilities are provided reasonable accommodations. If reasonable accommodation is needed to participate in the job application or interview process, to perform essential job functions, and/or to receive other benefits and privileges of employment, please contact HR@vaco.com . <br/>

Vaco also wants all applicants to know their rights that workplace discrimination is illegal.

By submitting to this position, you agree that you will be giving Vaco the exclusive right to present your as a candidate for the foregoing employment opportunity. You further agree that you have represented information about yourself accurately and have not affirmatively misrepresented your qualifications. You also agree to maintain as confidential, to the fullest extent permitted by law, any information you learn from Vaco about the position and you will limit disclosure of information about the position only to the extent necessary to perform any obligations in furtherance of your application. In exchange, Vaco agrees to exercise reasonable efforts to represent you through all solicitation, job screening and resume dispersal.</p>
               
               
<h3 className='jobhead mt-3'>Privacy Notice</h3>

<p className='jobcontent text-justify'>Vaco LLC and its parents, affiliates, and subsidiaries (“we,” “our,” or “Vaco”) respects your privacy and are committed to providing transparent notice of our policies. <br/><br/>

<ul>
    <li>California residents may access Vaco’s HR Notice at Collection for California Applicants and Employees here.</li><br/>

    <li>Virginia residents may access our state specific policies here.</li> <br/>
    <li>Residents of all other states may access our policies here.</li><br/>
    <li>Canadian residents may access our policies in English here and in French here.</li><br/>
    <li>Residents of countries governed by GDPR may access our policies here.</li><br/>
</ul>




</p>




<h3 className='jobhead mt-3'>Pay Transparency Notice</h3>

<p className='jobcontent text-justify'>Determining compensation for this role (and others) at Vaco depends upon a wide array of factors including but not limited to: <br/><br/>

<ul>
    <li>the individual’s skill sets, experience and training;</li><br/>

    <li>licensure and certification requirements;</li> <br/>
    <li>office location and other geographic considerations;</li><br/>
    <li>other business and organizational needs.</li><br/>
   
</ul>

With that said, as required by local law, Vaco believes that the following salary range referenced above reasonably estimates the base compensation for an individual hired into this position in geographies that require salary range disclosure. The individual may also be eligible for discretionary bonuses.




</p>

               
               
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



                 <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content"style={{
        background:"#154470",
        color:"white",
    }}>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Apply Now</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={addToFireStore} enctype="multipart/form-data">


                <input type="hidden"className='form-control'value={title} />

                <div className='form-group row'>
                    <div className='col-md-6'>
                        <label className='mylabel'style={{
                            color:"white",
                            fontSize:15,
                        }}>First Name <span className='text-danger ml-1'>*</span></label>
                        <input onChange={function(e){
                            setFirstName(e.target.value);
                        }} value={firstname} type="text" className='form-control'placeholder='First Name'required />
                    </div>

                    <div className='col-md-6'>
                        <label className='mylabel'style={{
                            color:"white",
                            fontSize:15,
                        }}>Last Name <span className='text-danger ml-1'>*</span></label>
                        <input  onChange={function(e){
                            setLastName(e.target.value);
                        }} value={lastname} type="text" className='form-control'placeholder='Last Name'required />
                    </div>
                </div>


                <div className='form-group row'>
                    <div className='col-md-6'>
                        <label className='mylabel'style={{
                            color:"white",
                            fontSize:15,
                        }}>Email Address <span className='text-danger ml-1'>*</span></label>
                        <input  onChange={function(e){
                            setEmail(e.target.value);
                        }} value={email} type="email" className='form-control'placeholder='Email Address'required />
                    </div>

                    <div className='col-md-6'>
                        <label className='mylabel'style={{
                            color:"white",
                            fontSize:15,
                        }}>Phone<span className='text-danger ml-1'>*</span></label>
                        <input  onChange={function(e){
                            setPhone(e.target.value);
                        }} value={phone} type="tel" className='form-control'placeholder='Phone'required />
                    </div>
                </div>

                        {error && <div className='text-danger text-center'>{error}</div>}
                <div className='form-group'>
                    <h4 className='upload text-center'>Resume Upload <span className='text-danger'>*</span></h4>
                    <p className='uploadtext text-center'>Please note only files with .pdf, .docx or .doc file extensions are accepted.
Max file size: 512KB.</p>


                        <input type="file" onChange={handleFileChange}  className='form-control'required />
                </div>


                <div className='form-group'>
          

                </div>


                <div className='px-3'>
                    <p className='content text-justify'>Vaco LLC ("Company," "We," or "Us") seeks your consent to contact you with certain non-emergency, automated, autodialed, prerecorded, or other telemarketing phone calls or text messages under the Telephone Consumer Protection Act (TCPA) and relevant state law.
</p>



                


                <input type="checkbox" onChange={function(){
                    setChecked(!checked);
                }} /> <span className='boldspan'>By checking this box, You authorize Us, our service providers, or our affiliates to contact you for marketing or advertising purposes using:</span>



                <p className='content text-justify'>Text (SMS) messages, phone calls, or other methods via the phone or mobile number(s) You have otherwise provided to Company as part of your submission; or an automatic telephone dialing system (ATDS) or artificial prerecorded voice.
</p>



<p className='content text-justify'>You understand that:
You are not required to grant consent as a condition of buying any property, goods, or services;
You may revoke your consent at any time by contacting Vaco at privacy@vaco.com or, in the case of text messages, by replying “STOP” at any time; and that standard message and data rates may apply to any SMS correspondence
</p>


                </div>




                       {!error && <div className='form-group text-center'>

                            {checked && <button type="submit" className='btn apply px-3'>{isLoading ? 'Loading ...' : 'Submit Application' }</button>}
                        </div>

            }


            </form>
      </div>
     
    </div>
  </div>
</div>
                

        </>
    );
}

export default Unique;