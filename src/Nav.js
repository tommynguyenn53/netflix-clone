import React, { useEffect, useState } from 'react';
import './Nav.css'; // Importing CSS for styling the Nav component

function Nav() {
    // State to track whether the navbar should have a black background
    const [show, handleShow] = useState(false);

    // useEffect to handle scroll events and update the navbar's appearance
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY) {
                handleShow(true); // Show black background when user scrolls
            } else {
                handleShow(false); // Remove black background when at the top
            }
        };

        // Add a scroll event listener when the component mounts
        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className={`nav ${show && "nav__black"}`}>
            {/* Netflix logo */}
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />

            {/* Netflix user avatar */}
            <img
                className="nav__avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                alt="Netflix Avatar"
            />
        </div>
    );
}

export default Nav; // Exporting the Nav component for use in other parts of the app
