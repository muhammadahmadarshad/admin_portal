import React from 'react';
import './App.css';
import {Switch,BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Login from '../src/Components/Login/Login'
import PrivateRoute from './PrivateRoute';
import Dashboard from './Components/Dashboard/Dashboard';
import AddProduct from './Components/Products/AddProduct';
import Products from './Components/Products/AllProducts';
import ProductsDetails from './Components/Products/ProductDetails';
import Search_Products from './Components/Products/Search_Products';
import Orders from './Components/Products/Orders';
import Pending_Orders from './Components/Orders/Pending-Orders';
import DispatchedOrders from './Components/Orders/Dispatched_Orders';
import OrderDetails from './Components/Orders/OrderDetails';
import SearchOrder from './Components/Orders/SearchOrder';
import AddNutritionist from './Components/Nutritionist/AddNutritionist';
import NutritionistList from './Components/Nutritionist/NutritionistList';
import DietPlanOrders from './Components/DietPlanOrders/DietPlanOrders';
import DietPlanOrderDetails from './Components/DietPlanOrders/DietPlanOrderDetails';
import Password from './Components/resetPassword/Password'
import ChangePassword from './Components/resetPassword/Change-Password';
import NutritionistDetails from './Components/Nutritionist/NutrinistDetails';
function App() {
  

  return (
    <div >
      <Router>
        <Switch>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/forgotPassword' component={Password}></Route>
          <PrivateRoute path='/dashboard' component={Dashboard}></PrivateRoute>
          <PrivateRoute path='/add_product' component={AddProduct}></PrivateRoute>
          <PrivateRoute path="/all_products/:page" component={Products} />
          <PrivateRoute path="/product_details/:id" component={ProductsDetails}></PrivateRoute>
          <PrivateRoute path='/search_product/:query?/:page?' component={Search_Products} />
          <PrivateRoute path='/product-orders/:page' component={Orders} ></PrivateRoute>
          <PrivateRoute path='/product-pending-orders/:page?'  component={Pending_Orders}/>
          <PrivateRoute path='/product-complete-orders/:page?'  component={DispatchedOrders}/>
          <PrivateRoute path='/product-order-details/:product_id' component={OrderDetails}/>
          <PrivateRoute path='/search_order' component={SearchOrder}/>
          <PrivateRoute path='/add_nutritionist' component={AddNutritionist}/>
          <PrivateRoute path='/nutritionist_list/:page?' component={NutritionistList}/>
          <PrivateRoute path='/diet_plan_orders/:page?' component={DietPlanOrders}></PrivateRoute>
          <PrivateRoute path='/diet_plan_order_details/:id' component={DietPlanOrderDetails} />
          <PrivateRoute path='/change_password'  component={ChangePassword}/>
          <PrivateRoute path='/nutrtionist_profile/:id' component={NutritionistDetails}/>
          <Redirect to='/dashboard' />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
