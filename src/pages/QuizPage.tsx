import { FaLightbulb } from "react-icons/fa";
import { BiSkipNext } from "react-icons/bi";
import { useState, useEffect } from "react";
import { shuffle, populateQuestions, updateChoices } from "../helpers/quiz";
import { fetchName } from "../helpers/loader";
import AnswerChoices, { showCorrectAnswer, resetAnswerChoices, eliminateChoice } from "../components/AnswerChoices";
import Modal from "../components/Modal";

interface GroupData {
  id: number;
  name: string;
  url: string;
}

let questionOrder: number[];
const totalQuestions: number = 6;
const totalHints: number = 3;

const QuizPage = () => {
  const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);
  const [ isFinished, setIsFinished ] = useState<boolean>(false);
  const [ group , setGroup] = useState<GroupData | undefined>();
  const [ choices, setChoices ] = useState<number[]>([]);
  const [ showModal, setShowModal] = useState<boolean>(false);
  const [ hints, setHints ] = useState<number[]>([]);
  const [ hintsUsed, setHintsUsed ] = useState<number>(0);
  const [ answerSelected, setAnswerSelected ] = useState<boolean>(false);

  // updates data for the current question
  const updateQuiz = async (id: number): Promise<void> => { 
    // fetching general data from API
    const res = await fetch(`http://localhost:3000/groups/${id}`); 
    const data = await res.json();
    setGroup(data);

    // generating answer choices
    const answers: number[] = updateChoices(id, totalQuestions);
    setChoices(answers);

    // generating and reseting hints
    const hintOrder: number[] = generateHints(id, answers);
    setHints(hintOrder);
    setHintsUsed(0);
  };
  
  const next = () => {
    setCurrentQuestion(prevCount => prevCount + 1);
    resetButtons();
  };

  // resets answer choices and hint button
  const resetButtons = (): void => {
    resetAnswerChoices();

    // reset hint button
    const hintButton = document.getElementById("hint-button") as HTMLButtonElement;
    hintButton.disabled = false;
  };

  const disableHints = (): void => {
    const hintButton = document.getElementById("hint-button") as HTMLButtonElement;
    hintButton.disabled = true;
  };

  const generateHints = (correctId: number, choices: number[]): number[] => {
    const result: number[] = choices.filter((choice: number) => choice != correctId);
    shuffle(result);
    return result;
  };

  const handleHint = async (): Promise<void> => {
    if (hintsUsed < totalHints) {
      const targetValue = await fetchName(hints[hintsUsed]);
      eliminateChoice(targetValue);

      if ((hintsUsed + 1) == hints.length) {
        disableHints();

        // highlight the correct answer button and disable it
        showCorrectAnswer(group?.name);
        setAnswerSelected(true);
      }
      setHintsUsed(prevCount => prevCount + 1);
    }
    setShowModal(false);
  };

  const answerSelectionListener = (e: PointerEvent): void => {
    const target = e.target as HTMLElement;

    if (target.id.includes("button-")) {
      setAnswerSelected(true);
      disableHints();
    }
  };

  useEffect (() => {
    document.addEventListener("click", answerSelectionListener);

    if (currentQuestion == totalQuestions) setIsFinished(true);
    else {
      if (currentQuestion === 0) questionOrder = (populateQuestions(totalQuestions));
      updateQuiz(questionOrder[currentQuestion]);
    }
  }, [currentQuestion]);

  return (
    <>
      { showModal && (
        <div onClick={() => setShowModal(false)} className="fixed bg-black/50 min-h-screen z-9 w-screen flex justify-center items-center top-0 left-0">
          { hintsUsed == 2 ? (
            <>
              <Modal warning={`You have ${totalHints - hintsUsed} hint remaining, using it will reveal the answer to the question. Would you still like to use it?`}>
                <button onClick={handleHint} className="correct cursor-pointer text-center px-4 py-2.5 rounded-xl font-semibold transition-transform hover:-translate-y-0.5">Yes, Show Answer</button>
                <button onClick={() => setShowModal(false)} className="incorrect text-center px-4 py-2.5 rounded-xl font-semibold transition-transform hover:-translate-y-0.5">No, Return to Quiz</button>
              </Modal>
            </>
          ) : (
            <>
              <Modal warning={`You have ${totalHints - hintsUsed} hints remaining, would you like to use one?`}>
                <button onClick={handleHint} className="neutral cursor-pointer text-center px-4 py-2.5 rounded-xl font-semibold transition-transform hover:-translate-y-0.5">Yes, Use Hint</button>
                <button onClick={() => setShowModal(false)} className="incorrect text-center px-4 py-2.5 rounded-xl font-semibold transition-transform hover:-translate-y-0.5">No, Return to Quiz</button>
              </Modal>
            </>
          )}
        </div>           
      )}

      { !isFinished ? (
        <section className="flex flex-col flex-1 items-center justify-between gap-6 text-center font-semibold">
          <button id="hint-button" onClick={() => setShowModal(true)} className="cursor-pointer shadow self-start flex justify-center items-center h-12 w-12 font-bold text-hint-dark bg-hint rounded-full transition-all duration-300 hover:-translate-y-1">
            <FaLightbulb className="lg:text-lg"/>
          </button>

          <h2 className="text-3xl lg:text-5xl">Question #{currentQuestion + 1}</h2>
          <div className="w-2/3 max-w-md rounded-xl overflow-hidden">
            <img src={group?.url} className="w-full" alt="" />
          </div>
          <p className="lg:text-lg">What is the name of the group shown above?</p>

          <AnswerChoices choices={choices} correctAnswer={group?.name}/>

          <button onClick={next} className="flex justify-center items-center cursor-pointer self-end font-bold bg-primary-light text-primary-dark px-5 py-3 rounded-full transition-all duration-300 hover:-translate-y-1">
            { answerSelected ? (<> Next | <BiSkipNext className="text-3xl"></BiSkipNext> </>) : <> Skip | <BiSkipNext className="text-3xl"></BiSkipNext> </> }
          </button>
        </section>
      ) : (
        <div>EndingPage</div>
      )}
    </>
  )
}

export default QuizPage