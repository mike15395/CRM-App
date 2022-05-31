import React from 'react'
import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function Login() {

    const [showSignUp, setShowSignUp] = useState(false);
    const [userType, setUserType] = useState('CUSTOMER');

    function handleSelect(e) {
        setUserType(e);
    }

    function toggle() {
        setShowSignUp(!showSignUp);
    }

  return (
    <div className='bg-primary d-flex align-items-center justify-content-center vh-100'>
          <div className='card m-5 p-5'>
              <div className='row'>
                  <div className='col'>
                      {!showSignUp ? (

                          <div className='login'>
                          <form>
                              <h2 className='text-center'>Login</h2><br/>
                              <div className='input-group m-1'>
                                    <input type='text' className='form-control' placeholder='UserID'/>
                              
                              </div>
                              <div className='input-group m-1'>
                                    <input type='password' className='form-control' placeholder='Password'/>
                              
                              </div>
                              <div className='input-group m-1'>
                                    <input type='submit' className='form-control btn btn-primary' value='Login' />
            
                              </div>
                              <div className='text-info text-center' onClick={toggle}>
                                    Don't have an account? SignUp
                              </div>
                          </form>
                      </div>


                      ) : (
                              <div className='SignUp'>
                          <form>
                              <h2 className='text-center'>Sign Up</h2><br/>
                              <div className='input-group m-1'>
                                    <input type='text' className='form-control' placeholder='UserID'/>
                              
                              </div>
                              <div className='input-group m-1'>
                                    <input type='text' className='form-control' placeholder='UserName'/>
                              
                              </div>
                           
                                    <input type='email' className='form-control m-1' placeholder='Email'/>
                              
                             
                              <div className='input-group m-1'>
                                    <input type='password' className='form-control' placeholder='Password'/>
                              
                              </div>
                              <div className='input-group m-1'>
                                  <span className='text-muted'>User Type</span>
                                <DropdownButton
                                      align='end'
                                      variant='secondary'
                                      className='mx-1'
                                      title={userType}
                                      onSelect={handleSelect}
                                  >
                                      <Dropdown.Item eventKey='CUSTOMER'>CUSTOMER</Dropdown.Item>
                                      <Dropdown.Item eventKey='ENGINEER'>ENGINEER</Dropdown.Item>
                                  </DropdownButton>
                              </div>

                              <div className='input-group m-1'>
                                    <input type='submit' className='form-control btn btn-primary' value='SignUp' />
            
                              </div>
                              <div className='text-info text-center' onClick={toggle}>
                                    Already have an account? Login
                              </div>
                          </form>
                      </div>
                      )}
                      

                      

                  </div>
              </div>

          </div>
          
    </div>
  )
}

export default Login