import React, { useState } from 'react';
// import axios from 'axios';
import {Form,Row,Card,CardBody,FormGroup,Col,Input,Label, FormFeedback,Spinner, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
function Forgetpassword (props) {

        let {email, changeEmail, handleForm,loading}=props


        return (
            <div className='layout'>

            <h1 className='text-center text-dark mt-5'>Admin Portal</h1>
                <Form onSubmit={handleForm} className='  mt-5'>
                  
                            <div className='jumbotron  box w- m-auto' >
                                <h3 className="text-center text-dark">Forgot Password</h3>
                               
                                    <FormGroup >
                                        <Label>Email:</Label>
                                        <Input type="email" placeholder='Enter Email' value={email.email} invalid={email.invalid} name="email"  onChange={changeEmail} required />
                                        <FormFeedback>{email.msg}</FormFeedback>
                                    </FormGroup>

                                    <Button className='m-auto' type="submit" block color="primary">{!loading?'Send Code':<Spinner/>}</Button>
                                
                            </div>
             
                </Form>
            </div>
        )
    }
export default Forgetpassword;