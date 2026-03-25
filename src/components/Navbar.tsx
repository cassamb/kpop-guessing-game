import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaTimes, FaHome, FaInfoCircle } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { useState } from "react";

interface LinkClassProps {
    isActive: boolean;
}

const Navbar = () => {
    const [ showMobileMenu, setShowMobileMenu ] = useState<boolean>(false);

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
            
            {/* Updating the mobile menu toggle state and icons based on user interaction */}
            <button onClick={() => setShowMobileMenu((prevState => !prevState))} className="md:hidden cursor-pointer z-20">
                {showMobileMenu ? <FaTimes className="text-3xl"/> : <IoMdMenu className="text-3xl"/>}
            </button>

            <div className="hidden md:visible md:flex md:gap-10 text-xl xl:text-2xl">
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/instructions" className={navLinkClass}>Instructions</NavLink>
                <NavLink to="/study-guide" className={navLinkClass}>Study Guide</NavLink>
            </div>

            {/* Showing mobile navigation links if the state variable is true */}
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
        </nav>
    </header>
  )
}

export default Navbar