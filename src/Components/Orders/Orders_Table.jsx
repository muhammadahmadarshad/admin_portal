import React from 'react'
import Loading from '../Loading/Loading';
import { Table, Modal,ModalBody,ModalFooter,ModalHeader,Button } from 'reactstrap';

import Paginate from './Paginate';
import DispatchOrderItem  from './Dispatch_Order_Item'
import Pending_Order_Item from './Pending-Order-item';
import DeleteConfirmation from './DeleteConfrim';
import Axios from 'axios';
const Orders_Table = (props) => {
    const toggle = () => setModal(!modal);
    const [modal, setModal] = React.useState(false);
    const [deleteID, setDeleteID]=React.useState('')
    const {orders,loading,order_type}=props
    const remove= (_id)=>{
            setModal(true)
            setDeleteID(_id)

    }

  const RemoveOrder=()=>{

       Axios({method:'DELETE',url:'http://localhost:5000/orders/delete',data:{_id:deleteID},headers:{'x-auth-token':localStorage.getItem('admin-token')}}).then((res)=>{

            if(order_type==='pending'){
                props.get_Orders()
               

            }

            else{

                props.get_Completed_Orders()
            }

            toggle()


       })
    }

    if(loading){

        return <Loading/>
    }
    else if (orders.orders.length===0){

        return ( <h1 className="text-center text-danger">Not Found</h1>)

    }

    return ( <div>




                    <div>
                        {order_type==='pending'?<h1 className="text-center text-Primary">Pending Orders</h1>:<h1 className="text-center text-Primary">Dispatched Orders</h1>} 
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

                            {orders.orders.map(item=>{

                    if(order_type==='pending')
                       return <Pending_Order_Item remove={remove} get_Orders={props.get_Orders} key={item._id} match={props.match} history={props.history} item={item}/>
                    else{
                        return <DispatchOrderItem remove={remove} get_Orders={props.get_Completed_Orders} key={item._id} match={props.match} history={props.history} item={item}/>
                    }

                            })}
                        </tbody>








                        </Table>

                        <div>
                            <Paginate total_results={orders.total_results} match={props.match} history={props.history} url={'/product-pending-orders/'}></Paginate>
                        </div>


                        </div>
                        

            
    </div> );
}
 
export default Orders_Table;