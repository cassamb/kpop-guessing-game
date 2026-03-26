import MainLayout from "./layouts/MainLayout";
import QuizLayout from "./layouts/QuizLayout";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import InstructionsPage from "./pages/InstructionsPage";
import StudyGuidePage from "./pages/StudyGuidePage";
import NotFoundPage from "./pages/NotFoundPage";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,

      children: [
        { index: true, element: <HomePage/> },
        { path: "/instructions", element: <InstructionsPage/> },
        { path: "/study-guide", element: <StudyGuidePage/> },
        { path: "*", element: <NotFoundPage/> },
      ],
    },
    {
      path: "/quiz",
      element: <QuizLayout/>,
      children: [
        { path: "", element: <QuizPage/> },
      ],
    },
  ]);

  return (<RouterProvider router={router}/>)
}

export default App
