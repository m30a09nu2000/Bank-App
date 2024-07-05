import React from 'react';

import {Route, Routes } from 'react-router-dom';

import Login from './customer/Login';
import Home from './Home';
import Register from './customer/Register'
import CustomerDash from './customer/CustomerDash'
import ViewAccount from './customer/ViewAccount';

import ManagerDash from './manager/ManagerDash';
import ViewStaff from './manager/ViewStaff';
import ViewCustomer from './manager/ViewCustomer';
import StaffDash from './staff/StaffDash';
import PendingAccount from './staff/PendingAccount';
import { UserProvider } from './context/UserContext';
import CreateAccount from './customer/CreateAccount';
import Deposit from './customer/Deposit';
import Withdraw from './customer/Withdraw';
import TransactionHistory from './customer/TransactionHistory';

import Logout from './customer/Logout';
import UpdateCustomer from './manager/UpdateCustomer';

import CustomerView from './staff/CustomerView';
import UpdateStaff from './manager/UpdateStaff';


import ViewTransaction from './staff/ViewTransaction';
import TransactionView from './manager/TransactionView';
import Monthly from './customer/Monthly';


const App = () => {
  return (

   <>
  
  <UserProvider>
    
   <Routes>

    {/* home */}

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

   {/* Customer */}

          <Route path="/customerdash" element={<CustomerDash />} />
          <Route path="/customer/createaccount" element={<CreateAccount />} />
          <Route path="/customer/viewaccount" element={<ViewAccount />} />
          <Route path="/customer/deposit" element={<Deposit/>} />
          <Route path="/customer/withdraw" element={<Withdraw />} />
          <Route path="/customer/transactionhistory" element={<TransactionHistory />} />
          <Route path="/customer/Monthlytransactionhistory" element={<Monthly />} />
         
 
          {/* <Route path="/close" element={<AccountClose />} /> */}
       

      
      {/* Staff */}

          <Route path="/staffdash" element={<StaffDash />} />
          <Route path="/staff/pending" element={<PendingAccount />} />
          <Route path="/staff/customerview" element={<CustomerView/>} /> 
    
          <Route path="/staff/viewtransaction" element={<ViewTransaction />} />
          {/* <Route path="/staff/viewaccount" element={<ViewAccount />} />
          <Route path="/staf/viewtransaction" element={<Transaction />} />
        
        
        
         

      {/* Manager */}

          <Route path="/managerdash" element={<ManagerDash />} />
          <Route path="/manager/viewcustomer" element={<ViewCustomer />} />
          <Route path="/manager/updatecustomer" element={<UpdateCustomer />} />
          <Route path="/manager/viewtransaction" element={<TransactionView />} />

          <Route path="/manager/viewstaff" element={<ViewStaff />} />
          <Route path="/manager/updatestaff" element={<UpdateStaff />} />
         
         
    

       </Routes>

    </UserProvider>
   
   </>

  );
}
 

export default App
