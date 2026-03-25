interface MainContainerProps {
    children: React.ReactNode;
}

const MainContainer = ({children}: MainContainerProps) => {
  return (
    <main className='w-9/10 max-w-6xl rounded-2xl bg-primary-med text-primary flex-1 flex justify-center items-center'>
        {children}
    </main>
  )
}

export default MainContainer