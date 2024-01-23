import TopBar from "./component/topbar"
import SideBar from "./component/sidebar"

import { Outlet } from "react-router-dom"


export default function Dashboard(){
    return( <div>
                
                <TopBar/>
                
                <div className="content-flex">
                <SideBar/>
   
                <div style={{width:"80%" , padding:"20px"}}>
                <Outlet/>
                
                
                </div>
                </div>
             </div>)
}