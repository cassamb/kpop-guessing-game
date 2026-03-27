interface ButtonProps {
    children: React.ReactNode;
}

const Button = ({children}: ButtonProps) => {
  return (
    <button className="cursor-pointer bg-primary text-primary-med w-22 h-10 text-sm rounded-xl transition-all duration-300 hover:-translate-y-1 lg:w-32 lg:h-14">
        {children}
    </button>
  )
}

export default Button