import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'

import './Dashboard.css'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useEffect } from 'react';
import Axios from 'axios';
import Loading from '../Loading/Loading';

export default function Dashboard(props)  {

  const [isOpen,setOpen]=React.useState(false)
  const [loading,setLoading]= React.useState(true)
  const [data,setData]=React.useState([])
  const [dietData,setDietData]=React.useState([])
   

  let toggle=()=>{
      setOpen(!isOpen)
   }
  
   useEffect(()=>{


    Axios({

      method:'get',url:'http://localhost:5000/admin/producst_sales',headers:{'x-auth-token':localStorage.getItem('admin-token')}
    }).then(res=>{
      setData(res.data)
    })
    .then(()=>{

      Axios({

        method:'get',url:'http://localhost:5000/admin/diet_sales',headers:{'x-auth-token':localStorage.getItem('admin-token')}
      }).then(res=>{
  
        setDietData(res.data)
        setLoading(false)
      }).catch(()=>{

        setLoading(false)
      })
    })
      
    
    .catch(()=>{

      setLoading(false)
    })


   },[])



   if(loading){
    
    return(
    <div className="App wrapper content">  
       
       
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/>
    <div>
      <Loading/>
    </div>
    </div>   
     </div>)
   }
  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
       <div className='container'>
       <h3 className='text-center text-primary mb-4'>Products Monthly Sales</h3>
       <div style={{overflowX:'scroll'}}>
         
       <LineChart
       style={{margin:'auto'}}
        width={1000}
        height={300}
        data={data}
    
      >
        <CartesianGrid  />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip/>
     
        
        <Line  dataKey="amount" stroke="#007BFF" />
      </LineChart>
      </div>




      <h3 className='text-center text-primary mb-4 mt-2'>Diet Plans Monthly Sales</h3>
       <div style={{overflowX:'scroll'}}>
         
       <LineChart
       style={{margin:'auto'}}
        width={1000}
        height={300}
        data={dietData}
    
      >
        <CartesianGrid  />
        <XAxis dataKey="date" />
        <YAxis />
     
        <Tooltip/>
        
        <Line  dataKey="amount" stroke="#FF0000" />
      </LineChart>
      </div>



      </div>
       </div>   
        </div>

    );
  
}
