import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import LeftColumn from './LeftColumn/LeftColumn';
import LayOutCSS from './LayOut.module.css'

function LayOut(){
  return (
     <div className={LayOutCSS.PageContainer}>
        <LeftColumn></LeftColumn>
        <div className={LayOutCSS.MiddleContent}>
            <Header></Header>
            <Outlet></Outlet>
        </div>
     </div>
  );

}

export default LayOut

