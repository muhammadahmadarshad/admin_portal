import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { useState } from 'react';
import Product from './Product';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import SearchedProducts from './Searched_Products'
import Loading from '../Loading/Loading';
export default function Search_Products(props)  {
  const {page,query}=useParams()
  const [isOpen,setOpen]=React.useState(false)
  const [product, setProduct]=useState(query)
  const [products,setProducts]=useState({})
  const [loading,setLoading] = useState(true) 
  const [err,setErr]=useState(true)
  function onChangeProduct(e){
    setProduct(e.target.value)
  }
  function onSearchClick(e){
    e.preventDefault()
    props.history.push(`/search_product/${product}/1`)
    
}

  function get_products(){
    setErr(false)
    setLoading(true)
      if(query && page && parseInt(page)>0){
        Axios({
            method:'get',
            url:`http://localhost:5000/product/search_products/${query}/${page}`,
        }).then(res=>{
          setProducts(res.data)
            setLoading(false)
          setErr(false)
        }).catch(()=>{

            setErr(true)
            setLoading(false)
        })

      }
      else {
        setErr(true)
        setLoading(false)
     
      
      }
  }



  

useEffect(get_products,[page,query])
  
   

  let toggle=()=>{
      setOpen(!isOpen)
   }



    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       <NavBar toggle={toggle} isOpen={isOpen }/>
       <div  >
           <div className='jumbotron'>
               <h3>Search Products</h3>
                <Form onSubmit={onSearchClick}>
                    <FormGroup>
                        <Input value={product} placeholder='Product' onChange={onChangeProduct}/>
                    </FormGroup>
                    <FormGroup>
                        <Button className='btn w-50 m-auto btn-block btn-primary'>Search</Button>
                    </FormGroup>
                </Form>
           </div>
           <div className='container'>
           <SearchedProducts url={`/search_product/${query}/`}  loading={loading} match={props.match} history={props.history} products={products} />

           </div>
            



       </div>
       </div>
       </div>
    )}