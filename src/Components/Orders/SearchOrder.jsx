import React from 'react'

import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import { Form, FormGroup, Input, Button,Table, InputGroup} from 'reactstrap';
import SearchItem from './SearchItem'
import Axios from 'axios';
const SearchOrder = (props) => {
    const [isOpen,setOpen]=React.useState(false)
    const [loading,setLoading]=React.useState(false)
    const [err,setError]=React.useState(false)
    const [query,setQuery]=React.useState('')
    const [record,setRecord]=React.useState({status:""})
    const  [status,setStatus]=React.useState('Pending')



   function getOrder(){
  
    setLoading(true)
    Axios({method:'GET',url:'http://localhost:5000/orders/order-search/'+query,headers:{'x-auth-token':localStorage.getItem("admin-token")}})
    .then(res=>{
        console.log('hellow')
        setRecord(res.data)
        setLoading(false)
        setStatus(res.data.status)
    })
    .catch(()=>{
        setLoading(false)
        setError(true)


    })
   }

   function get(e){
    e.preventDefault()
    getOrder()
   }
    const onChangeQuery=({target})=>{

        setQuery(target.value)
    }



    let toggle=()=>{
        setOpen(!isOpen)
     }
    return ( 
    <div className="App wrapper content">  
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/> 
    <div className='jumbotron w-75 m-auto'>
               <h3 className='text-center'>Search Order</h3>
                <Form onSubmit={get}>
                    <FormGroup>
                    <InputGroup >
                        <Input value={query} placeholder='Enter Order ID' onChange={onChangeQuery}/>
                       
                     
                       
                     <div class="input-group-append">
                     <Button color='primary' >Search</Button>
                     </div>
                     </InputGroup>
                    </FormGroup>
                  
       
                </Form>
           </div>

        <div>
            <SearchItem status={status} setStatus={setStatus} getOrder={getOrder} record={record} err={err} loading={loading}/>
        </div>
    </div>
    </div>);
}
 
export default SearchOrder;