import React, { useState, useEffect } from 'react';
import axios from './axios'; // Importing the axios instance for API requests
import requests from "./Requests"; // Importing the API request endpoints
import './Banner.css'; // Importing the CSS file for styling the Banner component

function Banner(props) {
    // State to store the movie data
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        // Fetches a random Netflix Original movie to display in the banner
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals); // Fetch Netflix Originals
            // Randomly select a movie from the results
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)]);
            return request; // Optional: Return the request for debugging purposes
        }

        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // Function to truncate long text to a specified number of characters
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str; // Add "..." if the string exceeds the limit
    }

    return (
        <header
            className="banner"
            style={{
                // Inline styling for the banner background
                backgroundSize: "cover", // Ensure the background image covers the entire banner
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, // Dynamic background image
                backgroundPosition: "center center", // Center the background image
            }}
        >
            <div className="banner__contents">
                {/* Display the movie's title */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name} {/* Fallback to different title properties */}
                </h1>

                {/* Buttons for interacting with the banner */}
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                {/* Display the movie's description, truncated to 150 characters */}
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            {/* Fade effect at the bottom of the banner */}
            <div className="banner--fadeBottom" />
        </header>
    );
}

export default Banner; // Export the Banner component for use in other parts of the app
