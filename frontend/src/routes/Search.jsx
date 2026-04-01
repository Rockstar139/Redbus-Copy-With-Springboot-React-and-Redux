import { useSelector, useDispatch } from "react-redux";
import NotFound from "../components/NotFound";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import styles from "../css/Search.module.css";
import { useState, useEffect } from "react";
import { fetchSearchResults } from "../store/thunks";
import LoadingSpinner from "../components/LoadingSpinner";

const Search = () => {
  // at load filter
  const page = useSelector((store) => store.prevPage);
  const busState = useSelector((store) => store.busState);
  const trainState = useSelector((store) => store.trainState);
  const localSearchValue = page === "bus" ? busState : trainState;
  ///over
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.results);
   const loading = useSelector((store) => store.loading);

  
  const [filter, setFilter] = useState(localSearchValue);

  useEffect(() => {
    if (filter) {
      dispatch(fetchSearchResults(filter));
    }
  }, [filter, dispatch]);

  const noOfResults = data?.length || 0;

  const search = (searchObj) => {
    setFilter(searchObj);
  };


  return (
    <>
      <SearchBar
        search={search}
        noOfResults={noOfResults}
        localSearchValue={localSearchValue}
        page={page}
      />
      {loading == true ? (
        <LoadingSpinner />
      ) : noOfResults >= 1 ? (
        <SearchResults page={page} data={data} />
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Search;
