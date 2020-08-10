import React from 'react'
import {Form,FormGroup,Input,Spinner} from 'reactstrap'
import {categories,brand as Brand} from '../ShopCategories'
const UpdateForm=(props)=>{
const {
    handleSubmit,
    onChangeBrand,
    onChangeCat,
    onChangeFile,
    onChangeDes,
    onChangeFacts,
    onChangeName,
    onChangePrice,
    onChangeQty,
    qty,
    name,
    description,price,category,brand,facts,saving,
    feature,
    onChangeFeature



}= props


return (
    <Form onSubmit={handleSubmit} className='jumbotron'>
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
Featured:
<Input  type='select' value={feature}  onChange={onChangeFeature} name='category' >
<option value={false}>No</option>
<option value={true}>Yes</option>



</Input>
</FormGroup>
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
<button className='btn btn-success btn-block'  type="submit"> {saving?<div><Spinner></Spinner> Updating...</div> :"Update Product"} </button>
</FormGroup>
</Form>
)

}

export default UpdateForm