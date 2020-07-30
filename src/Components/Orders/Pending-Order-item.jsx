import React from 'react'
import moment from 'moment'
import {  Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Pending_Order_Item = (props) => {

    const {item}=props
    const [status,setStatus]=React.useState(item.status)

   
    function onChangeStatus(e){
      
        setStatus(e.target.value)
    }


    function onStatusChange(e){
        console.log(e.target.value)
        Axios({method:'put',url:'http://localhost:5000/orders/order_update/',headers:{'x-auth-token':localStorage.getItem('admin-token')},
        
            data:{_id:item._id,status:e.target.value}}         
        ).then(()=>{

            props.get_Orders()


        })


    }

    const deleteOrder= ()=>{props.remove(item._id)}

    return (   

                                      
    <tr>
     
        <td>{item._id}</td>
        <td>{`${item.first_name} ${item.last_name}`}</td>
        <td>{item.email}</td>
        <td>
           <Input type='select' onInput={onStatusChange} value={status} onChange={onChangeStatus}>
            <option value="Pending">Pending</option>
            <option value='Dispatched'>Dispatched</option>                                
            </Input>
        </td>
        <td>{item.paymentType}</td>
        <td>{item.total} $</td>
        <td>{new moment(item.createdAt).calendar()}</td>
        <td>{item.phone}</td>
        <td ><Link to={`/product-order-details/${item._id}`} className='btn btn-primary' >Show</Link></td>
        <td onClick={deleteOrder}><i className="fa fa-trash btn-danger btn btn-lg"></i></td>
    </tr> 
  
    
    
    );
}
 
export default Pending_Order_Item;