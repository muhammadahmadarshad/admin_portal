import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'

import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import Loading from '../Loading/Loading';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import DetailTable from './DetailTable';


  


export default function NutritionistDetails(props)  {

  const [isOpen,setOpen]=useState(false)
 const [loading,setLoading]=useState(true)
 const [err,setErr]=useState(false)
 const [data,setData]=useState(false)
 let {id}=useParams()


 let toggle=()=>{
      setOpen(!isOpen)
   }
let Get=()=>{
   setLoading(true)
  Axios({method:'get', url:`http://localhost:5000/nutritionist/find_by_id/${id}`})
  .then(res=>{

       setData(res.data)
       setLoading(false)
       setErr(false)

   })
  .catch(()=>{
   setLoading(false)
   setErr(true)

  })

}
   useEffect(Get,[id])


   if(loading)
   {
        return(        
        
        <div className="App wrapper content">  
       
       
        <Sidebar toggle={toggle} isOpen={isOpen}/>
 
        <div className={classNames('content container-fluid',{'is-open':isOpen})}>
        
        <NavBar toggle={toggle} isOpen={isOpen }/>
         
         <Loading/>
 
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
         
        <h1 className="text-danger text-center">Not Found...</h1>
 
        </div>
         </div>)
   }




  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
        <div className='container'>
                <DetailTable get={Get} data={data}></DetailTable>            
        </div>

       </div>


               
        
        </div>

    );
  
}
