import React, { useState,useEffect,useRef } from "react";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { addTask } from "../redux/reducer/actions";
import Button from '@material-ui/core/Button';

function CreateTask(props) {

  var tasks = props.editTask
    const [state,setState] = useState(
       {id: Math.random(), taskName:'',desc:'',startDate:'',endDate:'',status:''}
    )
const flag = useRef(false)
    const isFirstRender = useRef(true)

useEffect(() => {
  if (!isFirstRender.current) {
    console.log(state) 
    // do something after state has updated
    if(flag.current){
    sessionStorage.getItem("status") === "edit" ? editTask() : createtask();
    }
  }
}, [state])

useEffect(() => { 
  isFirstRender.current = false // toggle flag after first render/mounting
}, [])

    useEffect(()=>{
        if(sessionStorage.getItem("status") == "edit"){
            setState(tasks)
        }
        
    },[])


    const status = () => {
      let l = []
      let today = Date.parse(new Date())
      var sd = Date.parse(state.startDate)
      var ed = Date.parse(state.endDate)
      if(state.taskName !== '' && state.desc !=='' && state.startDate !== '' && state.endDate !==''){
      if(sd <=today && ed > today){
          setState(prev=>({...prev,status: "Running"}))
          flag.current = true
      }
      else if(sd<today && ed < today){
        setState(prev=>({...prev,status: "Expired"}))
        flag.current = true
      }
      else if(sd>today && ed > today){
        setState(prev=>({...prev,status: "Scheduled"}))
        flag.current = true
      }
    }
    else{
      alert("Please fill in all the fields")
    }
    
    }


    const createtask = () =>{
        console.log(state,props.tasks)

        if(props.tasks.length>0 ){
            let data = props.tasks
            data.push(state)
            props.addTask(data)
            flag.current = false
        }
        else{
            let data = []
            data.push(state)
            props.addTask(data)
            flag.current = false
        }
        
    }


    const editTask = () =>{
        console.log(state,props.tasks)

        let data = props.tasks
        // console.log(data)
        let l=[]
                data.map(task=>task.id == state.id ? l.push(state):l.push({...task}))

                console.log(l)

                props.addTask(l)
                flag.current = false
        
    }

    // console.log(state)

    return (
      <div className="mt-5">
          <h3 className="w-50 m-auto mb-3">{sessionStorage.getItem("status") == "edit" ? "Edit Task" : "Create Task"}</h3>
        <Segment raised color="blue" className="segment-clr m-auto pb-4 w-50">
          <div className="row">
            <div className="col mb-2">
              <label className="label-font">Task Name</label>
              <input
                className="form-control"
                type="text"
                value={state.taskName}
                onChange={(e) => setState({...state,taskName : e.target.value})}
              />
            </div>
            </div>
            <div className="row">
            <div className="col mb-2">
              <label className="label-font">Description</label>
              <input
                className="form-control"
                type="text"
                value={state.desc}
                onChange={(e) => setState({...state,desc : e.target.value})}
              />
            </div>
            </div>
            <div className="row">
            <div className="col mb-2">
              <label className="label-font">Start Date</label>
              <input
                className="form-control"
                type="date"
                value={state.startDate}
                onChange={(e) => setState({...state,startDate : e.target.value})}
              />
            </div>
            </div>
            <div className="row">
            <div className="col mb-2">
              <label className="label-font">End Date</label>
              <input
                className="form-control"
                type="date"
                // minDate={new Date(state.startDate)}
                value={state.endDate}
                onChange={(e) => setState({...state,endDate : e.target.value})}
              />
            </div>
          </div>

          <div className="row pt-3">
            <div className="col btn-right"> 
            
                <Button
                // className="btn btn-primary"
                style={{ marginRight: "15px" }}
                onClick={()=>status()}
                variant="outlined"
                color="primary"
            >
              {sessionStorage.getItem("status") == "edit" ?   "Edit" : "Create"}
            </Button>
            
              <Button  color="secondary" variant="outlined" style={{color: "red"}} href="/viewTasks">
                Close
              </Button>
            </div>
          </div>
        </Segment>
      </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
      tasks: state.reducer.tasks,
      editTask: state.reducer.editTask
    };
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
        addTask: (tasks)=>dispatch(addTask(tasks))
    }
  }
  
  export default (connect(mapStateToProps,mapDispatchToProps)(CreateTask));
