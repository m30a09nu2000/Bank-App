import CustomerNav from "./CustomerNav"
import { customerService } from "../apiUrls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Deposit(){

    const [formValue, setFormValue]= useState({amount:''});
    const navigate = useNavigate()
   
      const handleInput=(e)=>{
       const {name, value}= e.target;
       setFormValue({...formValue, [name]:value});
      }
      
      const handleDepsoit = async (e) =>{
          e.preventDefault();
          console.log("formValue",formValue);
         
          try {
            
       
            const response = await customerService.deposit(formValue);
            console.log("response",response.data);
            
            
            alert(response.data)
            navigate('/customer/viewaccount')
            
          }catch(error){
            console.log("error",error.response.data);
            alert(error.response)
            navigate('/customerdash')
          }

        }
    return(

        <>
        <h1>Deposit</h1>
        <CustomerNav />
        <section className="vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Deposit</p>
    
                    <form className="mx-1 mx-md-4" onSubmit={handleDepsoit} >
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                         
         

                          
                          
                          <label className="form-label" htmlFor="form3Example1c"></label>
                         
                          
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="number" id="form3Example1c" className="form-control" name="amount" value={formValue.amount} onChange={ handleInput}  required />
                   
                          <label className="form-label" htmlFor="form3Example1c">Amount</label>
                          
                        </div>
                      </div>
    
                     
    
                  
    
    
                   
    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Deposit</button>
                      </div>
                
      
                    
    
                    </form>
    
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://img.freepik.com/free-photo/3d-render-hand-put-golden-coin-into-piggy-bank_107791-15916.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1699315200&semt=ais"
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

export default Deposit