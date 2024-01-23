import { Link } from "react-router-dom";

export default function sideBar(){
    return( 
            <div className="sideBar">
                <Link to="/dashboard/users" className="item-link">   users  </Link>
        
                <Link to="/dashboard/Files" className="item-link">   Files  </Link>
               
                <Link to="/dashboard/Upload" className="item-link">   Upload  </Link>
              

            </div>
            )

}