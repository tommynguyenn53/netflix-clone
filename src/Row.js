import React, { useState, useEffect } from 'react';
import axios from './axios'; // Axios instance for API requests
import YouTube from 'react-youtube'; // React component for embedding YouTube videos
import movieTrailer from 'movie-trailer'; // Utility to find YouTube trailer URLs by movie title
import "./Row.css"; // Importing CSS for styling the Row component

const base_url = "https://image.tmdb.org/t/p/original"; // Base URL for movie images

function Row({ title, fetchUrl, isLargeRow }) {
  // State to store the list of movies fetched from the API
  const [movies, setMovies] = useState([]);
  // State to store the YouTube trailer URL
  const [trailerUrl, setTrailerUrl] = useState("");

  // useEffect to fetch movies from the API when the component mounts or fetchUrl changes
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); // Fetch movies using the fetchUrl prop
      setMovies(request.data.results); // Store the movie data in state
      return request; // Optional: Return the request for debugging purposes
    }
    fetchData(); // Call the fetchData function
  }, [fetchUrl]); // Re-run the effect when fetchUrl changes

  // Configuration options for the YouTube player
  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0, // Disable autoplay for the YouTube video
    },
  };

  // Function to handle clicking on a movie poster
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close the trailer if one is already open
    } else {
      // Attempt to find the trailer URL for the selected movie
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); // Extract the video ID from the URL
          setTrailerUrl(urlParams.get("v")); // Set the trailer URL in state
        })
        .catch((error) => console.log(error)); // Log any errors if the trailer URL cannot be found
    }
  };

  return (
    <div className="row">
      {/* Display the title of the movie row */}
      <h2>{title}</h2>

      {/* Container for movie posters */}
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id} // Use the movie ID as the unique key
              onClick={() => handleClick(movie)} // Add an onClick handler to fetch the trailer
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} // Apply different styling for large row
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} // Use either poster_path or backdrop_path based on isLargeRow
              alt={movie.name} // Alt text for the poster image
            />
          );
        })}
      </div>

      {/* Container for the YouTube trailer */}
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} {/* Render the YouTube component if trailerUrl exists */}
      </div>
    </div>
  );
}

export default Row; // Export the Row component for use in other parts of the app
