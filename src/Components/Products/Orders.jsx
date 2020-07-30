import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'


export default function Orders(props)  {

  const [isOpen,setOpen]=React.useState(false)

  let toggle=()=>{
      setOpen(!isOpen)
   }

  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
       </div>
       </div>)
       
    
}
