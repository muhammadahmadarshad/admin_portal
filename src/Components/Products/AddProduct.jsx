import React,{useState} from 'react'
import { Input,Form, FormGroup, Spinner } from 'reactstrap';

import Axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import classNames from 'classnames'
import { categories, brand as Brand } from '../ShopCategories';
export default  function AddProduct(props) 
{
let [name,setName] = useState({value:"",err:false,msg:""})
let [description,setDescription] = useState({value:"",err:false,msg:""})
let [category,setCategory] = useState({value:"",err:false,msg:""})
let [brand,setBrand] = useState({value:"",err:false,msg:""})
let [price,setPrice] = useState({value:"",err:false,msg:""})
let [qty,setQty] = useState({value:"",err:false,msg:""})
let [facts,setFacts] = useState({value:"",err:false,msg:""})
let [formData,setFormData] = useState({image:{}})
let [saving,setSaving]= useState(false)

function onChangeFile(event)
{
    console.log(event.target.files[0])
    setFormData({...formData,'image':event.target.files[0]})

}

function onChangeName(event)
{
 setName({value:event.target.value,err:false,msg:""})
}

function onChangeDes(event)
{
setDescription({value:event.target.value,err:false,msg:""})
}

function onChangePrice(event)
{
setPrice({value:event.target.value,err:false,msg:""})
}

function onChangeQty(event)
{
setQty({value:event.target.value,err:false,msg:""})
}

function onChangeFacts(event)
{
setFacts({value:event.target.value,err:false,msg:""})
}


function onChangeCat(event)
{
setCategory({value:event.target.value,err:false,msg:""})
}
function onChangeBrand(event){

    setBrand({value:event.target.value,err:false,msg:""})
}




function handleSubmit(event){


    event.preventDefault()
    

    var form=new FormData()
    form.set('name',name.value)
    form.set('qty',qty.value)
    form.set('description',description.value)
    form.set('facts',facts.value)
    form.set('price',price.value)
    form.set('category',category.value)
    form.set('brand',brand.value)
    form.append('image',formData.image)
    setSaving(true)    
    Axios({method:'post',url:"http://localhost:5000/product/addProduct",headers:{'content-type':"application/x-www-form-urlencoded",
            "x-auth-token":localStorage.getItem('admin-token')},
    data:form

}).then((res)=>{
    setSaving(false)
    console.log(res.data)

}).catch(err=>{
    setSaving(false)
    const {data}= err.response
    console.log(data)
    if(data['path']){
        let {path,message}=data
        if(path[0]==='name')
            setName({...name,err:true,msg:message})
        else if(path[0]==="price")
        setPrice({...price,err:true,msg:message})
        else if(path[0]==='qty')
        setQty({...qty,err:true,msg:message})
        else if(path[0]==='description')
        setDescription({...description,err:true,msg:message})
        else if(path[0]==='facts')
        setFacts({...facts,err:true,msg:message})
        else if(path[0]==='category')
        setCategory({...category,err:true,msg:message})
        else if(path[0]==='brand')
        setBrand({...brand,err:true,msg:message})
    }



})

    


}
const [isOpen,setOpen]=React.useState(false)

   

let toggle=()=>{
    setOpen(!isOpen)
 }


  return (
      <div className="App wrapper content">  
     
     
     <Sidebar toggle={toggle} isOpen={isOpen}/>

     <div className={classNames('content container-fluid',{'is-open':isOpen})}>
     <NavBar toggle={toggle} isOpen={isOpen }/>
    <div className='container' >
       
        
        <div className='m-auto'>
        
        <Form onSubmit={handleSubmit} className='w-50 m-auto jumbotron '>  
        <h4 className='text-center'>Add Product</h4>
        <FormGroup>
            Name:
        <Input  type='text' value={name.value} invalid={name.err} onChange={onChangeName} name='name' placeholder='Enter Name'/>
        {name.err&&<span className='text-danger'>{name.msg}</span>}
        </FormGroup>

        <FormGroup>
        <div className='row'>
        <div className='col-sm-6'>
            Price
        <Input  type="number" value={price.value} invalid={price.err} onChange={onChangePrice} name='price' placeholder='Enter Price'/>
        {price.err&&<span className='text-danger'>{price.msg}</span>}

        </div>
        
        <div className='col-sm-6'>
        Quantity:
        <Input  type='number' value={qty.value} onChange={onChangeQty} name='qty' placeholder='Enter QTY'/>
        {qty.err&&<span className='text-danger'>{qty.msg}</span>}
        
        </div>
        </div>
        </FormGroup>
        <FormGroup>
        Category:
        <Input  type='select' value={category.value} onChange={onChangeCat} invalid={category.err} name='category' placeholder='Enter Category'>
        <option value='0'>Select Category</option>
        {
            categories.map(item=>{

            return(<option value={item.title}>{item.title}</option>)
            })

        }
        
        
        
        </Input>
        </FormGroup>
        {category.err&&<span className='text-danger'>{category.msg}</span>}
        <FormGroup>
        Brand:
        <Input  type='select' value={brand.value} invalid={brand.err} onChange={onChangeBrand} name='category' >
        <option value='0'>Select Brand</option>
        {
            Brand.map(item=>{

            return(<option value={item.title}>{item.title}</option>)
            })

        }

        
        </Input>
        </FormGroup>
        {brand.err&&<span className='text-danger'>{brand.msg}</span>}
        <FormGroup>
        Description:
        <Input invalid={description.err}  type='textarea' value={description.value} onChange={onChangeDes} name='description' placeholder='Enter Description'/>
        {description.err&&<span className='text-danger'>{description.msg}</span>}
        </FormGroup>
    
        <FormGroup>
        Facts
        <Input  type='textarea' value={facts.value}
        invalid={facts.err}
        onChange={onChangeFacts} name='facts' placeholder='Enter Facts'/>
        {facts.err&&<span className='text-danger'>{facts.msg}</span>}
        </FormGroup>

        <FormGroup>
        Image:
        <Input  type='file'  onChange={onChangeFile} placeholder='Select Image'/>
        </FormGroup>
        <FormGroup className='m-auto'>
        <button className='btn btn-success btn-block'  type="submit"> {saving?<div><Spinner></Spinner> Adding...</div> :"Add Product"} </button>
        </FormGroup>
        


    </Form>
    </div>

    </div>
    </div>
    </div>

)

    
}
