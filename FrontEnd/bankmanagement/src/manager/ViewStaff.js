

import { managerService } from "../apiUrls";

import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNav from "./ManagerNav";
import { axiosPrivate } from "../interceptor";


function ViewStaff(){
  const navigate = useNavigate();
  const [data, setData] = useState({ results: [], next: null, previous: null });


  useEffect(() => {
    

  

    const fetchData = async () => {
      try {
       
        const response = await managerService.viewStaff();
        setData(response.data)
        console.log(response.data)
       
        console.log("yes");
         
        
      } catch (error) {
       
        console.error(error.data);
      }
    };
  

    fetchData();
  }, []); 


  
    const handleUpdate = (dataToPass) => {

      console.log(dataToPass);
      navigate('/manager/updatecustomer', { state: dataToPass });
    };

    const handleTransaction = (account_number) => {

     
      navigate('/manager/viewtransaction', { state: account_number });
    };


    const handlepagination = async (url) => {
      try {
       
        const response = await axiosPrivate(url);
        setData(response.data)
        console.log(response.data)
       
        console.log("yes");
      }catch(error){
        console.log(error);
      }
    }
         
  


    return(

        <>
<ManagerNav />
        
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
           
            <th scope="col">Address</th>
         
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
          
            <td> {item.user_address}</td> 
           
            
          <td>  <button type="button" class="btn btn-success" onClick={() => handleUpdate(item)}>update</button> {' '}
          </td>
            </tr>
        
        ))}
     


      </tbody>
      </table>

      <button type="button" class="btn btn-success" onClick={() => handlepagination(data.previous_page)} >Previous</button>{'   '}

<button type="button" class="btn btn-success" onClick={() => handlepagination(data.next_page)} >Next</button>
     
    </div>
            </div>
            </div>
            </div>
        
      </>



   
    )
}
export default ViewStaff