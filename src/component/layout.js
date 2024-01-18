import React from "react";

import HomePage from "./HomePage";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
    return (
        
            
        <div className="">
      
         <HomePage />
         <Footer />
        </div>
      
        
    );
}
export default Layout;