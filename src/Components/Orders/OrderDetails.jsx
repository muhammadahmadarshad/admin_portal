import React,{useState,useEffect} from 'react'
import Loading from '../Loading/Loading'
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import Axios from 'axios'
import { Table } from 'reactstrap'
import { Link } from 'react-router-dom'
const OrderDetails = (props) => {
    console.log(props.history)
    const [isOpen,setOpen]=React.useState(false)
    const [order,setOrder] = useState()
    const [err,setErr]=useState({err:false,msg:'No Order Found'})
    const [loading,setLoading]=useState(true)    
    const {product_id}= props.match.params
    let toggle=()=>{
        setOpen(!isOpen)
     }
     
     useEffect(()=>{
        setLoading(true)
        Axios({method:"GET",url:`http://localhost:5000/orders/order-details/${product_id}`,headers:{'x-auth-token':localStorage.getItem('admin-token')}})
        .then((res)=>{
            console.log(res.data)
            setOrder(res.data)
            setLoading(false)


        })


     },[product_id])

    if(loading){

        return (
            <div className="App wrapper content">  
       
       
            <Sidebar toggle={toggle} isOpen={isOpen}/>
     
            <div className={classNames('content container-fluid',{'is-open':isOpen})}>
            
            <NavBar toggle={toggle} isOpen={isOpen }/>
            <Loading/>
            </div>
            </div>
        
        )   



    }


    else if(err.err){

        return(
            <div className="App wrapper content">  
       
       
            <Sidebar toggle={toggle} isOpen={isOpen}/>
     
            <div className={classNames('content container-fluid',{'is-open':isOpen})}>
            
            <NavBar toggle={toggle} isOpen={isOpen }/>
            <h4 className='text-center text-danger'>
                {err.msg}
            </h4>
            </div>
            </div>
        )


    }

    else{

        return(
            <div className="App wrapper content">  
       
       
            <Sidebar toggle={toggle} isOpen={isOpen}/>
     
            <div className={classNames('content container-fluid',{'is-open':isOpen})}>
            
            <NavBar toggle={toggle} isOpen={isOpen }/>
                <div className='container text-center'>
                    <div className="jumbotron w-75 m-auto">
                    <h1 className='text-center text-primary'>Products</h1>
                    <hr/>
                    <Table striped hover className='w-75 m-auto'>
                        <thead className='bg-primary text-white'>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Units</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            {order.products.map(product=>{

                                return (<tr key={product._id} onClick={()=>{

                                    props.history.push(`/product_details/${product.product_id._id}`)
                                }}>
                                        <td>
                                            <img height='100px' src={product.product_id.image.url} alt={product.product_id.name}/>
                                        </td>
                                        <td>{product.product_id.name}</td>
                                        <td>{product.qty}</td>
                                        <td>{product.product_id.price}$</td>
                                        <td>{product.amount}$</td>
                                </tr>)


                            })}
                                <tr>
                                    <th><h2 className='text-right ' >Total</h2></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th><h2 className='text-right ' >    {order.total}$</h2></th>
                                </tr>

                        </tbody>

                        
                    </Table>

                    
                    </div>
                    <div className='text-center jumbotron w-75  m-auto'>
                            <h1 className='text-center'>
                                Order's Information
                            </h1>

                            <hr/>

                            <div >
                            <div className='row w-75 m-auto'>
                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Firstname</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.first_name}
                                
                            </div>

                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Lastname</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.last_name}
                                
                            </div>


                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Email</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.email}
                                
                            </div>

                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Phone No.</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.phone}
                                
                            </div>
                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Shipping Address.</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.shipping_address}
                                
                            </div>
                       
                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Billing Address</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.billing_address}
                                
                            </div>
                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>City</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.city}
                                
                            </div>
                       
                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Country</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.country}
                                
                            </div>

                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Postal Code</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.postal_code}
                                
                            </div>
                       
                            <div className='col-6 col-md-4 p-2 m-auto' style={{fontSize:"120%"}}>
                              <strong>Payment Type</strong> 
                            </div>

                            <div className='col-6 col-md-8 p-2 m-auto' style={{fontSize:"120%"}}>
                                {order.paymentType}
                                
                            </div>
                       
                       

                       




                            </div>
                            </div>

                            
                      

                    </div>
                </div>
            </div>
            </div>
        )

    }

}
 
export default OrderDetails;