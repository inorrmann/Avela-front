import React, { useEffect, useState } from 'react';
import './Home.css';
import API from "../utils/API";
import Table from "react-bootstrap/Table";
import { FaRegThumbsUp } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Home() {

  const [movies, setMovies] = useState([]);
  const [addMovie, setAddMovie] = useState(false);
  const [newMovie, setNewMovie] = useState("");
  const [emptyNewMovie, setEmptyNewMovie] = useState(false);

  useEffect(() => {
    API.findMovies()
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => alert(err))
  }, []);

  const likeMovie = event => {
    const id = Number(event.currentTarget.id);
    const selectedMovie = movies.find(movie => movie.id === id);

    const newLikes = selectedMovie.likes + 1;

    API.likeMovie(id, newLikes)
      .catch(err => alert(err));

    API.findMovies()
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => alert(err))
  };

  const movieList = movies.map(movie =>
    <tr key={movie.id}>
      <td className="movie-name">{movie.movie_name}</td>
      <td className="number-likes">
        <div>
          {movie.likes}
        </div>
        <div className="like" onClick={likeMovie} id={movie.id}>
          <FaRegThumbsUp />
        </div>
      </td>
    </tr>
  );

  const handleClick = () => {
    setAddMovie(true);
  };

  const handleChange = event => {
    const { value } = event.target;
    setNewMovie(value);
    setEmptyNewMovie(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (newMovie !== "") {
      setEmptyNewMovie(false);
      API.addMovie(newMovie, 0)
        .catch(err => alert(err));

      API.findMovies()
        .then(res => {
          setMovies(res.data);
        })
        .catch(err => alert(err))

      setAddMovie(false);
    } else {
      setEmptyNewMovie(true);
    }
  };

  return (
    <div className="home">
      <h1>The Movie Store</h1>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th className="movie-name">Name</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {movieList}
        </tbody>
      </Table>

      {!addMovie &&
        <Button
          className="add-button"
          variant="secondary"
          onClick={handleClick}
        >
          Add a Movie
        </Button>
      }
      {addMovie &&
      <Form className="new-movie">
        <Form.Control
          placeholder="Add a movie name"
          onChange={handleChange}
        />
        <Button
          className="submit-movie"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      }
      {emptyNewMovie &&
      <p className="error-msg">
        Please enter a valid movie name before clicking submit.
      </p>
      }
    </div>
  );
}

export default Home;
