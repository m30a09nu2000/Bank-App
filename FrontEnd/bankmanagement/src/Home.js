import NavBar from "./NavBar"


function Home(){

    const myStyle={
        backgroundImage: 
 "url('https://img.freepik.com/premium-photo/3d-rendering-credit-card-with-bank-building-clipping-path-included_582173-43.jpg?size=626&ext=jpg&ga=GA1.1.1120836993.1699364140&semt=ais')",
        height:'100vh',
        marginTop:'-5px',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    return(

        <>
        <NavBar />
        <div style={myStyle}/>
       
        
        </>
    )
}

export default Home