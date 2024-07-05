
import NavBar from '../NavBar';
import './Register.css';
import 'bootstrap/dist/css/bootstrap.css';

import React,{  useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { customerService } from '../apiUrls';



function Register(){

  const navigate = useNavigate()
  const [formValue, setFormValue]= useState({user_firstname:'', user_lastname:'',user_address:'', email:'', password:'', phone:''});

  const [errors, setErrors] = useState({ user_firstname: '',user_lastname:'',phone: '',password: '',user_address:''});

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

  //  FirstName validation
    if ((/\d/.test(formValue.user_firstname))) {
      newErrors.user_firstname = 'First Name Should not contain digits';
      isValid = false;
    } 
    else if(!formValue.user_firstname.trim()){
      newErrors.user_firstname = 'First Name should not contain spaces';
      isValid = false;
    }
    else {
      newErrors.user_firstname = '';
    }

    //  LastName validation
    if ((/\d/.test(formValue.user_lastname))) {
      newErrors.user_lastname = 'Last Name Should not contain digits';
      isValid = false;
    }else if(!formValue.user_lastname.trim()){
      newErrors.user_lastname = 'Last Name should not contain spaces';
      isValid = false;

    } 
    else {
      newErrors.user_lastname = '';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!formValue.phone.match(phoneRegex)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
      isValid = false;
    } else {
      newErrors.phone = '';
    }

    // Password validation
    if (!formValue.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    // address validation

    if (!formValue.user_address.trim()) {
      newErrors.user_address = 'address is required';
      isValid = false;
    } else {
      newErrors.user_address = '';
    }

    setErrors(newErrors);
    return isValid;
  };


   
    const handleInput=(e)=>{
     const {name, value}= e.target;
     setFormValue({...formValue, [name]:value});
    }

      
      const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(formValue)
        const allInputvalue= { user_firstname: formValue.user_firstname, user_lastname:formValue.user_lastname, user_address:formValue.user_address,email: formValue.email, password: formValue.password, phone: formValue.phone };
   

    try {
     
        if(validateForm()){
      const response = await customerService.registration(allInputvalue);
      console.log(response.data);
      if (response.data == 'successfully registered'){
        alert(response.data)
      }else{
      const data =response.data
    
        alert(data.email)
   
        }
      }
        navigate('/login')
      
    } 
    catch (error) {
      console.error('Registration failed:', error);
      alert(error)
      
    }
  };
      
   
  










    return(
        <>
<NavBar/>
<section className="vh-100" >
  <div  className="container h-100">
    <div  className="row d-flex justify-content-center align-items-center h-100">
      <div  className="col-lg-12 col-xl-11">
        <div  className="card text-black">
          <div  className="card-body p-md-5">
            <div  className="row justify-content-center">
              <div  className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form  className="mx-1 mx-md-4" onSubmit={ handleSubmit} data-testid="registration-form">

                  <div  className="d-flex flex-row align-items-center mb-4">
                    <i  className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div  className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c"  className="form-control" name = "user_firstname" value={formValue.user_firstname} onChange={ handleInput}  required />
                      <label  className="form-label" htmlFor="form3Example1c">First Name</label>
                      <div  className="error" style={{ color: 'red' }}>{errors.user_firstname}</div>
                     
                      
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i  className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div  className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" name = "user_lastname" value={formValue.user_lastname} onChange={ handleInput}  required />
                      <label className="form-label" htmlFor="form3Example1c">Last Name</label>
                      <div className="error" style={{ color: 'red' }}>{errors.user_lastname}</div>
                    </div>
                  </div>

                  <div  className="d-flex flex-row align-items-center mb-4">
                    <i  className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div  className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c"  className="form-control" name = "email" value={formValue.email} onChange={ handleInput}  required />
                      <label  className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div  className="d-flex flex-row align-items-center mb-4">
                    <i  className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div  className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c"  className="form-control" name = "phone" value={formValue.phone} onChange={ handleInput}  required />
                      <label  className="form-label" htmlFor="form3Example1c">Phone</label>
                      <div className="error" style={{ color: 'red' }}>{errors.phone}</div>
                      
                    </div>
                         
                  </div>

                  <div  className="d-flex flex-row align-items-center mb-4">
                    <i  className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div  className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c"  className="form-control" name = "user_address" value={formValue.user_address} onChange={ handleInput}  required />
                      <label  className="form-label" htmlFor="form3Example1c">Address</label>
                      <div className="error" style={{ color: 'red' }}>{errors.user_address}</div>
                    </div>
                  </div>


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" name = "password" value={formValue.password} onChange={ handleInput}  required />
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                      <div className="error" style={{ color: 'red' }}>{errors.password}</div>
                    </div>
                  </div>

                  

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                   
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>
            
  
                  <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/login"
                className="link-danger">Login</a></p>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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
    );
}
export default Register
