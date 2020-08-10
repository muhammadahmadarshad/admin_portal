import React from 'react'
import { Table, Button } from 'reactstrap';
import Paginate from '../Orders/Paginate';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
const NutritionistTable = (props) => {

    let  {loading,err}=props

    if(loading){


        return <Loading/>
    }


    else if(err) {

        return <h1 className='text-center text-danger'>No Record Found.</h1>

    }
else{

    let data= props.data.list
    return (  <div>

<h1 className="text-center text-primary">Nutritionists </h1>
        <Table hover striped>
            <thead className='bg-primary text-white'>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Details</th>
                <th>Status</th>
                <th>Block</th>
            </thead>
            <tbody>
                {data.map(item=>{

                    return (<tr key={item._id}>

                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td><Link to={`/nutrtionist_profile/${item._id}`} className='btn btn-sm btn-primary'>Details</Link></td>
                    <td>{item.blocked?<span className='text-danger'>Inactive</span>:<span className='text-success'>Active</span>}</td>
                    <td><Button size='sm' onClick={()=>{props.Block(item._id)}} color='danger'>{item.blocked?'Unblock':"Block"}</Button></td>
                    </tr>)

                })}
            </tbody>
        </Table>

        <Paginate match={props.match} total_results={props.data.total_results} history={props.history}/>


    </div>);}
}
 
export default NutritionistTable;