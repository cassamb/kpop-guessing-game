import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaTimes, FaHome, FaInfoCircle } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { useState } from "react";
import Modal from "./Modal";
import ScoreBar from "./ScoreBar";

interface LinkClassProps {
    isActive: boolean;
}

interface ActiveQuizProps {
    activeQuiz: boolean;
}

const Navbar = ({activeQuiz}: ActiveQuizProps) => {
    const [ showMobileMenu, setShowMobileMenu ] = useState<boolean>(false);
    const [ showModal, setShowModal] = useState<boolean>(false);

    // Styling for active and inactive navigation links for all viewports
    const navLinkClass = ({isActive} : LinkClassProps): string => isActive ? "border-b-4 leading-relaxed" : "hover:border-b-4 leading-relaxed transition-all duration-200";
    const mobileLinkClass = ({isActive} : LinkClassProps): string => isActive ? (
        "block flex items-center gap-2 w-full text-center px-5 py-4 text-base font-medium bg-primary-med text-primary-light"
    ) : (
        "block flex items-center gap-2 w-full text-center px-5 py-4 text-base font-medium border-t border-primary-med hover:bg-primary-med hover:text-primary-light"
    );
    
    return (
    <header className="relative w-9/10 max-w-6xl text-primary-med font-semibold bg-primary-light">
        <nav className="flex justify-between items-center">
            <h2 className="text-4xl tracking-tighter xl:text-5xl">KGG</h2>
            
            { activeQuiz ? (
                <>
                    {/* Reduced/Minimized Navbar display when quiz is active; user can only navigate back to HomePage */}
                    <ScoreBar/>
                    <FaHome onClick={() => setShowModal(true)} className="cursor-pointer text-3xl text-warning-dark hover:border-b-4 leading-relaxed transition-all duration-200"/>

                    {showModal && (
                        <div onClick={() => setShowModal(false)} className="fixed bg-black/50 min-h-screen z-9 w-screen flex justify-center items-center top-0 left-0">
                            <Modal warning="If you exit the quiz now, all of your progress will be lost and you will be returned to the Home Page.">
                                <NavLink to="/" className="cursor-pointer bg-primary text-primary-med text-center px-4 py-2.5 rounded-xl font-semibold transition-transform hover:-translate-y-0.5">Return Home</NavLink>
                                <button onClick={() => setShowModal(false)} className="bg-warning text-warning-dark text-center px-4 py-2.5 rounded-xl font-semibold transition-transform hover:-translate-y-0.5">Continue Quiz</button>
                            </Modal>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Expanded Navbar display when quiz is inactive; user can navigate to HomePage, InstructionsPage, and StudyGuidePage */}
                    
                    {/* Updating the mobile menu toggle state and icons based on user interaction */}
                    <button onClick={() => setShowMobileMenu((prevState => !prevState))} className="md:hidden cursor-pointer z-20">
                        {showMobileMenu ? <FaTimes className="text-3xl"/> : <IoMdMenu className="text-3xl"/>}
                    </button>

                    {/* Navigation links for larger viewports */}
                    <div className="hidden md:visible md:flex md:gap-10 text-xl xl:text-2xl">
                        <NavLink to="/" className={navLinkClass}>Home</NavLink>
                        <NavLink to="/instructions" className={navLinkClass}>Instructions</NavLink>
                        <NavLink to="/study-guide" className={navLinkClass}>Study Guide</NavLink>
                    </div>

                    {/* Navigation links for mobile */}
                    {showMobileMenu ? (
                        <div onClick={() => setShowMobileMenu(false)} className="fixed bg-black/50 min-h-screen z-9 w-screen flex justify-center items-center top-0 left-0 sm:hidden">
                            <div onClick={(e) => e.stopPropagation()} className="fixed bg-primary-light rounded-l-xl overflow-y-hidden z-10 top-0 right-0 w-3/4 min-h-screen flex flex-col items-center pt-20 transition-all duration-500 ease-in">
                                <NavLink to="/" className={mobileLinkClass}><FaHome/>Home</NavLink>
                                <NavLink to="/instructions" className={mobileLinkClass}><FaInfoCircle/>Instructions</NavLink>
                                <NavLink to="/study-guide" className={mobileLinkClass}><ImBooks/>Study Guide</NavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="fixed bg-black/50 min-h-screen z-9 w-screen flex justify-center items-center top-0 -right-full sm:hidden">
                            <div className="fixed bg-primary-light rounded-l-xl overflow-y-hidden z-10 top-0 -right-full w-3/4 min-h-screen flex flex-col items-center pt-20 transition-all duration-500 ease-in">
                                <NavLink to="/" className={mobileLinkClass}><FaHome/>Home</NavLink>
                                <NavLink to="/instructions" className={mobileLinkClass}><FaInfoCircle/>Instructions</NavLink>
                                <NavLink to="/study-guide" className={mobileLinkClass}><ImBooks/>Study Guide</NavLink>
                            </div>
                        </div>
                    )}
                </>
            )}
        </nav>
    </header>
  )
}

export default Navbar