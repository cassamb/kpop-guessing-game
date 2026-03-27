import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import ScoreBar from "../components/ScoreBar";
import MainContainer from "../components/MainContainer";

const QuizLayout = () => {
  return (
    <>
        <Navbar activeQuiz={true}/>
        {/* <ScoreBar/> */}
        <MainContainer>
            <Outlet/>
        </MainContainer>
    </>
  )
}

export default QuizLayout