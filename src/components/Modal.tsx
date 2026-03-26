interface ModalProps {
    children: React.ReactNode;
}

const Modal = ({children}: ModalProps) => {

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-9/10 bg-white p-6 flex flex-col gap-3.5 max-w-md rounded-xl shadow text-primary-dark">
        <div className="flex justify-between border-b border-b-primary/50 pb-2">
            <h2 className="font-semibold text-2xl">Are You Sure?</h2>
        </div>
        
        <p className="text-primary-med text-sm md:text-base">If you exit the quiz now, all of your progress will be lost and you will be returned to the Home Page.</p>
        <div className="flex justify-around text-xs md:text-sm">
            {children}
        </div>
    </div>
  )
}

export default Modal