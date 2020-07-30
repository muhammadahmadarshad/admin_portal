import React, { Component } from 'react';
import './Sidebar.css'
import {Nav,NavItem,NavLink} from 'reactstrap';
import classNames from 'classnames'
import SubMenu from './Submenu'
export default class Sidebar extends Component {
  render() {
    return (
    
      <div className={classNames('sidebar',{'is-open':this.props.isOpen}
      )} >
      <div className='sidebar-header' >
        <span color="info" onClick={this.props.toggle} style={{color: '#fff'}}>&times;</span>
        <h3>Admin Console</h3>
      </div>
      <div className='side-menu'>
        <Nav vertical className="list-unstyled pb-3">
          <SubMenu title="Shop Products"  items={submenus[0]}/>
          <SubMenu title="Orders"  items={submenus[1]}/>
          <SubMenu title="Nutritionists"  items={submenus[2]}/>
        </Nav>        
      </div>
    </div>
      
    );
  }
}


const submenus = [
  [
    {
      title: "Add Product",
      target: "/add_product"
    },
    {
      title: "Search Products",
      target: "/search_product",        
    },
    {
      title: "All Products",
      target: "/all_products/1",      
    },

  ],
  [
    {
      title: "Pending Orders",
      target: "/product-pending-orders/",      
    },
    {
      title: "Completed Orders",
      target: "/product-complete-orders/",      
    },
    {
      title: "Search Orders",
      target: "/search_order/",      
    }
  ],[
    {title:'Add Nutritionist',
    target:'/add_nutritionist'
    },
    {title:"Nutritionist List",
    target:"/nutritionist_list"
  
  }


  ]
]