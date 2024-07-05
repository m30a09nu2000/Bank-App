import CustomerNav from './CustomerNav';
import './ViewAccount.css'
import 'bootstrap/dist/css/bootstrap.css';
import { customerService } from '../apiUrls';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ViewAccount(){
  const navigate = useNavigate()
  const [data, setData] = useState({});
 

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customerService.viewaccount();
        setData(response.data)
        
      
        
      } catch (error) {
       
        // console.log("error fetching data");
      }
    };
    fetchData();
   
  }, []);
 
  const handleClose = async () => {
    try {
     
      
      const response = await customerService.accountClose()
      
      if (response.data === "please withdraw money"){
        alert("please withdraw money then close account")
       
        navigate('/customer/withdraw')
      }else{
        
        alert("account closed successfully")
        
        
      }
      
     window.location.reload()
    }catch(error){
      console.log("account already closed");
      alert("account already closed")

    

    }
  }
  
    
 

 





    return(


        <>
        <CustomerNav/>
        <div className="container h-100">
       
         
       <div className="card text-black">
           <div className="card-body p-md-5">
           <table className="table table-bordered" align='center' >
        <thead>
          <tr>
            
            <th scope="col">Account Number</th>
            <th scope="col">Status</th>
            <th scope="col">Balance</th>
            <th scope="col">Account Type</th>

            <th scope="col">Action</th>
           
          </tr>
        </thead>
        <tbody>
          
            <tr>
            <td>{data["account number"]}</td>
              <td>{data.status}</td>
              <td>{data.balance}</td>
              <td>{data.account_type}</td>
             
              <td>  <button type="button" className="btn btn-success"  disabled={data.status==='closed'} onClick={() => handleClose()}>Close</button></td>           
            </tr>
         
          
           
           
          
          
     
        </tbody>
      </table>




            </div>
            </div>
            </div>
        </>
    )
}

export default ViewAccount