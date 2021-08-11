import React,{useEffect, useState} from 'react'
import { connect } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import {jokes} from '../redux/reducer/actions'

function Jokes(props) {

    
      useEffect(()=>{

        props.jokes()

        console.log(props.data.loading)

    },[])

     
  return (
    
    <div className="container my-5">
        <h3 className="user-font text-center"><i>Jokes</i></h3>
        
        <div className="row mb-3 row-height">
            {props.data.loading ?  
            <div style = {{marginBottom:"10%",marginRight:"20%",marginTop:"10%"}}><center><Spinner animation="border" variant="primary"/></center></div>
            : 
            props.data.jokes.map(data=>(

                <div className='col-md-4 my-2' key={data.id}>
                <div className="card bg-white text-center h-100 p-3">
                    <div className="row">
                
                    <div className="col">
                        {/* <p className="m-0 px-2 underline">Comic Type: {data.type}</p> */}
                        <p className="card-text m-0 p-2" style={{fontFamily: "Rancho",fontSize:'30px',color: "chocolate"}}>{data.setup}</p>
                        <p className="m-0 px-2 punch-line"> {data.punchline}</p>
                
                    </div>
           
            </div>
            
            </div>
            </div>
            ))}
            
            
    </div>
    </div>
  );
}

const mapStateToProps=state=>{
  return{
      data: state.reducer
  }
}

const mapDispatchToProps=dispatch=>{
  return{
      jokes: ()=>dispatch(jokes())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Jokes);