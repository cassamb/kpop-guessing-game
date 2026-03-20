import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
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
    }
  ]);

  return (<RouterProvider router={router}/>)
}

export default App
