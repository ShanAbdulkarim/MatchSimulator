import { Outlet, Link } from "react-router-dom";

function Nav(){
    return(
        <div>
            <div className="flexBoxNav">
            <Link className="navItem" to = "/"> Home </Link>
            <Link className="navItem" to = "/newGame"> New Game</Link>
            <Link className="navItem" to = "/randomGame"> Random Game</Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Nav