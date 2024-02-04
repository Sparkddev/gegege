import React, { useState, useEffect } from 'react';
import './home.css';

import moment from 'moment';
import { useNavigate,Link } from 'react-router-dom';


import logo from './logo.svg';
import social from './social.png';
import footer from './footer.svg';


import {db, auth} from './firebase';

import axios from 'axios'

import { collection, getDocs, where, query } from "firebase/firestore";


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

    return (
        <>
            <nav className="navbar containerr navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#"><img className='mylogo' src={logo}/></a>
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

                        <button className='btn search'>Search</button>

                        <button className='btn send'>Send Resume</button>

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


                 <section className='alertt containerr'>
                 <div>
                    <h2 className='alerthead'>Know the instant your <br/> dream job is posted.</h2> 

                    <hr className='text-right alerthrr' />
                    <br/>


                    <h3 className='alertheadtwo mt-3'>Let us know your preferences so we can <br/> send relevant openings your way.</h3>


                    <div className='text-left mt-5'>

             

                        <button className='btn send'>Create Alert</button>

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
        </>
    );

}

export default Home;