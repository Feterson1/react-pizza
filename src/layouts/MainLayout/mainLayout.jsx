import React from "react";
import HeaderComponent from "../../components/Header/Header";
import { Outlet } from "react-router";


const MainLayout = () => {
    return (
        <div className="wrapper">
            <HeaderComponent/>
            <div className="content">
               <Outlet/>
            </div>
        </div>
    )

}

export default MainLayout;