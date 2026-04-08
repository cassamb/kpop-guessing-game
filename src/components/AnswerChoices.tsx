import React, { useEffect, useState } from "react";
import { fetchName } from "../helpers/loader";

interface AnswerChoicesProps {
  choices: number[];
  correctAnswer?: string;
}

// disables the answer choice with the given value (used for hint implementation)
export const eliminateChoice = (targetValue: string): void => {
  const eliminatedChoice = document.querySelector('[value="' + targetValue + '"]') as HTMLButtonElement;
  eliminatedChoice.classList.remove("neutral");
  eliminatedChoice.classList.add("eliminated");
  eliminatedChoice.disabled = true;
};

// highlights correct answer choice and disables other choices
export const showCorrectAnswer = (correctValue: string | undefined): void => {
  const correctChoice = document.querySelector('[value="' + correctValue + '"]') as HTMLButtonElement;
  correctChoice.classList.remove("neutral");
  correctChoice.classList.add("correct");

  disableAnswerChoices();
};

// resets answer choice buttons
export const resetAnswerChoices = (): void => {
  for (let i: number = 0; i < 4; i++) {
    let btn = document.getElementById("button-" + i) as HTMLButtonElement;
    btn.disabled = false;
    
    if (btn.classList.contains("correct")) btn.classList.remove("correct");
    else if (btn.classList.contains("incorrect")) btn.classList.remove("incorrect");
    else if (btn.classList.contains("eliminated")) btn.classList.remove("eliminated");
    
    if (!btn.classList.contains("neutral")) btn.classList.add("neutral");
  }
};

// disables answer choice buttons
const disableAnswerChoices = (): void => {
  for (let i: number = 0; i < 4; i++) {
    let btn = document.getElementById("button-" + i) as HTMLButtonElement;
    if (!btn.disabled) btn.disabled = true;
  }
};

const AnswerChoices = ({choices, correctAnswer}: AnswerChoicesProps) => {
  const [ names, setNames ] = useState<string[]>([]);

  // fetching answer choice values (names based on given ids)
  const getNames = async (choices: number[]): Promise<void> => {
    let names: string[] = [];

    for (var i: number = 0; i < choices.length; i++) {
      const name = await fetchName(choices[i]);
      names.push(name);
    }
    setNames(names);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.classList.remove("neutral");
    if (e.currentTarget.value != correctAnswer) e.currentTarget.classList.add("incorrect");
    showCorrectAnswer(correctAnswer);
  };

  useEffect (() => {
    getNames(choices);
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