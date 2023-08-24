import React from "react";
import { useParams, useNavigate } from "react-router";
import { CgArrowLongLeft } from "react-icons/cg";
import "../Details.css";

function Details({ countries, theme }) {
  const params = useParams();
  const navigate = useNavigate();

  let name;
  let flagImg;
  let nativeName;
  let population;
  let region;
  let subregion;
  let capital;
  let topLevelDomain;
  let currencies = [];
  let languages = [];
  let borders = [];

  countries.forEach((country) => {
    if (country.alpha3Code === params.countryCode) {
      name = country.name;
      flagImg = country.flag;
      nativeName = country.nativeName;
      population = country.population;
      region = country.region;
      subregion = country.subregion;
      capital = country.capital;
      topLevelDomain = country.topLevelDomain;

      if (country.currencies) {
        Object.keys(country.currencies).forEach((currencyCode) => {
          const currency = country.currencies[currencyCode];
          currencies.push(currency.name);
        });
      }

      if (country.languages) {
        Object.keys(country.languages).forEach((languageCode) => {
          const language = country.languages[languageCode];
          languages.push(language.name);
        });
      }

      if (country.borders) {
        Object.keys(country.borders).forEach((borderCode) => {
          const border = country.borders[borderCode];
          borders.push(border);
        });
      }
    }
  });

  const goBack = () => {
    navigate("/");
  };

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
          <CgArrowLongLeft className="arrow"/>
          <p>Back</p>
        </button>
        <div className={`content-info ${theme === "dark" ? "dark-alt" : ""} `}>
          <img src={flagImg} alt={name} className="flag-details" />

          <div className={`contentt ${theme === "dark" ? "dark-alt" : ""} `}>
            <div className="details">
              <div className="details-left">
                <h4>{name}</h4>
                <p className="values">
                  Native Name:
                  <span>{nativeName}</span>
                </p>
                <p className="values">
                  Population:
                  <span>{population}</span>
                </p>
                <p className="values">
                  Region:
                  <span>{region}</span>
                </p>
                <p className="values">
                  Subregion:
                  <span>{subregion}</span>
                </p>

                <p className="values">
                  Capital:
                  <span>{capital}</span>
                </p>
              </div>
              <div className="details-right">
                <p className="values">
                  Top Level Domain:
                  <span>{topLevelDomain}</span>
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
                    <span className="values">No border...</span>{" "}
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
