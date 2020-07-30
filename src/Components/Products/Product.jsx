import React from 'react';

import {Card,CardBody,CardImg,CardTitle,CardSubtitle} from 'reactstrap'
import { Link } from 'react-router-dom';

const {Meta}= Card
export default function Product(props)  {
    return (
     
            
    <Card className='mt-2 shadow'> 
        <CardImg width='250' height='200' src={props.product.image.url}></CardImg>
        <CardBody>
        <CardTitle>
        {props.product.name}
        </CardTitle>

        <CardSubtitle>
            {props.product.description}
        </CardSubtitle>
        <Link to={`/product_details/${props.product._id}`} className='btn text-white btn-primary btn-block'>Details</Link>
        </CardBody>
    </Card>
    )}
