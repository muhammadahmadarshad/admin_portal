import React from 'react';

import classNames from 'classnames'
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import {useParams} from 'react-router-dom'
import Orders_Table from './Orders_Table';
import Axios from 'axios';

const DispatchedOrders = (props) => {

  let {page}=useParams()  
  const [isOpen,setOpen]=React.useState(false)
  const [orders,setOrders]=React.useState({orders:[],total_results:0})  
  const [loading,setLoading]=React.useState(true)
  function get_Orders(){
    setLoading(true)
    if(page===undefined){

        page=1
    }


    Axios({method:'get',url:`http://localhost:5000/orders/get_all_complete_orders/${page}`,headers:{'x-auth-token':localStorage.getItem('admin-token')}}).then((res)=>{
        setLoading(false)
        console.log(res.data)
        setOrders(res.data)


    })
}
  React.useEffect(get_Orders,[page])




  let toggle=()=>{
      setOpen(!isOpen)
   }
    return (
    <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>
       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
            <NavBar toggle={toggle} isOpen={isOpen }/>
            <div className='container-fluid'>
                
                <Orders_Table get_Completed_Orders={get_Orders} loading={loading} match={props.match} history={props.history} orders={orders}/>
                
            
         
                

            </div>
            </div>



            </div> );
}
 
export default DispatchedOrders;