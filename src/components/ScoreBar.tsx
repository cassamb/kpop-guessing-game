export const updateScoreBar = (score: number) => {
  if (score > 100) score = 100;
  
  const scoreBar = document.getElementById("fill") as HTMLDivElement;
  scoreBar.style.width = score + "%";
  scoreBar.textContent = score + "%";
}

const ScoreBar = () => {
  return (
    <div className="shadow bg-primary w-1/2 rounded overflow-hidden transition-all duration-300">
      <div id="fill" className="bg-primary-med w-1/5 text-primary text-center">0%</div>
    </div>
  )
}

export default ScoreBar