import CustomerNav from "./CustomerNav";
import { customerService } from "../apiUrls";
import { useState,useEffect } from "react";
import { axiosPrivate } from "../interceptor";

function TransactionHistory(){

    const [data, setData] = useState({ results: [], next: null, previous: null });


 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customerService.transactionHistory();
        if (response.data == 'Transaction not exist'){
          alert(response.data)

        }else{
          setData(response.data)
        }
        console.log(response.data)
       
        
        console.log("yes");
         
        
      } catch (error) {
       
        console.error(error.data);
        alert(error.data)
      }
    };
    fetchData();
   
  }, []);


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
      const response = await customerService.downloadHistory();

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
  };

    
  return(

    <>
    <CustomerNav />
    <div className="container h-100">
   
         
       <div className="card text-black">
           <div className="card-body p-md-5">
        

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
<p align="right">
<button className="btn btn-primary" onClick={download}>
      Download
    </button></p>
  


            </div>
            </div>
            </div>
            {/* <h3>monthly</h3> */}

    
    </>
  );
    
}
export default TransactionHistory