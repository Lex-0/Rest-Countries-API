import React from "react";
import "../styles.css";

function HomePage({
  theme,
  name,
  region,
  capital,
  population,
  flag,
  showDetails, 
  code,
}) {
  const showDetailsHandler = () => {
    showDetails(code);
  };

  return (
    <div
      className={`countris ${theme === "dark" ? "dark" : ""}`}
      onClick={showDetailsHandler}
    >
      <img src={flag} alt={name} className="country-img" />
      <div className={`info ${theme === "dark" ? "dark" : ""}`}>
        <h3>{name}</h3>

        <p>
          Population:
          <span>{population}</span>
        </p>
        <p>
          Region:
          <span>{region}</span>
        </p>
        <p>
          Capital:
          <span>{capital}</span>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
