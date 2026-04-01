import styles from "../css/SearchResults.module.css";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { useMemo, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import { sortResults } from "../utils/sorting";

const SearchResults = ({ data,page }) => {
  const [filterRating, setFilterRating] = useState(0); // 0: none, 1: asc, 2: desc
  const [filterDeparture, setFilterDeparture] = useState(0);
  const [filterPrice, setFilterPrice] = useState(0);
 
  const filterStates = [null, "asc", "desc"];

  const sortRules = useMemo(() => [
    { key: "rating", order: filterStates[filterRating] },
    { key: "departureTime", order: filterStates[filterDeparture], type: "time" },
    { key: "price", order: filterStates[filterPrice] },
  ], [filterRating, filterDeparture, filterPrice]);

  const results = useMemo(() => {
    if (filterRating === 0 && filterDeparture === 0 && filterPrice === 0) {
      return data;
    }
    return sortResults(data, sortRules);
  }, [data, sortRules, filterRating, filterDeparture, filterPrice]);

  const toggleFilter = (current) => (current + 1) % 3;

  const handleFilter = (filterName) => {
    if (filterName === "RATING") setFilterRating(toggleFilter);
    if (filterName === "DEPARTURE") setFilterDeparture(toggleFilter);
    if (filterName === "PRICE") setFilterPrice(toggleFilter);
  };

  const renderSortIcon = (state) => {
    if (state === 1) return <FaLongArrowAltUp />;
    if (state === 2) return <FaLongArrowAltDown />;
    return null;
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={`row ${styles.innerWrapper}`}>
        <div className={`col ${styles.rightWrapper}`}>
          <div className={`row bgWhite borderRadius24 ${styles.filterWrapper}`}>
            <div className={`col-6 bold`}>
              {data.length} {page=="bus"?"buses":"trains"} found
            </div>
            <div className="col-6 displayFlex">
              <div className="col-2 bold700">Sort By:</div>
              <div
                className={`col-3 bold500 pointer ${styles.filter}`}
                onClick={() => handleFilter("RATING")}
              >
                Ratings {renderSortIcon(filterRating)}
              </div>
              <div
                className={`col-5 bold500 pointer ${styles.filter}`}
                onClick={() => handleFilter("DEPARTURE")}
              >
                Departure time {renderSortIcon(filterDeparture)}
              </div>
              <div
                className={`col-2 bold500 pointer ${styles.filter}`}
                onClick={() => handleFilter("PRICE")}
              >
                Price {renderSortIcon(filterPrice)}
              </div>
            </div>
          </div>
          {results.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
