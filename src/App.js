import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavTheme from "./components/NavTheme";
import HomePage from "./Pages/HomePage";
import Details from "./Pages/Details";
import "./styles.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setselectedRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  const noCountries = countries.status || countries.message;

  useEffect(() => {
    try {
      fetchCountries();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();

    setCountries(data);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      fetchCountries();
    }
  };

  const handleSearch = (e) => {
    if (searchTerm.trim()) {
      const fetchSearch = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/name/${searchTerm}`
        );

        const data = await response.json();

        setCountries(data);
      };
      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchCountries();
    }
  };

  const handleRegion = async (e) => {
    const selectedRegion = e.target.value;
    setselectedRegion(selectedRegion);

    if (selectedRegion.trim()) {
      const fetchRegion = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/region/${selectedRegion}`
        );

        const data = await response.json();

        if (selectedRegion === "All") {
          try {
            fetchCountries();
          } catch (error) {
            console.log(error);
          }
          return;
        }

        setCountries(data);
      };
      try {
        fetchRegion();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showDetails = (code) => {
    navigate(`/${code}`);
  };

  return (
    <>
      <NavTheme handleTheme={handleTheme} theme={theme} />

      <Routes>
        <Route
          path="/"
          element={
            <div className={`content ${theme === "dark" ? "dark-alt" : ""}`}>
              <form className="contentSearch">
                <div className="contentInput">
                  <img
                    src="assets/lupa.svg"
                    className={`icon ${theme === "dark" ? "dark" : ""}`}
                    alt="icon"
                  />
                  <input
                    className={` ${theme === "dark" ? "dark" : ""}`}
                    placeholder="Search for a country..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleSearch}
                  />
                </div>
                <div className="check">
                  <select
                    className={`dropdown ${theme === "dark" ? "dark" : ""}`}
                    value={selectedRegion}
                    onChange={handleRegion}
                  >
                    <option value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania"> Oceania</option>
                  </select>
                </div>
              </form>
              <div
                className={`content-country ${
                  theme === "dark" ? "dark-alt" : ""
                }`}
              >
                {!noCountries ? (
                  countries.map((country, index) => (
                    <HomePage
                      key={index}
                      code={country.alpha3Code}
                      name={country.name}
                      capital={country.capital}
                      population={country.population}
                      region={country.region}
                      flag={country.flag}
                      showDetails={showDetails}
                      theme={theme}
                    />
                  ))
                ) : (
                  <h3>No countries found...</h3>
                )}
              </div>
            </div>
          }
        />

        <Route
          path="/:countryCode"
          element={
            <Details theme={theme} countries={countries}   />
          }
        />
      </Routes>
    </>
  );
}
