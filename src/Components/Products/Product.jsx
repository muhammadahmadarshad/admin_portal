import React from 'react';

import {Card,CardBody,CardImg,CardTitle,CardSubtitle} from 'reactstrap'
import { Link } from 'react-router-dom';

export default function Product(props)  {
    return (
     

    <Link className='text-decoration-none' to={`/product_details/${props.product._id}`}>
    <Card className='mt-2 shadow'> 
        <CardImg width='250' height='200' src={props.product.image.url}></CardImg>
        <CardBody>
        <CardTitle>
        {props.product.name}
        </CardTitle>

        <CardSubtitle>
            {props.product.description}
        </CardSubtitle>
   
        </CardBody>
        
    </Card>
    </Link>
    )}
