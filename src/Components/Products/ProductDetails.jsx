import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'

import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import { useState } from 'react';

import UpdateForm from './UpdateForm';
import DetailsTable from './DetailsTable'
export default function ProductsDetails(props)  {

  const [isOpen,setOpen]=React.useState(false)
  const [loading,setLoading]=React.useState(true) 
  const {id}=useParams()
  const [data,setData]= useState()
  let [name,setName] = useState({value:"",err:false,msg:""})
  let [feature,setFeature] = useState(false)
  let [description,setDescription] = useState({value:"",err:false,msg:""})
  let [category,setCategory] = useState({value:"",err:false,msg:""})
  let [brand,setBrand] = useState({value:"",err:false,msg:""})
  let [price,setPrice] = useState({value:"",err:false,msg:""})
  let [qty,setQty] = useState({value:"",err:false,msg:""})
  let [facts,setFacts] = useState({value:"",err:false,msg:""})
  let [formData,setFormData] = useState({image:{}})
  let [saving,setSaving]= useState(false)
  let [update,setUpdate]= useState(false)
  let [remove,setRemove] =useState(false)
  let [err,setErr] =useState(false)

function onChangeFeature(e){

    setFeature(e.target.value)
}

function onChangeFile(event)
{
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


function getProduct(){
    setLoading(true)
    Axios({method:'get',
    url:`http://localhost:5000/product/product_details/${id}`
    })
    .then(res=>{
    
        let {data}= res
        setData(data)
        setName({...name,value:data.name})
        setDescription({...description,value:data.description})
        setCategory({...category,value:data.category})
        setBrand({...name,value:data.brand})
        setPrice({...price,value:data.price})
        setQty({...qty,value:data.qty})
        setFacts({...facts,value:data.facts})
        setFeature(data.featured)
        setLoading(false)
        setErr(false)
    }).catch(()=>{
        setErr(true)
        setLoading(false)


    })  
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
    form.set('featured',feature)
    form.append('image',formData.image)
    setSaving(true)    
    Axios({method:'put',url:"http://localhost:5000/product/updateProduct/"+data._id,headers:{'content-type':"application/x-www-form-urlencoded",
            "x-auth-token":localStorage.getItem('admin-token')},
    data:form

}).then((res)=>{
    setSaving(false)
    getProduct()
    setUpdate(false)

}).catch(err=>{
    setSaving(false)
    const {data}= err.response
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
let toggle=()=>{
    setOpen(!isOpen)
 }
   
    React.useEffect(getProduct,[id])

if(err){


    return (        <div className="App wrapper content">  
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    <NavBar toggle={toggle} isOpen={isOpen }/>
    <div className='container-fluid'>
        <h1 className="text-center text-danger">Product Not Found</h1>        
</div> 
</div>
</div>       
        
)
}

    return (
        <div className="App wrapper content">  
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       <NavBar toggle={toggle} isOpen={isOpen }/>
       <div className='container-fluid'>
        {!loading?<div>
            <h3 className='bg-warning p-2 text-center rounded'>{data.name}</h3>
        <div >
            <div className='m-auto'>
            <div style={{width:'60%'}} className='w-50 m-auto'>{update?
                <UpdateForm
                    handleSubmit={handleSubmit}
                    onChangeBrand={onChangeBrand}
                    onChangeCat={onChangeCat}
                    onChangeFile={onChangeFile}
                    onChangeDes={onChangeDes}
                    onChangeFacts={onChangeFacts}
                    onChangeName={onChangeName}
                    onChangePrice={onChangePrice}
                    onChangeQty={onChangeQty}
                    onChangeFeature={onChangeFeature}
                    feature={feature}
                    qty={qty}
                    name={name}
                    description={description} price={price} category={category} brand={brand} facts={facts}saving={saving}                
                />:<div className='m-auto'>
                <DetailsTable 
                 qty={qty.value}
                name={name.value}
                delete_id={data._id}
                setUpdate={setUpdate}
                setRemove={setRemove}
                remove={remove}
                feature={feature}
                history={props.history}
                description={description.value} image={data.image.url} price={price.value} category={category.value} brand={brand.value} facts={facts.value}
                />
                
                </div>}
            </div>

            </div>
        </div>
        
        </div>
        :<Loading/>}
       </div>
       </div>
       </div>
       
       
       )}
