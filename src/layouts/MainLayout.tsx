import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainContainer from "../components/MainContainer";

const MainLayout = () => {
  return (
    <>
        <Navbar/>
        <MainContainer>
          <Outlet/>
        </MainContainer>
    </>
  )
}

export default MainLayout