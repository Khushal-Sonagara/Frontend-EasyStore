import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/Login/LoginComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import Layout from './components/Layout/Layout';
import Billingsystem from './components/BillingSystem/BillingSystemComponent';
import InventoryManagementComponent from './components/InventoryManagement/InventoryManagementComponent';
import ProductList from './components/ProductList/ProductListcomponent';
// import HomeComponent from './components/Home/HomeComponent'
import CartComponent from './components/Cart/CartComponent';
import AddProduct from './components/AddProduct/AddProduct';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import SalesHistory from './components/SalesHistory/SalesHistory'
import SalesHistoryById from './components/SalesHistory/SalesHistoryById';
import EmployeeDetails from './components/Employee/EmployeeDetails';
import EmployeeDetail from './components/Employee/EmployeeDetail';
//import NotFound from './components/NotFound/NotFound';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser)
    if (storedUser && storedUser.isAdmin !== undefined) {
        setIsAdmin(storedUser.isAdmin);
    } else {
        setIsAdmin(false);
    }
}, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<Layout />}>
          {/* <Route path="/webapp-home" element={<HomeComponent />} /> */}
          <Route path="/" element={<EmployeeDetail />} />
          <Route path="/webapp-bill" element={<Billingsystem />} />
          <Route path="/webapp-cart" element={<CartComponent />} />
          <Route path="/webapp-inventory" element={<InventoryManagementComponent />} />
          <Route path="/webapp-product-list" element={<ProductList />} />
          {isAdmin && (
            <>
              <Route path="/webapp-dashboard" element={<DashboardComponent />} />
              <Route path="/webapp-sales-history" element={<SalesHistory />} />
              <Route path="/webapp-sales-history/:id" element={<SalesHistoryById />} />
              <Route path="/webapp-add-product" element={<AddProduct />} />
              <Route path="/webapp-user-details" element={<EmployeeDetails />} />
              <Route path="/webapp-update-product/:id" element={<UpdateProduct />} />
            </>
          )}
        </Route>
        {/* <Route path="*" element={<NotFound/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
