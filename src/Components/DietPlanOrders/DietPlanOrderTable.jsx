import React from 'react'
import { Table } from 'reactstrap'
import Paginate from './Paginate'
import moment from 'moment'
import { Link } from 'react-router-dom'
const Ordertable = ({data,match,history}) => {
    
    
    
    return ( <div>

            <Table>
                <thead>

                    <tr className='text-white bg-primary'>
                        <th>
                            Order_Id
                        </th>
                        <th>Ordered by</th>
                        <th>Order to</th>
                        <th>Time</th>
                        <th>Details</th>
                    </tr>
                </thead>


                <tbody>
                    {data.orders.map(order=>{
                        let {order_by,nutrtionist,purpose,createdAt,_id}=order

                        return (<tr key={_id}>

                        <td>{_id}</td>

                        <td>{`${order_by.first_name} ${order_by.last_name}`}</td>
                        <td>{`${nutrtionist.first_name} ${nutrtionist.last_name}`}</td>
             
                            <td>{moment(createdAt).calendar()}</td>
                            <td><Link className='btn btn-sm btn-primary' to ={`/diet_plan_order_details/${_id}`}>Show</Link></td>
                        </tr>)


                    })}
                   
                </tbody>
            </Table>

            <Paginate match={match} history={history} total_results={data.total_results} url={'/diet_plan_orders/'}/>

    </div> );
}
 
export default Ordertable;