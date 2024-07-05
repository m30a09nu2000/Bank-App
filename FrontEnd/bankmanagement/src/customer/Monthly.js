import CustomerNav from './CustomerNav';
import React, { useState } from 'react';
import { customerService } from '../apiUrls';

import { axiosPrivate } from "../interceptor";


function Monthly(){
    const [data, setData] = useState({ results: [], next: null, previous: null });

    const [formValue, setFormValue]= useState({month:''});

    
    
    const handleInput=(e)=>{
     const {name, value}= e.target;
     setFormValue({...formValue, [name]:value});
    }






  const handleSubmit = async (e) =>{
      e.preventDefault();
   
      console.log(formValue);
      if (!formValue.month) {
        
          alert('Please select month');
          return;
        }
      try{
          const response = await customerService.transactionHistoryMonthly(formValue);
          console.log(response.data);
          if (response.data=="Transaction not exist"){
            window.location.reload()
            alert(response.data)

          }else{
            setData(response.data)
          }
        
          
          
      }catch(error){
          alert(error.data)
      }
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
  const download = async () => {
    try {
      console.log(formValue);
      const response = await customerService.downloadHistoryMonthly(formValue);
      console.log(response.data);
      

      console.log('Response:', response);
      if (response.data === 'Transaction not exist'){
        window.location.reload()
        alert(response.data)
        
        
        
      }else{
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
  };
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
                   < label className="form-label" htmlFor="form3Example1c">Monthly Transaction History</label>
                    <select id="form3Example1c" className="form-select" aria-label="Default select example"  name="month" value={formValue.month} onChange={handleInput} >
<option selected>month</option>
<option value="1">January</option>
<option value="2">February</option>
<option value="3">March</option>
<option value="4">April</option>
<option value="5">May</option>
<option value="6">June</option>
<option value="7">July</option>
<option value="8">August</option>
<option value="9">September</option>
<option value="10">October</option>
<option value="11">November</option>
<option value="12">December</option>
</select>

                      
                      
                      <label className="form-label" htmlFor="form3Example1c"></label>
                     
                      
                    </div>
                  </div>

                  

                 

              


               

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">View</button>
                  </div>
            
  
                

                </form>

              </div>
             
            </div>
            <table className="table table-bordered" data-testid="table1" align='center' >
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


      <button type="button" className="btn btn-primary" disabled = {!data.previous_page} onClick={() => handlepagination(data.previous_page)} >Previous</button>{'   '}

<button type="button" className="btn btn-primary" disabled = {!data.next_page} onClick={() => handlepagination(data.next_page)} >Next</button>
          </div>
          <p align="right">
<button className="btn btn-primary" disabled={!formValue.month} value={formValue.month} onClick={download} >
      Download
    </button></p>
          
        </div>
       

      </div>
      
    </div>
  </div>

 
</section>

</>
        
   
    )
}
export default Monthly