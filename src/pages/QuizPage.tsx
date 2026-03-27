import groups from "../data/groups.json";
import { FaLightbulb } from "react-icons/fa";
import { BiSkipNext } from "react-icons/bi";
import Button from "../components/Button";

const QuizPage = () => {
  return (
    <>
    <section className="flex flex-col flex-1 items-center justify-between gap-6 text-center font-semibold">
      <button className="cursor-pointer shadow self-start flex justify-center items-center h-12 w-12 font-bold text-hint-dark bg-hint rounded-full transition-all duration-300 hover:-translate-y-1">
        <FaLightbulb className="lg:text-lg"/>
      </button>

      <h2 className="text-3xl lg:text-5xl">Question #</h2>
      <div className="w-2/3 max-w-md rounded-xl overflow-hidden">
        <img src={groups[3].url} className="w-full" alt="" />
      </div>
      <p className="lg:text-lg">What is the name of the group shown above?</p>

      <div className="grid grid-cols-2 grid-rows-2 gap-3.5 items-center sm:grid-cols-4 sm:grid-rows-1 sm:gap-5 lg:gap-10">
        <Button>{groups[0].name}</Button>
        <Button>{groups[1].name}</Button>
        <Button>{groups[2].name}</Button>
        <Button>{groups[3].name}</Button>
      </div>

      <button className="flex justify-center items-center cursor-pointer self-end font-bold bg-primary-light text-primary-dark px-5 py-3 rounded-full transition-all duration-300 hover:-translate-y-1">
        Skip |
        <BiSkipNext className="text-3xl"></BiSkipNext>
      </button>
    </section>
    </>
  )
}

export default QuizPage