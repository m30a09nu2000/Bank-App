import CustomerNav from "./CustomerNav"
import React, { useState } from 'react';

import { customerService } from "../apiUrls";



function CreateAccount(){


    const [formValue, setFormValue]= useState({account_type:''});

    
    
      const handleInput=(e)=>{
       const {name, value}= e.target;
       setFormValue({...formValue, [name]:value});
      }

 
 
 
 

    const handleSubmit = async (e) =>{
        e.preventDefault();
     
        console.log(formValue);
        if (!formValue.account_type) {
          
            alert('Please select an account type');
            return;
          }
        try{
            const response = await customerService.createaccount(formValue);
            alert(response.data)
        }catch(error){
            alert("Account Already exist !!!")
        }
    }
    

   return(

    <>
    <CustomerNav />

    <section className="vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                 
    
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit} >
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                       < label className="form-label" htmlFor="form3Example1c">Account Type</label>
                        <select id="form3Example1c" className="form-select" aria-label="Default select example"  name="account_type" value={formValue.account_type} onChange={handleInput}>
  <option selected>Account Type</option>
  <option value="savings">Savings</option>
  <option value="current">Current</option>
  <option value="salary">Salary</option>
</select>

                          
                          
                          <label className="form-label" htmlFor="form3Example1c"></label>
                         
                          
                        </div>
                      </div>
    
                      
    
                     
    
                  
    
    
                   
    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Create Account</button>
                      </div>
                
      
                    
    
                    </form>
    
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://biznext.in/images/jan-2022/Image-1.png"
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
};


export default CreateAccount