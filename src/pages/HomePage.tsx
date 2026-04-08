import kpop from "../assets/imgs/kpop.png";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="flex flex-col flex-1 justify-evenly items-center gap-4 md:flex-row-reverse md:px-8">
      <div className="w-3/4 max-w-sm">
        <img src={kpop} alt="Finger hearts" />
      </div>

      <div className="font-medium text-sm w-5/6 max-w-md md:text-base xl:text-lg">
        <h1 className="text-2xl md:text-4xl xl:text-6xl">Welcome,</h1>
        <p className="font-normal my-2 md:my-4">This is the Kpop Guessing Game where you'll be testing your knowledge of the most popular groups across various generations of the genre. Whether you've been into Kpop for years or this is your introduction to the genre, everyone is encouraged to try the quiz out.</p>
        <p className="mb-8">Now, without further ado let's get started!</p>

        <div className="w-26 h-12 flex justify-center items-center bg-white rounded-xl shadow-xl md:w-30 md:h-14 transition-all hover:-translate-y-0.5">
          <NavLink to="/quiz" className="text-primary-med font-semibold md:text-base">Start Quiz</NavLink>
        </div>
        
      </div>
    </section>    
  )
}

export default HomePage