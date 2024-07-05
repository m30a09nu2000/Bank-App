import CustomerNav from "./CustomerNav";
import { customerService } from "../apiUrls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Withdraw(){

    const [formValue, setFormValue]= useState({amount:''});
   const navigate = useNavigate()
   
    const handleInput=(e)=>{
     const {name, value}= e.target;
     setFormValue({...formValue, [name]:value});
    }
    
    const handleWithdraw = async (e) =>{
        e.preventDefault();
        console.log("formalue",formValue);
       
        try {
     
          const response = await customerService.withdraw(formValue);
          console.log(response.data);
          alert(response.data)
        }catch(error){
          console.log(error.response);
          alert(error.response)
          navigate('/customerdash')
        }

      }


    return(

        <>
        <CustomerNav/>
      
         <section className="vh-100" >
         <div className="container h-100">
           <div className="row d-flex justify-content-center align-items-center h-100">
             <div className="col-lg-12 col-xl-11">
               <div className="card text-black">
                 <div className="card-body p-md-5">
                   <div className="row justify-content-center">
                     <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
       
                       <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Withdraw</p>
       
                       <form className="mx-1 mx-md-4" onSubmit={handleWithdraw} >
       
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
                           <button type="submit" className="btn btn-primary btn-lg">Withdraw</button>
                         </div>
                   
         
                       
       
                       </form>
       
                     </div>
                     <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                     <img src="https://thumbs.dreamstime.com/b/busisnessman-holding-piggy-bank-bills-22122454.jpg?w=768"
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

export default Withdraw