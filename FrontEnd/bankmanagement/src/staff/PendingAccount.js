import StaffNav from "./StaffNav"
import { staffService } from "../apiUrls";
import React, { useState, useEffect } from 'react';
function PendingAccount(){


    const [data, setData] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await staffService.pendingaccount();
        setData(response.data)
        console.log(response.data)
       
       
        console.log("yes");
         
        
      } catch (error) {
       
        console.error(error.data);
      }
    };
    fetchData();
   
  }, []);


  const handleapprove = async(accountNumber) => {

    const data ={
        'account_number' : accountNumber,
        'status' : 'approved'
    }
    console.log(data);
    try {
        const response = await staffService.updateaccount(data);
        console.log(response.data);
        alert("account approved successfully")
    
    }catch(error){
        alert("invalid Status")
    }
};

const handlereject = async(accountNumber) => {
 
  const data ={
      'account_number' : accountNumber,
      'status' : 'rejected'
      }
      console.log(data);
  try {
      const response = await staffService.updateaccount(data);
      console.log(response.data);
      alert("account rejected successfully")
  
  }catch(error){
      alert("invalid Status")
  }
};

    return(
        <>
        <StaffNav />

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous"></link>
      
        <div class="container h-100">
       
         
       <div class="card text-black">
           <div class="card-body p-md-5">
     
  
      <table className="table table-bordered" align='center' >
        <thead>
          <tr>
            
            <th scope="col">Account Number</th>
            <th scope="col">Status</th>
            <th scope="col">Account Type</th>
            <th scope="col">Action</th>
           
          </tr>
        </thead>
        <tbody>
          
        
           
          
           {data.map((value, index) => (
              <tr key={index}>
                <td>{value.account_number}</td>
                <td>{value.status}</td>
                <td>{value.account_type}</td>
           
          
           
           
            <td>
              
              
            <button type="button" data-testid="button1" class="btn btn-primary" name="Approve" onClick={() => handleapprove(value.account_number)}>Approve</button>{' '}
              <button type="button" data-testid="button2" class="btn btn-primary" onClick={() => handlereject(value.account_number)}>Reject</button>{' '}
            </td>

            </tr>
          ))}
           
         
     
        </tbody>
      </table>
    
    </div>
  </div>
</div>

                  
                
  
       

        </>
    )
}

export default PendingAccount