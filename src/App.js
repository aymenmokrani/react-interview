import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button, Col, Pagination, Row, Select } from "antd";
import MovieCard from "./components/movie-card/MovieCard";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { setCategories, likeMovie } from "./redux/actions/moviesActions";
import { useSelector } from "react-redux";

const { Title } = Typography;

function App() {
  const dispatch = useDispatch();
  const myMovies = useSelector((state) => state.moviesReducer.movies);
  const uniqueCategories = [...new Set(myMovies.map((elem) => elem.category))];
  dispatch(setCategories(uniqueCategories));
  const [displayedMovies, setDisplayedMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setDisplayedMovies(myMovies);
    setCurrentPage(1);
  }, [myMovies]);

  // ON CHANGE CATEGORY
  const categoryChange = (value) => {
    console.log("category change launched");
    value === "all"
      ? setDisplayedMovies(myMovies)
      : setDisplayedMovies(
          myMovies.filter((element) => element.category == value)
        );
    setCurrentPage(1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = displayedMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  return (
    <div className="App">
      <div className="container">
        <Title className="title">React Interview</Title>

        <div className="filter-block">
          <div className="filter-category">
            <label>Categories</label>
            <Select
              defaultValue="all"
              value={selectedCategory}
              style={{ width: 150 }}
              onChange={(value) => {
                categoryChange(value);
                setSelectedCategory(value);
              }}
            >
              <Select.Option value="all">All</Select.Option>
              {uniqueCategories.map((category) => (
                <Select.Option value={category} key={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="filter-number-cards">
            <label htmlFor="">Number of Cards</label>
            <Select
              defaultValue="4"
              onChange={(value) => {
                setMoviesPerPage(value);
                setCurrentPage(1);
              }}
            >
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="8">8</Select.Option>
              <Select.Option value="12">12</Select.Option>
            </Select>
          </div>
        </div>
        <div className="content">
          {currentMovies.map((element) => (
            <MovieCard
              setSelectedCategory={setSelectedCategory}
              key={element.id}
              elements={element}
              dispatch={dispatch}
            />
          ))}
        </div>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          onChange={(value) => {
            console.log(value);
            setCurrentPage(value);
          }}
          total={Math.floor((displayedMovies.length / moviesPerPage) * 10)}
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
}

export default App;
