import { FaLightbulb } from "react-icons/fa";
import { BiSkipNext } from "react-icons/bi";
import { useState, useEffect } from "react";
import { populateQuestions, updateChoices } from "../helpers/quiz";
import AnswerChoices from "../components/AnswerChoices";

interface GroupData {
  id: number;
  name: string;
  url: string;
}

let questionOrder: number[];
const totalQuestions: number = 6;

const QuizPage = () => {
  const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);
  const [ isFinished, setIsFinished ] = useState<boolean>(false);
  const [ group , setGroup] = useState<GroupData | undefined>();
  const [ choices, setChoices ] = useState<number[]>([]);

  const updateQuiz = async (id: number): Promise<void> => { 
    const res = await fetch(`http://localhost:3000/groups/${id}`); 
    const data = await res.json();
    setGroup(data);
    setChoices(updateChoices(id, totalQuestions)); 
  };

  const resetButtons = () => {
    for (let i: number = 0; i < 4; i++) {
      let btn = document.getElementById("button-" + i) as HTMLButtonElement;
      btn.disabled = false;
      
      if (btn.classList.contains("correct")) btn.classList.remove("correct");
      else if (btn.classList.contains("incorrect")) btn.classList.remove("incorrect");
      else if (btn.classList.contains("eliminated")) btn.classList.remove("eliminated");
      
      if (!btn.classList.contains("neutral")) btn.classList.add("neutral");
    }
  };

  const next = () => {
    setCurrentQuestion(prevCount => prevCount + 1);
    resetButtons();
  };

  useEffect (() => {
    if (currentQuestion == totalQuestions) setIsFinished(true);
    else {
      if (currentQuestion === 0) questionOrder = (populateQuestions(totalQuestions));
      updateQuiz(questionOrder[currentQuestion]);
    }
  }, [currentQuestion]);

  return (
    <>
    {!isFinished ? (
      <section className="flex flex-col flex-1 items-center justify-between gap-6 text-center font-semibold">
        <button className="cursor-pointer shadow self-start flex justify-center items-center h-12 w-12 font-bold text-hint-dark bg-hint rounded-full transition-all duration-300 hover:-translate-y-1">
          <FaLightbulb className="lg:text-lg"/>
        </button>

        <h2 className="text-3xl lg:text-5xl">Question #{currentQuestion + 1}</h2>
        <div className="w-2/3 max-w-md rounded-xl overflow-hidden">
          <img src={group?.url} className="w-full" alt="" />
        </div>
        <p className="lg:text-lg">What is the name of the group shown above?</p>

        <AnswerChoices choices={choices} correctAnswer={group?.name}/>

        <button onClick={next} className="flex justify-center items-center cursor-pointer self-end font-bold bg-primary-light text-primary-dark px-5 py-3 rounded-full transition-all duration-300 hover:-translate-y-1">
          Skip |
          <BiSkipNext className="text-3xl"></BiSkipNext>
        </button>
      </section>
    ) : (
      <div>EndingPage</div>
    )}
    </>
  )
}

export default QuizPage