import React, { useState, useEffect } from 'react';
import './dashboard.css';

import moment from 'moment';
import { useNavigate,Link } from 'react-router-dom';


import logo from '../logo.svg';



import {db, auth} from '../firebase';

import axios from 'axios'

import { collection, getDocs, where, query, doc, setDoc,deleteDoc } from "firebase/firestore";



function Job(){


    const navigate = useNavigate();


    React.useEffect(()=>{
        var docId = localStorage.getItem("authid");

        if(docId == null){
            navigate('/');
        }
        
     

     
    },[]);

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


      const[title, setTitle] = useState("");
      const[category, setCategory] = useState("");
      const[employment, setEmployment] = useState("");
      const[location, setLocation] = useState("");
      const[city, setCity] = useState("");
      const[zipcode, setZipCode] = useState("");
      const[salary, setSalary] = useState("");
      const[description, setDescription] = useState("");

      const[isLoading , setLoading] = useState(false);

      const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');




async function addToFireStore(e){
    e.preventDefault();

    try {

        setLoading(true);

       

        




        await setDoc(doc(db, "jobs", currentTimestamp), {
           title:title,
           category:category,
           employment:employment,
           locationtype:location,
           city:city,
           zipcode:zipcode,
           salary:salary,
           jobdescription:description

          });

          console.log("Record Added Successfully");

          setLoading(false);
          fetchJobs();

          setTitle("");
          setCategory("");
          setEmployment("");
          setLocation("");
          setCity("");
          setZipCode("");
          setSalary("");
          setDescription("");
        


         
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }

   

    //   setFirstName("");
    
}



async function deleteFromFirestore(e , documentId) {
    e.preventDefault();
    try {
      // Set loading state to true if needed
      setLoading(true);
  
      // Get a reference to the document you want to delete
      const documentRef = doc(db, "jobs", documentId);
  
      // Delete the document
      await deleteDoc(documentRef);
  
      // Log success message to the console
      console.log("Record Deleted Successfully");
  
      // Set loading state to false if needed
      setLoading(false);
  
      // Fetch and update the list of jobs if needed
      fetchJobs();
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }


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
                        }} to='/super/job'>
                        <p className='font-weight-bold py-1 mx-2 my-3  activelink rounded'>Jobs</p>
                        </Link>


                        <Link style={{
                            textDecoration:"none",
                        }} to='/applications'>
                        <p className='font-weight-bold py-1 mx-2 my-3 hoverme rounded'>Applications</p>
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
                 


                    <div className='text-right py-3'>
                        <button className='btn jobbutton'type="button" data-toggle="modal" data-target="#exampleModal">Create New Job</button>
                    </div>




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
                                    <th >Title</th>
                                    <th>Category</th>
                                    <th>Employment Type</th>
                                    <th>Location Type</th>
                                    <th>City</th>
                                    <th>Zip</th>
                                    <th>Salary</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>


                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.title}</td>
                                <td>{job.category}</td>
                                <td>{job.employment}</td>
                                <td>{job.locationtype}</td>
                                <td><i className='fa fa-map-marker icons'></i><span className='ml-3'>{job.city}</span></td>
                                <td>{job.zipcode}</td>
                                <td>{job.salary}</td>
                                <td>
                                   <a onClick={(e) => deleteFromFirestore(e, job.id)} style={{
                                       textDecoration:"none",
                                   }} className='btn-danger text-light btn-sm'>Delete</a>
                                </td>
                               
                                {/* Add more table cells based on your job structure */}
                                </tr>
                            ))}
                                
                            </tbody>
                        </table>

                    </div>

                   
                    
                </div>



                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create New Job</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

          <form onSubmit={addToFireStore}>
              <div className='form-group row'>
                  <div className='col-md-6'>
                      <label>Title</label>
                      <input onChange={function(e){
                          setTitle(e.target.value);
                      }} value={title} className='form-control'placeholder='Job Title'required />
                  </div>

                  <div className='col-md-6'>
                      <label>Category</label>
                      <select  onChange={function(e){
                          setCategory(e.target.value);
                      }} value={category} className='form-control'required>
                          <option value="">Select Category</option>
                          <option value="Agriculture" >
                Agriculture
            </option>
                    <option
                   
                    value="Alternative Assets"
                                                            >
                Alternative Assets
            </option>
                    <option
                  
                    value="Business Services"
                                                            >
                Business Services
            </option>
                    <option
                   
                    value="Construction"
                                                            >
                Construction
            </option>
                    <option
                   
                    value="Consumer Services"
                                                            >
                Consumer Services
            </option>
                    <option
                  
                    value="CPA Firm - Big 4"
                                                            >
                CPA Firm - Big 4
            </option>
                    <option
                 
                    value="Education"
                                                            >
                Education
            </option>
                    <option
                   
                    Value="Energy - Utilities &amp; Waste"
                                                            >
                Energy - Utilities &amp; Waste
            </option>
                    <option
                   
                 value="Finance"
                                                            >
                Finance
            </option>
                    <option
                
                    value="Fund Administration"
                                                            >
                Fund Administration
            </option>
                    <option
                   
                    value="Fund of Funds"
                                                            >
                Fund of Funds
            </option>
                    <option
                    
                    value="Government"
                                                            >
                Government
            </option>
                    <option
                   
                    value="Healthcare Services"
                                                            >
                Healthcare Services
            </option>
                    <option
            
                    value="Hedge Funds"
                                                            >
                Hedge Funds
            </option>
                    <option
                    
                    value="Holding Companies &amp; Conglomerates"
                                                            >
                Holding Companies &amp; Conglomerates
            </option>
                    <option
                   
                    value="Hospitality"
                                                            >
                Hospitality
            </option>
                    <option
                
                    value="Hospitals &amp; Physicians Clinics"
                                                            >
                Hospitals &amp; Physicians Clinics
            </option>
                    <option
                    
                    value="Insurance"
                                                            >
                Insurance
            </option>
                    <option
                  
                    value="Law Firms &amp; Legal Services"
                                                            >
                Law Firms &amp; Legal Services
            </option>
                    <option
                   
                    value="Manufacturing"
                                                            >
                Manufacturing
            </option>
                    <option
                    
                    value="Media &amp; Internet"
                                                            >
                Media &amp; Internet
            </option>
                    <option
                   
                    value="Minerals &amp; Mining"
                                                            >
                Minerals &amp; Mining
            </option>
                    <option
                    
                    value="Organizations"
                                                            >
                Organizations
            </option>
                    <option
                   
                    value="Public Audit"
                                                            >
                Public Audit
            </option>
                    <option
                   
                    value="Real Estate"
                                                            >
                Real Estate
            </option>
                    <option
                   
                    value="Retail"
                                                            >
                Retail
            </option>
                    <option
                   
                    value="Software"
                                                            >
                Software
            </option>
                    <option
                   
                    value="Telecommunications"
                                                            >
                Telecommunications
            </option>
                    <option
                   
                    value="Transportation"
                                                            >
                Transportation
            </option>

                      </select>
                  </div>
              </div>


              <div className='form-group row'>
                  <div className='col-md-6'>
                      <label>Employment Type</label>
                      <select  onChange={function(e){
                          setEmployment(e.target.value);
                      }} value={employment}  className='form-control'required>
                          <option value="">Select Employment Type</option>
                          <option value="Contract-To-Hire">Contract-To-Hire</option>
                          <option value="Contract">Contract</option>
                          <option value="Direct-Hire">Direct-Hire</option>
                      </select>
                  </div>


                  <div className='col-md-6'>
                      <label>Location Type</label>
                      <select onChange={function(e){
                          setLocation(e.target.value);
                      }} value={location} className='form-control'required>
                          <option value="">Select Location Type</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="On-Site">On-Site</option>
                          <option value="Remote">Remote</option>
                      </select>
                  </div>

              </div>




              <div className='form-group row'>
                  <div className='col-md-4'>
                      <label>City</label>
                     <input  onChange={function(e){
                          setCity(e.target.value);
                      }} value={city} className='form-control'placeholder='City' required/>
                  </div>


                  <div className='col-md-4'>
                      <label>Zip Code</label>
                      <input  onChange={function(e){
                          setZipCode(e.target.value);
                      }} value={zipcode}  className='form-control'placeholder='Zip/Postal Code'required />
                  </div>


                  <div className='col-md-4'>
                      <label>Salary</label>
                      <input  onChange={function(e){
                          setSalary(e.target.value);
                      }} value={salary} className='form-control'placeholder='Salary in USD'required />
                  </div>

              </div>

              <div className='form-group'>
                  <label>Job Description</label>
                  <textarea  onChange={function(e){
                          setDescription(e.target.value);
                      }} value={description} className='form-control'row="10"required></textarea>

              </div>

              <div className='form-group mt-4 text-center'>
                  <button className='btn jobbutton'type="submit">{isLoading ? 'Loading.....' : 'Create New Job'}</button>
              </div>
          </form>

        
      </div>
      
    </div>
  </div>
</div>


               




            </div>
        
        </>
    );
}

export default Job;