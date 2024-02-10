import React, { useState, useEffect } from 'react';
import './home.css';

import moment from 'moment';
import { useNavigate,Link } from 'react-router-dom';


import logo from './logo.svg';
import social from './social.png';
import footer from './footer.svg';


import {db, auth, storage} from './firebase';

import axios from 'axios'




import { collection, getDocs, where, query, doc, setDoc,deleteDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function Home(){

    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        const jobsCollection = collection(db, 'jobs');
        const q = query(jobsCollection);
  
        try {
          const querySnapshot = await getDocs(q);
          const jobsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setJobs(jobsData);
        } catch (error) {
          console.error('Error fetching jobs: ', error);
        }
      };

    useEffect(() => {
        
    
        fetchJobs();
      }, []); 


      const navigate = useNavigate();

      const[title, setTitle] = useState("");
      const[firstname, setFirstName] = useState("");
    const[lastname, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const[upload, setUpload] = useState(null);
    const[uploadUrl, setUploadUrl] = useState("");
    const[isLoading , setLoading] = useState(false);
    const[checked, setChecked] = useState(false);

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
    


    return (
        <>
            <nav className="navbar containerr navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/"><img className='mylogo' src={logo}/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                   
                    <a className="nav-link mx-3" href="/">Home</a>
                    <a className="nav-link mx-3" href="/#about">About Us</a>
                    <a className="nav-link mx-3" href="#open">Job Openings</a>
                    <a className="nav-link mx-3"href="#match">Get Matched</a>
                    
                    </div>
                </div>
                </nav>



                {/* hero section */}

                <section className='hero'>
                    <div>
                    <h2 className='herohead'>Looking for a <br/> new job?</h2> 

                    <hr className='text-right hrr' />
                    <br/>


                    <h3 className='heroheadtwo mt-3'>Vaco is with you all the way</h3>


                    <div className='buttondiv'>

                        <a href="#open"  className='btn search'>Search</a>

                        <a  href="#alert" className='btn send'>Send Resume</a>

                    </div>

                    </div>
                 

                </section>


                {/* end of hero section */}

                {/* about section */}


                <section id="about" className='about containerr'>
                    <h2 className='abouthead text-center'>We'll bring you a range of relevant, exciting opportunities so  <br/> you can find your next dream job.</h2>

                    <hr className='text-center hrtwo' />


                    <div className='aboutdiv'>
                        <p className='aboutpara text-justify'>At Vaco, we provide expert consulting, direct hire, interim executive search, and strategic staffing for companies around the world. As a result, we have thousands of job openings in accounting, finance, technology, healthcare, operations, administration and more. Our job opportunities span remote, hybrid and in-office positions so you can find the role that suits you best.

</p>

                    </div>
                </section>


                {/* end of about section */}


                {/* opening section */}

                <section id="open" className='opening containerr'>
                <h2 className='abouthead text-center'>Job Openings</h2>

                <hr className='text-center hrtwo' />

                    <form className='px-5'>

                        <div className='row py-4 px-4'>
                                <div className='col-md-6'>
                                    
                                    <label>Job Title</label>
                                    <input type="text"className='form-control'placeholder='Job Title or Keywords' />


                                </div>

                                <div className='col-md-6'>
                                
                                <label>Category</label>
                                    <select className='form-control'>
                                        <option value="">Select Category</option>
                                        <option value="Business Services">Business Services</option>

                                    </select>

                                </div>
                        </div>



                        <div className='row py-4 px-4'>
                                <div className='col-md-6'>
                                    
                                    <label>Select Location Type</label>
                                    <select className='form-control'>
                                        <option value="">Location Type</option>
                                        <option value="Remote">Remote</option>

                                    </select>

                                </div>

                                <div className='col-md-6'>
                                
                                <label>Employment Type</label>
                                    <select className='form-control'>
                                        <option value="">Select Employment Type</option>
                                        <option value="Contract">Contract</option>

                                    </select>

                                </div>
                        </div>

                        <br/>

                        <div className='text-center'>

                     

                        <button className='btn send'>Search</button>

                    </div>

                    </form>



                   

                </section>



                {/* end of opening section */}

                 {/* job search */}

                 <section className='jobsearch containerr'>

                     <table className='table table-borderless table-striped'>
                         <thead className='thead'>
                             <tr>
                                 <th colSpan={2}>JOB TITLE</th>
                                 <th>CATEGORY</th>
                                 <th>LOCATION</th>
                             </tr>
                         </thead>


                         <tbody className='tbody'>
                           

                           


                             {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td colSpan={2}>
                                        <Link style={{
                                            color:"black",
                                            fontWeight:"bold",
                                        }} onClick={function(e){
                                            e.preventDefault();

                                              
                                            navigate('/details',
                                            {state:
                                                {
                                                    title:job.title,
                                                    category:job.category,
                                                    employment:job.employment,
                                                    locationtype:job.locationtype,
                                                    city:job.city,
                                                    zipcode:job.zipcode,
                                                    salary:job.salary,
                                                    jobdescription:job.jobdescription
                                                }
                                            }
                                            );
                                        }}>{job.title}</Link>
                                    </td>
                                <td>{job.category}</td>
                                <td><i className='fa fa-map-marker icons'></i><span className='ml-3'>{job.city}</span></td>
                                {/* Add more table cells based on your job structure */}
                                </tr>
                            ))}



                         </tbody>

                     </table>

                 </section>


                 {/* end of job search */}



                 {/* save section */}

                 <section id="match" className='save'>
                     <div className='savediv col-md-10 m-auto'>
                            <h2 className='savehead text-center'>Save time. We'll match you.</h2>
                            <hr className='text-center hrtwo' />


                            <div className='savedbtn text-center'>

                            <button className='btn search'>Get Matched to Jobs</button>

                           

                            </div>

                     </div>

                 </section>


                 {/* end of save section */}

                 {/* alert section */}


                 <section id="alert" className='alertt containerr'>
                 <div>
                    <h2 className='alerthead'>Know the instant your <br/> dream job is posted.</h2> 

                    <hr className='text-right alerthrr' />
                    <br/>


                    <h3 className='alertheadtwo mt-3'>Let us know your preferences so we can <br/> send relevant openings your way.</h3>


                    <div className='text-left mt-5'>

             

                        <button className='btn send'type="button" data-toggle="modal" data-target="#exampleModalLong">Create Alert</button>

                    </div>

                    </div>
                 

                 </section>

                 {/* end of alert section */}


                 {/* section  footer */}
                 <hr className='footerhr' />

                 <section className='footer containerr'>

                     <img className='mylogo' src={footer} />

                     <div>
                         <p className='small'>©2024 Vaco | All Rights Reserved</p>
                         <p className='small'>Vaco Global Headquarters: 5501 Virginia Way #120, Brentwood, TN 37027</p>
                         <p className='small'><a>Privacy policy</a> | <a>Fraud Policy</a> | <a>EEO Notice</a></p>
                     </div>


                    <img className='social'src={social} />
                 </section>


                 {/* end footer */}



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

export default Home;