import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'

import { Col, Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import Axios from 'axios';


export default function AddNutritionist(props)  {
  const [isOpen,setOpen]=React.useState(false)
   const [formData,setFormData]=React.useState({firstname:'',lastname:'',email:'',password:'',gender:''})
   const [loading,setLoading]=React.useState()
   const [err,setErr]=React.useState(false)
    const [touched,settouched]=React.useState({
        firstname: false,
        lastname: false,
        password: false,
        email: false
      })

    const [response,setResponse]=React.useState()

function onChange(e){

    let {name,value}=e.target

    setFormData({...formData,[name]:value})



}
let handleBlur =  evt => {
    settouched({ ...touched, [evt.target.name]: true }
    );
  };

function   validate(firstname, lastname, password, email) {
    const errors = {
      firstname: "",
      lastname: "",
      password: "",
      email: ""
    };

    if (touched.firstname && firstname.length < 3)
      errors.firstname = "First Name should be >= 3 characters";
    else if (touched.firstname && firstname.length > 10)
      errors.firstname = "First Name should be <= 10 characters";

    if (touched.lastname && lastname.length < 3)
      errors.lastname = "Last Name should be >= 3 characters";
    else if (touched.lastname && lastname.length > 10)
      errors.lastname = "Last Name should be <= 10 characters";
      if (touched.password && password.length < 3)
      errors.password = "Password should be >= 3 characters";
    else if (touched.password && password.length > 10)
      errors.password = "Password should be <= 10 characters";
    if (
      touched.email &&
      email.split("").filter(x => x === "@").length !== 1
    )
      errors.email = "Email should contain a @";

    return errors;
  }


  let toggle=()=>{
      setOpen(!isOpen)
   }


   function onSubmit(e){

    e.preventDefault()
    setLoading(true)
    Axios({method:'POST',url:'http://localhost:5000/nutritionist/signup',data:formData})
    .then(res=>{
        
        setResponse(res.data)
        setLoading(false)
    })
    .catch(err=>{

        setResponse(err.response.data?err.response.data:{success:false,msg:"Request Failed"})
        setLoading(false)
    })
   }
   let errors=validate(formData.firstname,formData.lastname,formData.password,formData.email)
  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
            <div className='container'>
                <h1 className="text-center text-primary">Add Nutritionist</h1>
        <div className='jumbotron p-5 text-white mt-5' style={{background:'#042330'}}>
        <Form onSubmit={onSubmit}>
      <FormGroup row>
        <Label for="firstname" sm={2}>Firstname</Label>
        <Col sm={10}>
          <Input type='text' value={formData.firstname} onChange={onChange}                     valid={errors.firstname === ''}
               onBlur={handleBlur}     invalid={errors.firstname !== ''} name="firstname" id='firstname' placeholder="Enter Firstname" />
          <FormFeedback>{errors.firstname}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="lastname" sm={2}>Lastname</Label>
        <Col sm={10}>
          <Input type="text" value={formData.lastname} onChange={onChange} valid={errors.lastname === ''}
               onBlur={handleBlur}     invalid={errors.lastname !== ''}  name="lastname" id="lastname" placeholder="Enter Lastname" required />
          <FormFeedback>{errors.lastname}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="email" sm={2}>Email</Label>
        <Col sm={10}>
          <Input type="email"  valid={errors.email === ''}
               onBlur={handleBlur}     invalid={errors.email !== ''}  value={formData.email} onChange={onChange} name="email" id="email" placeholder="Enter Email" required />
          <FormFeedback>{errors.email}
          </FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="password" sm={2}>Password</Label>
        <Col sm={10}>
          <Input type="password"
           valid={errors.password === ''}
           onBlur={handleBlur}     invalid={errors.password !== ''} 
          
          value={formData.password} onChange={onChange} name="password" id="password" placeholder="Enter Password" />
          <FormFeedback>{errors.password}</FormFeedback>
        </Col>
      </FormGroup>


      


      <FormGroup tag="fieldset" className='m-auto' row>
        <legend className="col-form-label col-sm-6">Gender</legend>
        <Col sm={6}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="gender" value='Male' required onChange={onChange} />{'  '}
              Male
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="gender" value='Female' required  onChange={onChange} />{'  '}
              Female
            </Label>
          </FormGroup>

        </Col>
      </FormGroup>
      <FormGroup check row className='mt-4'>
        <Col sm={{ size: 12, offset: 0 }}>
          <Button style={{background:'#138496'}} block>{loading?<Spinner/>:'Submit'}</Button>
        </Col>
      </FormGroup>

     {response?<div>

        <h4 className={response.success?'text-center text-success':'text-center text-danger'}>{response.msg}</h4>


     </div>:<h4></h4>}
    </Form>
                </div>


            </div>

       </div>


               
        
        </div>

    );
  
}
