import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CgArrowLongLeft } from "react-icons/cg";
import "../Details.css";

function Details({ countries, theme }) {
  const [country, setCountry] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [borders, setBorders] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.countryName}`);
        if (response.status === 200) {
          const data = await response.json();
          setCountry(data[0]);
        } else {
          navigate('/BEL');
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
  
    getCountryByName(); 
  }, [params.countryName, navigate]); 
  

  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (country?.currencies) {
      const curr = Object.keys(country.currencies).map((currencyCode) => {
        const currency = country.currencies[currencyCode];
        return currency.name;
      });
      setCurrencies(curr);
    }

    if (country?.languages) {
      const langs = Object.keys(country.languages).map((languageCode) => {
        return country.languages[languageCode];
      });
      setLanguages(langs);
    }

    if (country?.borders) {
      const brd = Object.keys(country.borders).map((borderCode) => {
        return country.borders[borderCode];
      });
      setBorders(brd);
    }
  }, [country]);

  if (!country) return <div className="loader">Cargando...</div>;

  return (
    <div className={`content-Details ${theme === "dark" ? "dark-alt" : ""}`}>
      <div
        className={`content-Details-Country ${
          theme === "dark" ? "dark-alt" : ""
        } `}
      >
        <button
          onClick={goBack}
          className={`btn-Back ${theme === "dark" ? "dark" : ""}`}
        >
          <CgArrowLongLeft className="arrow" />
          <p>Back</p>
        </button>
        <div className={`content-info ${theme === "dark" ? "dark-alt" : ""} `}>
          <img
            src={country.flags.png}
            alt={country.flags.alt}
            className="flag-details"
          />

          <div className={`contentt ${theme === "dark" ? "dark-alt" : ""} `}>
            <div className="details">
              <div className="details-left">
                <h4>{country.name.common}</h4>
                <p className="values">
                  Native Name:
                  <span>{country.name.common}</span>
                  <span>{country.nativeName}</span>
                </p>
                <p className="values">
                  Population:
                  <span>{country.population}</span>
                </p>
                <p className="values">
                  Region:
                  <span>{country.region}</span>
                </p>
                <p className="values">
                  Subregion:
                  <span>{country.subregion}</span>
                </p>

                <p className="values">
                  Capital:
                  <span>{country.capital}</span>
                </p>
              </div>
              <div className="details-right">
                <p className="values">
                  Top Level Domain
                  <span>{country.tld}</span>
                  <span>{country.topLevelDomain}</span>
                </p>
                <p className="values">
                  Currencies:
                  <span>{currencies}</span>
                </p>
                <p className="values">
                  Languages:
                  {languages.map((languageCountry, index) => (
                    <span key={index}>{languageCountry}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className="pp">
              Boder Countries:
              <div className="borders">
                {borders.length > 0 ? (
                  borders.map((borderCountry, index) => (
                    <button
                      key={index}
                      className={`border ${theme === "dark" ? "dark" : ""}`}
                    >
                      {borderCountry}
                    </button>
                  ))
                ) : (
                  <div>
                    <span className="valuess">No border...</span>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
