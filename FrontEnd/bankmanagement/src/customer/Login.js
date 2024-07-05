import NavBar from "../NavBar"
import './Login.css';
import React,{  useState } from 'react';
import { customerService } from "../apiUrls";
import { useNavigate } from "react-router-dom";
// import { useUser } from '../context/UserContext';

function Login(){
	const [formValue, setFormValue]= useState({email:'', password:''});
  const navigate = useNavigate();
  // const { setUsername } = useUser();
    const handleInput=(e)=>{
     const {name, value}= e.target;
     setFormValue({...formValue, [name]:value});
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
       
        try {
     
          const response = await customerService.login(formValue);
          console.log('Registration successful:', response.data);
          console.log(response.data.access)
          console.log(response.data.refresh)
          const username = response.data.user_firstname
          const userId = response.data.id
          // setUsername(username);
          alert("Login Success")

          const tokens = {
            accessToken: response.data.access,
            refreshToken: response.data.refresh,
            username: response.data.user_firstname,
            userId : response.data.id
          };
          
          const tokensJSON = JSON.stringify(tokens);
                
          localStorage.setItem('tokens', tokensJSON);
          const user_type = response.data.user_type
          if ( user_type === 'customer'){
              navigate('/customerdash')
          }else if ( user_type === 'staff'){
              navigate('/staffdash')
        }else{
              navigate('/managerdash')
        }
          
        } catch (error) {
          alert("Invalid Credentials")
          
        }
      };
	

	return(
    
    <>
    <NavBar/>
    <section className="vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
    
                    <form className="mx-1 mx-md-4" onSubmit={ handleSubmit}>
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example1c" className="form-control" name = "email" value={formValue.email} onChange={ handleInput} data-testid="email-input" required />
                          <label className="form-label" htmlFor="form3Example1c">Email</label>
                         
                          
                        </div>
                      </div>
    
                      
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example3c" className="form-control" name = "password" value={formValue.password} onChange={ handleInput} data-testid="password-input"  required />
                          <label className="form-label" htmlFor="form3Example3c">Password</label>
                        </div>
                      </div>
    
                  
    
    
                   
    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Sign in</button>
                      </div>
                
      
                      <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                    className="link-danger">Register</a></p>
    
                    </form>
    
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
                   
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    </>
	)

}
export default Login;

  