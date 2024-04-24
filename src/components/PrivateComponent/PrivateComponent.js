import React from "react";
import {useNavigate,Outlet} from "react-router-dom";

const PrivateComponent=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    return auth?<Outlet/>:navigate("/login")
}

export default PrivateComponent