import React from 'react'
import not from '../assets/not_found.svg';
import { useNavigate } from 'react-router-dom';



function Notfound() {

    const navigate = useNavigate();


function goBack() {
    navigate(-1); 
    //navigate('/') will also work same.
}
  return (
      <div className='d-flex justify-content-center align-content-center vh-100 mt-3 text-center'>
       
             <div>
                <h3>Hmm..This doesn't seem Right</h3>
                <img src={not} alt='notFound' />
                <div>
                    <button className='btn btn-primary' onClick={goBack}>Back</button>
                </div>
            </div> 
          
    </div>
  )
}

export default Notfound