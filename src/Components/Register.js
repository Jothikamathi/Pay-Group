import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
import './Register.css';
 import Dropdown from 'react-dropdown';
 import 'react-dropdown/style.css';

const Register=({data,setfun})=>{
    const apiUrl = "https://localhost:7089/Api/User";
    const useFocus = () =>{
        const htmlEIRef = useRef(null)
        const setFocus = () =>
        {htmlEIRef.current&&
            htmlEIRef.current.focus()}
        return [ htmlEIRef, setFocus ]
    }
    const[InputRef, setInputFocus]=useFocus()
    const[customer, setcustomer]=useState({
        componentCode:"",
        startDate:"",
        endDate:"",
        componentDescription:"",
        monthlyLimit:"",
        fortNightLimit:""
    })
    const options = [
      { value: 'IT-Developer', label: 'IT-Developer' },
  { value: 'VOICE-Samsung', label: 'VOICE-Samsung' },
  { value: 'TECHNICAL-Ethical Hacking', label: 'TECHNICAL-Ethical Hacking' },
  { value: 'MARKETING', label: 'MARKETING'},
  { value: 'HEALTH', label: 'HEALTH'}
];
    // const defaultOption = options[0];
useEffect(()=>{
    console.log("data from register",data)
    editChange()
},[data])
    function editChange(){
        setcustomer({
            componentCode:data.componentCode,
             startDate:data.startDate,
             endDate:data.endDate,
            componentDescription:data.componentDescription,
            monthlyLimit:data.monthlyLimit,
            fortNightLimit:data.fortNightLimit            
        })
    }
     function UpdateUser(){
        console.log("customer",customer) 
      // const { users } = this.state;
      axios.put(`${apiUrl}/UpdateEmployeeDetails`,{
        "componentCode": customer.componentCode,
        "startDate": customer.startDate,
        "endDate": customer.endDate,
        "componentDescription": customer.componentDescription,
        "monthlyLimit": customer.monthlyLimit,
        "fortNightLimit": customer.fortNightLimit  
      }).then((result) => {
        alert(result.data);
        setfun(true)
        // this.setState({
        //   response: result,
        //   users: users.filter((user) => user.tbId !== tbId),
        // });
      });
    }
   // const defaultOption = options[0];   
const {startDate, endDate, monthlyLimit, fortNightLimit }=customer;
function validate(event){
    var startDate=document.getElementById("startDate").value;
    var endDate=document.getElementById("endDate").value;
    if(startDate==="Jan/10"&& endDate==="Feb/10")
    {
        alert("Fixed One Month");
        return false;
    }    
    else
    {
        alert("Invalid startdate and enddate");      
    }
}
function onClicker(){
  var txt = document.getElementById("validation").required=("enter valid limit");
  document.getElementById("Hello").innerHTML = txt;
  let x = document.getElementById("numb").value;
  let text;
  if (isNaN(x)||x<1||x>30)
  {
      text = "Please Enter 30 Digit Must";

  } else{
      text = "Input OK";
  }
  document.getElementById("demo").innerHTML = text;
 var tt = document.getElementById("validation1").required=("enter valid limit");
 document.getElementById("demo").innerHTML = tt;
 let y = document.getElementById("num").value;
 let t;
 if (isNaN(y)||y<1||y>15)
 {
  t = "Please Enter 15 Digit Must";
 } else
  {
  t = "Input OK";
 }
 document.getElementById("demo").innerHTML = t;
}
  const oninputChange= e=>{
    setcustomer({...customer,[e.target.name]: e.target.value});
    }
    const onSubmit = async  => {        
        axios.post("https://localhost:7089/Api/User/InsertPayDetails",customer);
        alert ("Pay Details are inserted");
    };
    return(
       <div className='pay'>
            <div className='text-center'>
                <h1>Pay Details</h1>
                <form onSubmit={e=>onSubmit(e)}>
                <label>Pay Group</label>
                 <select className='grp' id="dropdown">
                    <option value="N/A">select</option>
                    <option value="1">IT</option>
                    <option value="2">VOICE</option>
                    <option value="3">NON VOICE</option>
                    <option value="4">TECHNICAL</option>
                    <option value="5">MARKETING</option>  
                    <option value="6">HEALTH</option>
                  </select>            
                <div className="form-group">
                  <label>Start Date</label>
                   <input  
                   className="a1"
                    type="date" 
                    id='startDate'
                    placeholder="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={e=>oninputChange(e)}
                    />
                    <p onClick={validate} id="event"></p>
                </div>
                <div>
                    <label>End Date</label>
                   <input type ="date"
                   className='date'
                   id='endDate'
                    placeholder="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={e =>oninputChange(e)}
                    />
                    <p onClick={validate} id="event"></p>
                </div>
                <div className='input'>
                <label className='name'>Component Name</label>
                <Dropdown options={options} name='componentDescription' className='a2' onChange={(value) => setcustomer({...customer,
                  componentDescription:value.value})} value={customer.componentDescription} placeholder="ComponentDescription" />
                </div> 
               <div>
                <label>Monthly Limit</label>
                   <input type ="text"
                   className='limit'
                    id='validation'
                    placeholder="monthlyLimit"
                    name="monthlyLimit"
                    value={monthlyLimit}
                    onChange={e =>oninputChange(e)}
                    /> <p onClick={onClicker} id='Hello'></p>
                </div>
                <div>
                    <label>Fort Night Limit</label>
                   <input type ="text"
                   className='night'
                    id='validation1'
                    placeholder="fortnightLimit"
                    name="fortNightLimit"
                    value={fortNightLimit}
                    onChange={e =>oninputChange(e)}
                    />
                    <p onClick={onClicker} id='demo'></p>
                </div>
               <button type='submit' onClick={onClicker} >Submit</button>
                </form>                        
                </div>
                <button className='btn' onClick={UpdateUser}>Update</button>                
        </div>
    )
}
export default Register;