import React from 'react'
import { Table } from 'reactstrap';
import {  Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Axios from 'axios';
import moment from 'moment'
import DeleteConfirmation from './DeleteConfrim';
const Searchrecord = (props) => {
    let {loading,err,record,status,setStatus}=props
    const [modal, setModal] = React.useState(false);
    const [deleteID, setDeleteID]=React.useState('')
    const toggle = () => setModal(!modal);
    const remove= (_id)=>{
        setModal(true)
        

}



   
function onChangeStatus(e){
  
    setStatus(e.target.value)
    onStatusChange(e.target.value)
}


function onStatusChange(value){

    Axios({method:'put',url:'http://localhost:5000/orders/order_update/',headers:{'x-auth-token':localStorage.getItem('admin-token')},
    
        data:{_id:record._id,status:value}}         
    ).then(()=>{
        props.getOrder()     

    })


}

const RemoveOrder=()=>{

   Axios({method:'DELETE',url:'http://localhost:5000/orders/delete',data:{_id:record._id},headers:{'x-auth-token':localStorage.getItem('admin-token')}}).then((res)=>{

        props.getOrder()

        toggle()


   })
}
    if(loading){


        return <Loading/>
    }

    else if(err){


        return (<h1 className='text-danger text-center'>Order Not Found..</h1>)
    }



    else if(record['_id']){
    return ( <div>
        <DeleteConfirmation remove={RemoveOrder} toggle={toggle} modal={modal}/>   
<Table  hover>
                        <thead>

                              <tr>
                                   <th>Order_Id</th>
                                   <th>Customer Name</th>
                                   <th>Email</th>
                                   <th>Status</th>
                                   <th>Payment Type</th>
                                   <th>Total Amount</th>
                                   <th>Time</th>
                                <th>Phone</th>
                                <th>Ordered Products</th>
                                <th>Remove</th>
        

                                </tr>
                        </thead>


                    <tbody>
                    <tr>
     
     <td>{record._id}</td>
     <td>{`${record.first_name} ${record.last_name}`}</td>
     <td>{record.email}</td>
     <td>
        <Input type='select'  value={status} onChange={onChangeStatus}>
         <option value="Pending">Pending</option>
         <option value='Dispatched'>Dispatched</option>                                
         </Input>
     </td>
     <td>{record.paymentType}</td>
     <td>{record.total} $</td>
     <td>{new moment(record.createdAt).calendar()}</td>
     <td>{record.phone}</td>
     <td ><Link to={`/product-order-details/${record._id}`} className='btn btn-primary' >Show</Link></td>
     <td onClick={remove}><i className="fa fa-trash btn-danger btn btn-lg"></i></td>
 </tr> 
                    </tbody>
</Table>


    </div> );}

else {

    return(
        <div></div>
    )
}
}
 
export default Searchrecord;