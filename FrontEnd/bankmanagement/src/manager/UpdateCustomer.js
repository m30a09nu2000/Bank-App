import StaffNav from "../staff/StaffNav";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { managerService } from "../apiUrls";
import ManagerNav from "./ManagerNav";

function UpdateCustomer(){
    const location = useLocation();
    const dataToPass = location.state;

    const [formValue, setFormValue]= useState({user_firstname: dataToPass.user_firstname, user_lastname:dataToPass.user_lastname,user_address:dataToPass.user_address, email:dataToPass.email,  phone:dataToPass.phone});
    // const [message, setMessage]= useState();
   
    const handleInput=(e)=>{
     const {name, value}= e.target;
     setFormValue({...formValue, [name]:value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

    
    try {
     
        const response = await managerService.updateCustomer(formValue);
        console.log('updated:', response.data);
        alert("updated successfully")
    }catch(error){
        console.log(error);
        alert('updation failed')
    }
    }
   
    
    return(


        <>
        <ManagerNav />
        

<section className="vh-100" >
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update</p>

                <form class="mx-1 mx-md-4" onSubmit={handleSubmit} >

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" name = "user_firstname" value={formValue.user_firstname}  onChange={handleInput} required />
                      <label class="form-label" for="form3Example1c">First Name</label>
                    
                      
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" name = "user_lastname" value={formValue.user_lastname}  onChange={handleInput}  required />
                      <label class="form-label" for="form3Example1c">Last Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" class="form-control" name = "email"  value={formValue.email} required />
                      <label class="form-label" for="form3Example3c">Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" name = "phone" value={formValue.phone}  onChange={handleInput} required />
                      <label class="form-label" for="form3Example1c">Phone</label>
                    
                      
                    </div>
                         
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" name = "user_address"  value={formValue.user_address}  onChange={handleInput} required />
                      
                      <label className="form-label" htmlFor="form3Example1c">Address</label>
                    </div>
                  </div>


                 

                  

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                   
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">Update</button>
                  </div>
            
  
            

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/> */}

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
export default UpdateCustomer