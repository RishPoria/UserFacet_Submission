import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";

const Search = () => {
  localStorage.clear();
  const stext = JSON.parse(localStorage.getItem("stext"));
  const p_data = JSON.parse(localStorage.getItem("p_data"));
  const [searchText, setSearchText] = useState(stext ? stext : "");
  const [content, setContent] = useState(p_data ? p_data : []);

  const fetchSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!searchText) {
      setContent([]);
      return;
    }
    if (
      97 <= searchText.toLowerCase().charCodeAt(0) &&
      searchText.toLowerCase().charCodeAt(0) < 123
    ) {
      fetch(`https://datausa.io/api/data?drilldowns=State&measures=Population`)
        .then((response) => response.json())
        .then((response) => {
          setContent(
            response.data.filter(
              (item) => item.State.toLowerCase() === searchText.toLowerCase()
            )
          );
          localStorage.setItem("p_data", JSON.stringify(content));
        });
    } else {
      fetch(
        `https://datausa.io/api/data?drilldowns=State&measures=Population&year=${searchText}`
      )
        .then((response) => response.json())
        .then((response) => {
          setContent(response.data);
          localStorage.setItem("p_data", JSON.stringify(content));
        });
    }
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line
  });

  return (
    <div>
      <form className="search" onSubmit={(e) => fetchSearch(e)}>
        <TextField
          className="searchBox"
          label="State / Year"
          variant="outlined"
          defaultValue={stext ? stext : ""}
          onChange={(e) => setSearchText(e.target.value.trim())}
        />
      </form>
      <table>
        <tbody>
          <tr>
            <th>ID State</th>
            <th>State</th>
            <th>Year</th>
            <th>Population</th>
            <th>Slug State</th>
          </tr>
          {content.map((item) => (
            <tr key={item["ID State"] + item["Year"]}>
              <td>{item["ID State"]}</td>
              <td>{item.State}</td>
              <td>{item.Year}</td>
              <td>{item.Population}</td>
              <td>{item["Slug State"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
