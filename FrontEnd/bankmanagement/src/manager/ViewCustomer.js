

import { managerService } from "../apiUrls";

import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNav from "./ManagerNav";
import { axiosPrivate } from "../interceptor";
function ViewCustomer(){
  const navigate = useNavigate();
  const [data, setData] = useState({ results: [], next: null, previous: null });


  useEffect(() => {
    

  

    const fetchData = async () => {
      try {
       
        const response = await managerService.viewCustomer();
        setData(response.data)
        // console.log(response.data)
       
        console.log("yes");
         
        
      } catch (error) {
       
        console.log(error);
        
      }
    };
  

    fetchData();
  }, []); 


  
    const handleUpdate = (dataToPass) => {

      console.log(dataToPass);
      navigate('/manager/updatecustomer', { state: dataToPass });
    };

   


    const handleView = async(accountNumber) =>{

     

      navigate('/manager/viewtransaction', { state: accountNumber });
     


    }

    const handlepagination = async (url) => {
      try {
       
        const response = await axiosPrivate(url);
        setData(response.data)
        // console.log(response.data)
       
       
      }catch(error){
        console.log(error);
      }
    }
         
  


    return(

        <>
<ManagerNav />
        
        <h1>customer</h1>
      <div className="container h-100">
       
         
       <div className="card text-black">
           <div className="card-body p-md-5">

           <div>
     


      <table className="table table-bordered" data-testid = 'table1' align='center' >
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
            <th scope="col">Action</th>
           
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
            
          <td>  <button type="button" className="btn btn-success" onClick={() => handleUpdate(item)}>Update</button> {' '}
          <button type="button" className="btn btn-success" onClick={() => handleView(item.accountNumber)}>View</button></td>
            </tr>
        
        ))}
     


      </tbody>
      </table>

      <button type="button" className="btn btn-success" disabled ={!data.previous_page} onClick={() => handlepagination(data.previous_page)} >Previous</button>{'   '}

<button type="button" className="btn btn-success" disabled ={!data.next_page} onClick={() => handlepagination(data.next_page)} >Next</button>
     
    </div>
            </div>
            </div>
            </div>
        
      </>



   
    )
}
export default ViewCustomer
