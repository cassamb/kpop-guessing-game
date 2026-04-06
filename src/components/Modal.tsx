interface ModalProps {
    children: React.ReactNode;
    title?: string;
    warning: string;
}

const Modal = ({children, title="Are You Sure?", warning}: ModalProps) => {

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-9/10 bg-white p-6 flex flex-col gap-3.5 max-w-md rounded-xl shadow text-primary-dark">
        <div className="flex justify-between border-b border-b-primary/50 pb-2">
            <h2 className="font-semibold text-2xl">{title}</h2>
        </div>
        
        <p className="text-primary-med text-sm font-medium md:text-base">{warning}</p>
        <div className="flex justify-around text-xs md:text-sm">
            {children}
        </div>
    </div>
  )
}

export default Modal