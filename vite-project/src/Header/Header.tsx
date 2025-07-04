import HeaderCSS from './Header.module.css'
import { IoSearch } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";

function Header(){
    

    return(<div className={HeaderCSS.HeaderContainer}>
            <h1>AI Trading Bots</h1>
            <div className={HeaderCSS.RightContainer}>
             <IoSearch/>
             <MdOutlineEmail/>
             <FaRegBell />
             <FaRegMoon/>
             <span className={HeaderCSS.Sun}> <FaRegSun/> </span>
             <RxExit />
            </div>
          </div>)

}

export default Header