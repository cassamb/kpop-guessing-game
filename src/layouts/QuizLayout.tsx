import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainContainer from "../components/MainContainer";

const QuizLayout = () => {
  return (
    <>
        <Navbar activeQuiz={true}/>
        <MainContainer>
            <Outlet/>
        </MainContainer>
    </>
  )
}

export default QuizLayout