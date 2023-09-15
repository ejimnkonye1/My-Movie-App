import React from "react";
import NowPlaying from "./NowPlaying";
import HomePage from "./HomePage";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
    return (
        
            
        <div className="">
         <Header />
         <HomePage />
        </div>
      
        
    );
}
export default Layout;