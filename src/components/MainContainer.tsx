interface MainContainerProps {
    children: React.ReactNode;
}

const MainContainer = ({children}: MainContainerProps) => {
  return (
    <main className='w-9/10 max-w-6xl px-6 py-8 rounded-2xl bg-primary-med text-primary-light flex-1 flex flex-col'>
        {children}
    </main>
  )
}

export default MainContainer