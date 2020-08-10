import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import { Table, Button } from 'reactstrap';
import moment from 'moment'


  


export default function DietPlanOrderDetails(props)  {

  const [isOpen,setOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const [err,setError]= useState(false)
  const [data,setData]=useState({})
 


  let toggle=()=>{
      setOpen(!isOpen)
   }
   let {id} =useParams();
   let getData=()=>{
    setLoading(true)

    Axios({method:'get',url:`http://localhost:5000/diet_plan_order/order_details/${id}`, headers:{'x-auth-token':localStorage.getItem('admin-token')}})
    .then(res=>{
 
      setData(res.data)
      setLoading(false)
      setError(false)
    })
    .catch((err)=>{
    
      setLoading(false)
      setError(true)
    })

 }
 useEffect(getData,[id])


   if(loading)
   {

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


   else if(err)
   {

    return(        
    <div className="App wrapper content">        
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/>
     <div >
          <h1 className='text-danger text-center'>No Orders Available</h1>
     </div>

    </div>         
     </div>)


   }
  else
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
        
        <div className='container'>
            <h3 className='text-primary' style={{textAlign:"center"}}>Order Details</h3>
            <hr/>
            <div className='m-auto w-75 jumbotron'>
            <Table striped >

                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{data.order_by.first_name+" "+data.order_by.last_name}</td>
                    </tr>
                    <tr>
                        <th>Phone No.</th>
                        <td>{data.phone}</td>
                    </tr>
                    <tr>
                    <th>Gender</th>
                        <td>{data.order_by.gender}</td>
                    </tr>
                    <tr>
                    <th>BMI</th>
                        <td>{data.order_by.weight/Math.pow(data.order_by.height/100,2)}</td>
                    </tr>
                    <tr>
                        <th>Diet Plan Purpose</th>
                        <td>{data.purpose}</td>
                    </tr>
                    <tr>
                        <th>Diet Plan Description</th>
                        <td>{data.description}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                    <td>{data.status}</td>
                    </tr>

                    <tr>
                        <th>Ordered Date</th>
                        <td>
                            {moment(data.createdAt).calendar()}
                        </td>
                    </tr>
                </tbody>
            </Table>

            </div>
            
        </div>

       </div>


               
        
        </div>

    );
  
}
