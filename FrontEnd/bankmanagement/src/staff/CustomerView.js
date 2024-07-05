

import { staffService } from "../apiUrls";

import { useState,useEffect } from "react";
import { axiosPrivate } from "../interceptor";
import StaffNav from "./StaffNav";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
function CustomerView(){

  const [data, setData] = useState({ results: [], next: null, previous: null });
  const navigate = useNavigate()
  const location = useLocation();
  const accountNumber = location.state;
  useEffect(() => {
    

    fetchData();
  }, []); 

    const fetchData = async () => {
      try {
       
        const response = await staffService.viewCustomer();
        setData(response.data)
        
              
        
      } catch (error) {
       
       
          console.log("error",error)
      }
    };
    
    const handlepagination = async (url) => {
      try {
       
        const response = await axiosPrivate(url);
        setData(response.data)
        
       
       
      }catch(error){
        console.log(error);
      }
    }


    const handleView = async(accountNumber) =>{

     

      navigate('/staff/viewtransaction', { state: accountNumber });
     


    }

    
    return(

        <>
<StaffNav />
        
        <h1>customer</h1>
      <div class="container h-100">
       
         
       <div class="card text-black">
           <div class="card-body p-md-5">

           <div>
     


      <table className="table table-bordered" align='center' >
        <thead>
          <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Balance</th>
            <th scope="col">Address</th>
            <th scope="col">Account Number</th>
            <th scope="col">Account Status</th>
            <th scope="col">Transaction History</th>
           
           
          </tr>
        </thead>
        <tbody>

   
  

        {data.results.map(item => (
          <tr key={item.id}>
            <td> {item.user_firstname}</td> 
            <td> {item.user_lastname}</td> 
            <td> {item.email}</td> 
            <td> {item.phone}</td> 
            <td> {item.balance}</td> 
            <td> {item.user_address}</td> 
            <td> {item.accountNumber}</td> 
            <td> {item.accountStatus}</td> 
            <td><button class="btn btn-primary" data-testid="updateButton-1"  onClick={() => handleView(item.accountNumber)} >View</button></td>
           
          </tr>
        
        ))}
     
     

      </tbody>
      </table>
      <button type="button" class="btn btn-primary"  disabled ={!data.previous_page} onClick={() => handlepagination(data.previous_page)} >Previous</button>{'   '}

<button type="button" class="btn btn-primary" disabled ={!data.next_page} onClick={() => handlepagination(data.next_page)} >Next</button>
    

    </div>
            </div>
            </div>
            </div>
        
      </>



   
    )
}
export default CustomerView