// import './CustomerNav.css'

function CustomerNav(){

    return(

        <>
    
    <div className="back"></div>
    <nav>
  <a href="/customerdash">Home</a>
  <a href="/customer/createaccount">create Account</a>
  <a href="/customer/viewaccount">View Account</a>

  
  <a href="/customer/deposit">Depsoit</a>
  <a href="/customer/withdraw">Withdraw</a>
  <a href="/customer/transactionhistory">Transaction History</a>
  <a href="/customer/Monthlytransactionhistory">Monthly History</a>



 
  <a href="/logout">Logout</a>
  

 
</nav>

</>
    )
}
export default CustomerNav
