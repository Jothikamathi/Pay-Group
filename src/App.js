import './App.css';
import Register from './Components/Register'
import GetRegister from './Components/GetRegister';
import { useState } from 'react';

function App() {
  const[data,setdata]=useState([])
  const[fun,setfun]=useState(false)
  return (
    <div className='img'> 
        <Register data={data} setfun={setfun}/>
        <GetRegister setdata={setdata} fun={fun}/>  
         
         
    </div>
  );
}

export default App;