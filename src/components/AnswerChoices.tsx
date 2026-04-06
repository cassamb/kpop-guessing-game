import React, { useEffect, useState } from "react";
import { fetchName } from "../helpers/loader";

interface AnswerChoicesProps {
  choices: number[];
  correctAnswer?: string;
}

const AnswerChoices = ({choices, correctAnswer}: AnswerChoicesProps) => {
  const [ names, setNames ] = useState<string[]>([]);

  const convert = async (choices: number[]): Promise<void> => {
    let names: string[] = [];

    for (var i: number = 0; i < choices.length; i++) {
      const name = await fetchName(choices[i]);
      names.push(name);
    }
    
    setNames(names);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.remove("neutral");
    
    if (e.currentTarget.value == correctAnswer) e.currentTarget.classList.add("correct");
    else e.currentTarget.classList.add("incorrect"); 
    
    disableButtons();
  };

  const disableButtons = () => {
    for (let i: number = 0; i < 4; i++) {
      let btn = document.getElementById("button-" + i) as HTMLButtonElement;
      btn.disabled = true;
    }
  }

  useEffect (() => {
    convert(choices);
  }, [choices]);
  
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3.5 items-center sm:grid-cols-4 sm:grid-rows-1 sm:gap-5 lg:gap-10">
      {names.map((name: string, index: number) => {
        return (
        <button key={index} id={`button-${index}`} value={name} onClick={checkAnswer} className="cursor-pointer w-22 h-10 text-sm rounded-xl transition-all duration-300 lg:w-32 lg:h-14 neutral">
          {name}
        </button>
        )})}
    </div>
  )
}

export default AnswerChoices