import React from 'react'
import unauth from '../assets/403_Error_Forbidden.svg';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
      const navigate = useNavigate();


function goBack() {
    navigate(-1); 
    //navigate('/') will also work same.
}
  return (
      <div className='d-flex justify-content-center align-content-center vh-100 mt-3 text-center'>
       
             <div>
                <h3>Unauthorized Access</h3>
                <img src={unauth} alt='notFound' />
                <div>
                    <button className='btn btn-primary' onClick={goBack}>Back</button>
                </div>
            </div> 
          
    </div>
  )
}

export default Unauthorized