import React from 'react'
import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { userSignUp, userLogin } from '../api/auth';
import { useNavigate } from 'react-router-dom';
function Login() {

    const [showSignUp, setShowSignUp] = useState(false);
    const [userType, setUserType] = useState('');
    const [userSignUpData, setUserSignUpData] = useState({});
    //const [userLoginData, setUserLoginData] = useState({});
    const [message, setMessage] = useState("");

    function handleSelect(e) {
        setUserType(e);
    }

    function toggle() {
        setShowSignUp(!showSignUp);
    }

    function updateSignUpData(e) {
        userSignUpData[e.target.id] = e.target.value;
        console.log(userSignUpData);
        
    }
    function signUpFn(e) {

        const username = userSignUpData.username;
        const userId = userSignUpData.userId;
        const email = userSignUpData.email;
        const password = userSignUpData.password;
        
        const data = {
            name: username,
            userId: userId,
            email: email,
            password: password,
            usertype:userType
        }

       
        e.preventDefault();
         console.log('DATA', data);

        userSignUp(data).then(function (response) {
            console.log(response);
            if (response.status === 201) {
                navigate('/');
            }
        }).catch(function (error) {
            if (error.response.status === 400) {
                setMessage(error.response.data.message);
            }
            else {
                console.log(error);
            }
        });
        

    }

    // function updateLoginData(e) {
    //     userLoginData[e.target.id] = e.target.value;
    //     console.log(userLoginData);
        
    // }

    let navigate = useNavigate();
    function LoginFn(e) {
        // const userid=document.getElementById('userid').value;
        // const password = document.getElementById('password').value;
        
        const userId = userSignUpData.userId;
        const password = userSignUpData.password;

        const data = {
            userId: userId,
            password:password
        }
        e.preventDefault();
        console.log(data);

        userLogin(data).then(function (response) {
            if (response.status === 200) {
                if (response.data.message) {
                    setMessage(response.data.message);
                }
                else {
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('userTypes', response.data.userTypes);
                    localStorage.setItem('userStatus', response.data.userStatus);
                    localStorage.setItem('token', response.data.accessToken);
                    if (response.data.userTypes === 'CUSTOMER') {
                        // navigate('/customer');
                        window.location.href = '/customer';
                    }
                    else if (response.data.userTypes === 'ENGINEER') {
                        // navigate('/engineer');
                        window.location.href = '/engineer';
                    }
                    else  {
                        //  navigate('/admin');
                        window.location.href = '/admin';
                    }
                
            }
            }
            
        }).catch(function (error) {
            if (error.response.status === 400) {
                setMessage(error.response.data.message);
            }
            else {
                console.log(error);
            }
        });
        
    }

  return (
    <div className='bg-primary d-flex align-items-center justify-content-center vh-100'>
          <div className='card m-5 p-5'>
              <div className='row'>
                  <div className='col'>
                      {!showSignUp ? (

                          <div className='login'>
                          <form onSubmit={LoginFn}>
                              <h2 className='text-center'>Login</h2><br/>
                              <div className='input-group m-1'>
                                      <input type='text' className='form-control'
                                          placeholder='UserID' id='userId' onChange={updateSignUpData} />
                              
                              </div>
                              <div className='input-group m-1'>
                                      <input type='password' className='form-control'
                                          placeholder='Password' id='password' onChange={updateSignUpData} />
                              
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
                          <form onSubmit={signUpFn}>
                              <h2 className='text-center'>Sign Up</h2><br/>
                              <div className='input-group m-1'>
                                          <input type='text' className='form-control'
                                              placeholder='UserID' id='userId' onChange={updateSignUpData} />
                              
                              </div>
                              <div className='input-group m-1'>
                                          <input type='text' className='form-control'
                                              placeholder='UserName' id='username' onChange={updateSignUpData} />
                              
                              </div>
                           
                                      <input type='email' className='form-control m-1'
                                          placeholder='Email' id='email' onChange={updateSignUpData} />
                              
                             
                              <div className='input-group m-1'>
                                          <input type='password' className='form-control'
                                              placeholder='Password' id='password' onChange={updateSignUpData} />
                              
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
                                      <div className='text-danger'>{message}</div>
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