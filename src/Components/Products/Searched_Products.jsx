import React from 'react'
import Loading from '../Loading/Loading'
import Product from './Product'
import Paginate from './Paginate'
export default function SearchedProducts({loading,products,match,history,url,err}){
if(loading){
    return <Loading/>
}

else if(err) {
    return <h1 className='text-center'>Products Not Found</h1>
}


else if(products['products'])

    {

        if(products.products.length>0){
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

        </div>)}
        else{

            return <h1 className='text-center'>Products Not Found</h1>

        }
    }
else {

    return <div>


    </div>
}



}