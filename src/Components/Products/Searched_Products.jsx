import React from 'react'
import Loading from '../Loading/Loading'
import Product from './Product'
import Paginate from './Paginate'
export default function SearchedProducts({loading,products,match,history,url}){
    console.log(products)
if(loading){



    return <Loading/>
}



else if(products['products'])
    {

        return (<div >
            <div className='row'>
            {
                products.products.map((item,index)=>{
                    return(
                        <div key={index} className='col-md-3 col-sm-6 col-12'>
                        <Product  product={item}/>
                        </div>
                    
                    )

                })
            }

            </div>
                <Paginate match={match} history={history} total_results={products.total_results} url={url}/>

        </div>)
    }
else {

    return <div>


        <h3 className='text-center text-danger'>404 Not Found</h3>
    </div>
}



}