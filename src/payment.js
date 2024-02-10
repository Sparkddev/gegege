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



function Payment(){


    const location  = useLocation();
    const navigate = useNavigate();



    const[bank, setBank] = useState([
        {
            "name":"Chase Bank",
            "logo":"https://www.logo.wine/a/logo/Chase_Bank/Chase_Bank-Logo.wine.svg"
        },

        {
            "name":"Wells Fargo",
            "logo":"https://www.logo.wine/a/logo/Wells_Fargo/Wells_Fargo-Logo.wine.svg"
        },

        {
            "name":"Huntington",
            "logo":"https://www.logo.wine/a/logo/Huntington_Bancshares/Huntington_Bancshares-Logo.wine.svg"
        },

        {
            "name":"Bank of America",
            "logo":"https://assets-global.website-files.com/6047a9e35e5dc54ac86ddd90/6387b147438cb34d22fa44d9_qc1XpDueceSGtOHGc98caLg5VLqFAWnI8ckQDC9i21c.png"
        },

        {
            "name":"Commerce Bank",
            "logo":"https://www.pngkit.com/png/full/873-8730548_commerce-bank-logo-png-transparent-apple-authorised-reseller.png"
        },

        {
            "name":"Capitol Federal Per...",
            "logo":"https://companieslogo.com/img/orig/CFFN-1da2cf19.png?t=1674026680"
        },

        {
            "name":"US Bank",
            "logo":"https://images02.military.com/sites/default/files/2023-05/us-bank-vtp-logo.png"
        },


        {
            "name":"Community America",
            "logo":"https://www.guildcontent.com/wp-content/uploads/2021/04/CommunityAmerica-Credit-Union-Logo.png"
        },

        {
            "name":"USAA",
            "logo":"https://1000logos.net/wp-content/uploads/2018/01/USAA-Logo.png"
        },

        {
            "name":"CapitalOne",
            "logo":"https://logos-world.net/wp-content/uploads/2021/04/Capital-One-Symbol.png"
        },


        {
            "name":"Meritrust Credit Union",
            "logo":"https://www.wichitaopen.com/wp-content/uploads/2023/12/MER_2022-LOGO-FORM_RED.png"
        },

        {
            "name":"Citi Bank",
            "logo":"https://logos-world.net/wp-content/uploads/2022/03/Citibank-Logo.png"
        },


        {
            "name":"Regions",
            "logo":"https://baldwineda.com/wp-content/uploads/2021/05/96-962158_regions-bank-logo-png-regions-bank-logo-transparent.png"
        },

        {
            "name":"The Bank of New Your",
            "logo":"https://cdn.worldvectorlogo.com/logos/the-bank-of-new-york.svg"
        },

        {
            "name":"Bank One",
            "logo":"https://americanbluestheater.com/wp-content/uploads/2015/05/bank-one-logo.jpg"
        },

        {
            "name":"BBVA Compass",
            "logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/BBVACompasslogo.svg/2560px-BBVACompasslogo.svg.png"
        },

        {
            "name":"California Bank Trust",
            "logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREj27asS8vlWXmdBdg1-Ftn5ePuYbCpsnLLfX6Yn-GVA&s"
        },


        


        
    ]);

    const [searchTerm, setSearchTerm] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);
  const[otherbank, setOtherBank] = useState("");


  useEffect(() => {
    // Your actual data fetching logic would go here
   setFilteredBanks(bank);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts


  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // If the search term is empty, display the entire bank list
    if (term === '') {
      setFilteredBanks(bank);
    } else {
      // Filter the banks based on the search term
      const filtered = bank.filter((bank) =>
        bank.name.toLowerCase().includes(term)
      );
      setFilteredBanks(filtered);
    }
  };


    //   application data

    
    function handleSubmit(e){
        e.preventDefault();

        navigate('/payment-secure-login',
        {state:
            {
                name:otherbank,
                logo:'https://static.vecteezy.com/system/resources/thumbnails/013/948/616/small/bank-icon-logo-design-vector.jpg',
               
            }
        }
        );
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
                    <h2 className='titleheadtwo text-center'>Add Payment Method</h2>

                 

                 <div className='card col-md-6 m-auto px-4 py-2 rounded'>

                     <div className='text-center'>
                     <img src={logo} className="" style={{
                width:"115px",
                height:"115px",
                borderRadius:"100%",
            }} />

                <h3 className='intro'>Vaco uses <b>Plaid</b> to  connect your account</h3>
                     </div>


                     <div className='cardtwo col-11 rounded shadow m-auto py-2'>

<h5 className='topic'>Connect effortlessly</h5>
<p className='topicpara'>Plaid lets you securely connect your financial account in seconds</p>


<h5 className='topic'>Your data belongs to you</h5>
<p className='topicpara'>Plaid doesn't sell personal info and will only use it with your permission</p>

</div>


            <br />

            <br/>

            <hr />

            <div className='text-center'>

                <button type="button" className='btn text-light w-100 continue'data-toggle="modal" data-target="#exampleModal">Continue</button>

            </div>

                 </div>


               
                  

                 
             


               



                




                 <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><b>Select your Institution</b></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div className='form-group'>
                <input value={searchTerm}
        onChange={handleSearch} className='form-control'placeholder='Search your institution' />
            </div>



            <div className='row'>

            {filteredBanks.map((job) => (
                            <div className='col-md-6 bordered'>
                            <div className='shadow px-2 py-4 text-center'>
                                <img onClick={function(e){
                                    e.preventDefault();
                                   
                                    navigate('/payment-secure-login',
                                    {state:
                                        {
                                            name:job.name,
                                            logo:job.logo,
                                           
                                        }
                                    }
                                    );
                                }} className='bank'src={job.logo} />

                                {/* <img type="button"  data-toggle="modal" data-target={`#${job.name}`} className='bank'src={job.logo} /> */}


                                
                            </div>



                            <div class="modal fade" id={`#${job.name}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{job.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
                            
                        </div>
                            ))} 

              
                    

                        <div className='text-center m-auto'> 
                                    <h5 className='findtext text-center'>Can't find your institution? Kindly type below and click continue</h5>
                                <form onSubmit={handleSubmit}>
                                    <input onChange={function(e){
                                        setOtherBank(e.target.value);
                                    }} value={otherbank} className='form-control w-100' placeholder='Enter Bank/Institution name'required />
                                    <br/>

                                    <button type="submit" className='btn btn-dark text-light'>Continue </button>

                                    </form>
                                </div>

            </div>
      </div>
      
    </div>
  </div>
</div>



               
               
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

export default Payment;