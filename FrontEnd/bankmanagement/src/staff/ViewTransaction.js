
import { managerService, staffService } from "../apiUrls";

import { axiosPrivate } from "../interceptor";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import StaffNav from "./StaffNav";
import { useEffect,useState } from "react";
function ViewTransaction(){
    const navigate = useNavigate()
    const location = useLocation();
    const accountNumber = location.state;
    const [data, setData] = useState({ results: [], next: null, previous: null });
   const handleTrasnaction =async() =>{
   
   
    try{

      
    const  data = {

      'account_number' : accountNumber
    }
    const response = await staffService.viewTransaction(data);
    console.log(response.data);
    if (response.data === 'Transaction not exist'){
      alert("No Transactions found")
      navigate('/staff/customerview')

    }else{
   
    setData(response.data)

    }
   }catch(error){
    console.log(error);

    
   }
  }
   useEffect(()=>{
    if (accountNumber){
    handleTrasnaction();
    }
   },[])



   const handlepagination = async (url) => {
    try {
     
      const response = await axiosPrivate(url);
      setData(response.data)
      // console.log(response.data)
    
    }catch(error){
      console.log(error);
    }
  }

  const downloadHistory = async () => {
    
    try {

      const data={

        'account_number':accountNumber
      }
      const response = await staffService.downloadStaffManagerTransactionHistory(data);

      console.log('Response:', response);
      if (response.status === 200){

     

        const blob = new Blob([response.data], { type: 'text/csv' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'transaction.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("downloaded successfully")
      }
      
    } catch (error) {
     
      console.error(error);
    }
  }

  
    return(

        


        <>
        <StaffNav />

    
        <div class="container h-100">
       
         
       <div class="card text-black">
           <div class="card-body p-md-5">

           <table className="table table-bordered" align='center' >
        <thead>
          <tr>
          <th scope="col">Transaction Type</th>
          <th scope="col">Amount</th>
            <th scope="col">Balance</th>
            <th scope="col">Timestamp</th>
          
           
          </tr>
        </thead>
        <tbody>

   
  

        {data.results.map(item => (
          <tr key={item.id}>
            <td> {item.transaction_type}</td> 
            <td> {item.amount}</td> 
            <td> {item.balance}</td> 
            <td> {item.timestamp}</td> 
          

            </tr>
        
        ))}
     


      </tbody>
      </table>


      <button type="button" class="btn btn-primary" disabled = {!data.previous_page} onClick={() => handlepagination(data.previous_page)} >Previous</button>{'   '}

<button type="button" class="btn btn-primary" disabled = {!data.next_page} onClick={() => handlepagination(data.next_page)} >Next</button>
<p align="right"> 
 <button class="btn btn-primary" onClick={downloadHistory}>
      Download
    </button></p>



            </div>
            </div>
            </div>
    
    </>
  );
    
      
    
}

export default ViewTransaction