import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import NutritionistTable from './NutrionistTable';
import Axios from 'axios';

export default function NutritionistList(props)  {

  const [isOpen,setOpen]=React.useState(false)
  const [loading,setLoading]=React.useState(true)
  const [err,setError]=React.useState(false)
  const [data,setData]= React.useState()
  let {page}= props.match.params

  let toggle=()=>{
      setOpen(!isOpen)
   }

   let get=()=>{
    setLoading(true)
    if(page===undefined){

        page=1
    }

    Axios({method:'GET',url:`http://localhost:5000/nutritionist/get_all/${page}`})
    .then(res=>{


        if(res.data.list.length===0){
            setError(true)
            setLoading(false)
        }
        else{
            setData(res.data)
            setLoading(false)
        }
    }).catch(()=>{

        setError(true)
        setLoading(false)

    })


   }

   let Blocked=(_id)=>{
        Axios({method:'put',url:`http://localhost:5000/nutritionist/block/${_id}`,headers:{'x-auth-token':localStorage.getItem('admin-token')}}).then(
            ()=>{

                get()
            }
        )




   }

   React.useEffect(get,[page])
  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>

        <div className="container">
            <NutritionistTable Block={Blocked} loading={loading} err={err} data={data} match={props.match} history={props.history} />
        </div>
 

       </div>


               
        
        </div>

    );
  
}
