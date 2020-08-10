import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import Product from './Product';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import { useState } from 'react';
import Paginate from './Paginate'

export default function Products(props)  {

  const [isOpen,setOpen]=React.useState(false)
  const [loading,setLoading]=React.useState(true) 
  const {page}=useParams()
  const [data,setData]= useState()
   
    React.useEffect(()=>{
        setLoading(true)
        Axios({method:'get'
        ,url:`http://localhost:5000/product/get_all_products/${page}`
        })
        .then(res=>{
            
            console.log(res.data)
            setData(res.data)
            setLoading(false)
        })
        

   },[page])

  let toggle=()=>{
      setOpen(!isOpen)
   }

  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
       <div className='container'>
            <h1 className='text-center text-primary'>Products</h1>
       {loading?<Loading/>:
            data.products.length?<div>
            <div className='row m-auto'>
           {data.products.map((item,index)=>{

            return <div className='col-md-3 col-sm-6 col-12'><Product key={index} product={item}/></div>
           })}
           </div>
            <Paginate match={props.match} url={`/all_products/`} history={props.history} total_results={data.total_results}/>
        </div>:<div>

            <h1 className='text-center text-danger'>Not Found</h1>
        </div>
        
        }
       </div>
       </div>
       </div>
       
       )}
