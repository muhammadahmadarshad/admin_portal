import React from 'react'
import './DetailsTable.css'
import { Button, ButtonGroup,Modal,ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useState } from 'react'
import Axios from 'axios'
export default function DetailsTable(props){

    const 
    {
        name,category,description,brand,price,qty,facts,image,setUpdate,delete_id,history
        ,remove,setRemove
    }=props

    function delete_product(){
        setRemove(true)
        Axios({
        
            method:'delete',
            url:'http://localhost:5000/product/delete_product/'+delete_id,
            headers:{'x-auth-token':localStorage.getItem('admin-token')}}
            )
            .then(res=>{
                console.log(res.data)
                setRemove(false)
                history.push('/all_products/1')
            })
            .catch(err=>{

                console.log(err.response)
            })


    }


    const [confirm,setConfirm]= useState(false)
    const toggle=()=>{

        setConfirm(!confirm)
    }

    return(<div className='detail w-100'>

            <Modal isOpen={confirm}>
            <ModalHeader toggle={toggle}/>
            <ModalBody>
                {!remove?"Are you sure to Delete the Product?":"Removing"}
            </ModalBody>
            <ModalFooter>

                <Button onClick={delete_product} className='btn-block btn-danger'>
                    Yes
                </Button>
                <Button onClick={toggle} className='btn-block btn-light'>
                    No
                </Button>
            </ModalFooter>

            </Modal>


            <table>
            <thead>
            <tr>
                <th>name</th>
                <th>price</th>
                <th>Stock</th>  
                <th>brand</th>
                <th>category</th>
                <th>facts</th> 
                <th>description</th> 
            </tr>    
            </thead>    
            <tbody>
            <tr>
            <td><img alt={image} src={image} width='100%' height='500'/></td>
            <td data-label='name'>{name}</td> 
            <td  data-label='price'>{price} $</td>
            <td data-label='stock'>{qty}</td>
            <td data-label='brand'>{brand}</td>
            <td data-label='category'>{category}</td> 
            <td data-label='facts'>{facts}</td>
            <td data-label='description'>{description}</td>    
            <td  >{<ButtonGroup><Button onClick={toggle} color='danger'>Remove</Button>
            
            <Button onClick={

                ()=>{

                    setUpdate(true)
                }


            } color='success'>Update</Button></ButtonGroup>}</td>   
            </tr>    
            </tbody>        
            </table>
        
        
        </div>



    )
}