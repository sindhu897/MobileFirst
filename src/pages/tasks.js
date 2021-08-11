import React,{useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Segment} from 'semantic-ui-react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect } from "react-redux";
import {editRow} from "../redux/reducer/actions";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Tasks(props) {
    var rows = props.tasks
  const classes = useStyles();

  const [data,setData] = useState([])
  const [search,setSearch] = useState('')
  const [sortDown, setSortDown] = useState(true);
  const [icons,setIcons] = useState({taskName: false,desc: false,status: false})
  const [filter,setFilter] = useState(false)
  const [date,setDate] = useState([])
  const [value,setValue] = useState({startDate:'',endDate:''})
  const [clear,setClear] = useState(false)


  function Tooltips(props){
    return <Tooltip title="sort">
              <th scope="col" className="p-3 pointer" onClick={(e)=>sortByName(props.name)}>{props.value} {icons[props.name] == true ?  sortDown ? <ArrowDownwardIcon/>: <ArrowUpwardIcon/>: ''}</th>
          </Tooltip>
  }


useEffect(()=>{
    setData(rows)
    console.log(rows)
    let d = []
    rows.map(data=> d.push({startDate: data.startDate,endDate: data.endDate}))
    // console.log(d)

      setDate(d)
},[])

const deleteTask = (id) => {
    // console.log(id)
    let items =  props.tasks

    let data = JSON.stringify(items.filter(item => item.id !== id))

    sessionStorage.setItem("tasks",data)
    window.location.reload()
}

const sortByName = (name)=>{
    const d = [...data]

    setIcons({[name] : true})

    let sort_order = sortDown ? 1 : -1 ;

    let a = d.sort(function(a, b){
        if(a[name] < b[name]) { return -1 * sort_order; }

        if(a[name] > b[name]) { return 1 * sort_order; }

        return 0 * sort_order;
    })
    
    setSortDown(prevState=>!prevState)
    setData(a)
}

const filterByDate=()=>{
  console.log(value.startDate,value.endDate)
  if(value.startDate !== '' && value.startDate !== null || value.endDate !== '' && value.endDate !== null){
    if (value.startDate !== '' && value.endDate !== '' && value.startDate !== null && value.endDate !== null) {
      console.log(value.startDate,value.endDate)
      const min = Date.parse(value.startDate)
      const max = Date.parse(value.endDate)
      // console.log(min, max)
      const sortedDate = rows.filter(d => {
        var startDate = Date.parse(d.startDate)
        var endDate = Date.parse(d.endDate);
        // console.log(startDate,endDate, min === startDate && max === endDate)
        return (min === startDate && max === endDate);
      });
      // console.log(sortedDate, value)
      setData(sortedDate)

    }
    else if (value.startDate !== '' && value.startDate !== null) {
      console.log(value.startDate)
      const min = Date.parse(value.startDate)
      // console.log(min, max)
      const sortedDate = rows.filter(d => {
        var startDate = Date.parse(d.startDate)
        // console.log(startDate,endDate, min === startDate && max === endDate)
        return (min === startDate);
      });
      // console.log(sortedDate, value)
      setData(sortedDate)

    }
    else if (value.endDate !== '' && value.endDate !== null) {
      console.log(value.endDate)
      const min = Date.parse(value.endDate)
      // console.log(min, max)
      const sortedDate = rows.filter(d => {
        var endDate = Date.parse(d.endDate)
        // console.log(startDate,endDate, min === startDate && max === endDate)
        return (min === endDate);
      });
      // console.log(sortedDate, value)
      setData(sortedDate)

    }
    setClear(true)
    setFilter(false)
  }
}

const clearFilter = () =>{
  setData(rows)
  setValue({startDate: '',endDate:''})
  setClear(false)
}

console.log("d",value)

  return (
    <React.Fragment>
      <Dialog
        open={filter}
        onClose={() => setFilter(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // maxWidth="sm"
      >
        <DialogTitle id="customized-dialog-title">
          Filter By Date <span className="float-end pointer" onClick={() => setFilter(false)}><CloseIcon /></span>
        </DialogTitle>
        <DialogContent className="mb-5">
          <Autocomplete
            value={value.startDate}
            onChange={(event, newValue) => {
              setValue({...value,startDate: newValue});
            }}
            id="controllable-states-demo"
            options={[...new Map(date.map(d =>
              
              [d['startDate'], d]) ).values()].map(d=>d.startDate)}
            style={{ width: 400 }}
            className="mb-3"
            renderInput={(params) => <TextField {...params} label="Start Date" variant="filled" />}
        />
        <Autocomplete
            value={value.endDate}
            onChange={(event, newValue) => {
              setValue({...value,endDate: newValue});
            }}
            id="controllable-states-demo"
            
            options={[...new Map(date.map(d =>

              [d['endDate'], d]) ).values()].map(d=>d.endDate)}

            style={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="End Date" variant="filled" />}
        />
        <Button variant="contained" color="primary" className="mt-3 float-end" onClick={()=>filterByDate()}>Filter</Button>
        </DialogContent>
      </Dialog>
    <Segment className="w-50 m-auto mt-3">
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:"transparent",color:"black",boxShadow:'none'}}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Tasks
          </Typography>
        <div style={{marginLeft: "auto"}}>
          
            <Tooltip title="Create task">
            <IconButton style={{color: "black"}} href="/editTask" onClick={()=>sessionStorage.setItem("status","add")} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter">
          <IconButton edge="start" className={classes.menuButton} onClick={()=>setFilter(true)} color="inherit" aria-label="menu">
            <FilterListIcon />
          </IconButton>
          </Tooltip>
        </div>

        </Toolbar>
      </AppBar>
      <hr/>
      <AppBar position="static" style={{backgroundColor:"transparent",color:"black",boxShadow:'none'}}>
      <Toolbar>
        <TextField className="w-50 mx-3" id="standard-basic" label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
         {clear ? <Button variant="outlined" className="ms-auto" color='primary' onClick={()=>clearFilter()}>Clear Filter</Button> : ''}
          </Toolbar>
      </AppBar>
    </div>
    <table className="table table-responsive mt-5" style={{border: "1px solid lightgrey"}}>
             <thead>
                 <tr >
                   <Tooltips value="Task Name" name="taskName"/>
                   <Tooltips value="Description" name="desc"/>
                   <Tooltips value="Status" name="status"/>
                 <th colSpan="2" className="p-3 text-center">Actions</th>

                 </tr>
             </thead>
             <tbody>

                 {data.length>0 ? data.filter(f=> f.taskName.toLowerCase().includes(search.toLowerCase())).map(task=>(
                <tr key={task.id}>
                    <td className="p-3">{task.taskName}</td>
                    <td className="p-3">{task.desc}</td>
                    <td className="p-3">{task.status}</td>
                    <td className="p-3" style={{textAlign: "right"}} onClick={(e)=> {props.editTask(task) ; sessionStorage.setItem("status","edit")}}><EditIcon/></td>
                    <td className="p-3" onClick={e => deleteTask(task.id)}><DeleteIcon/></td>
                </tr>
                ))  : <tr className="text-center p-3"> <td  colSpan="5">NO TASKS </td></tr>}
                
               
            </tbody>
        </table>
        </Segment>
        </React.Fragment>
  );
}


function mapStateToProps(state, ownProps) {
    return {
      tasks: state.reducer.tasks,
    };
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
        editTask: (row)=>dispatch(editRow(row))
    }
  }
  
  export default (connect(mapStateToProps,mapDispatchToProps)(Tasks));