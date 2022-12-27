import React,{useEffect,useState} from "react";
import axios from "axios";
import './GetRegister.css';
const apiUrl = "https://localhost:7089/Api/User";


const GetRegister=({setdata,fun})=>{
  const[users,setusers]=useState([])
  function getdata() {
    axios
      .get(apiUrl + "/GetPayDetails")
      .then((response) => response.data)
      .then(
        (result) => {
          setusers(result)
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  useEffect(()=>{
    getdata()
  },[fun])
  
  function DeleteRegister(componentCode) {
    //const { users } = this.state;
    axios.delete(apiUrl + "/DeleteUserDetails/" + componentCode).then((result) => {
        alert(result.data);
        setusers( users.filter((user) => user.componentCode !== componentCode))
    });
}
function UpdateUser(data){
  console.log("data",data)
  setdata(data)
}
      return (
        <div className="hole">
        <table  >
            <thead className="btn">
            <tr>
                    <th>Component Code</th>
                    <th>Component Description</th>
                    <th>Monthly Limit</th>
                    <th>Fort Night Limit</th>
                    <th>Delete</th>
                  </tr>
            </thead>
            <tbody className="list">
            {users.map((user)=>(
                <tr key={user.componentCode} >
                    <td>{user.componentCode}</td>
                    {/* <td>{user.startDate}</td>
                    <td>{user.endDate}</td> */}
                    <td>{user.componentDescription}</td>
                    <td>{user.monthlyLimit}</td>
                    <td>{user.fortNightLimit}</td>
                  <td>
                    <div>
                    <button
                      variant="danger"
                      onClick={() => DeleteRegister(user.componentCode)}
                    >
                      Delete
                    </button>
                     <button onClick={()=>UpdateUser(user)}> Edit</button>   
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } 
export default GetRegister;