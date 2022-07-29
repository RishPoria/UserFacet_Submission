import React, { useEffect, useState } from 'react';

const EntireData = () => {
  const all_data = JSON.parse(localStorage.getItem('all_data'))
  const [data, setData] = useState(all_data ? all_data: []);
  
  const fetchData = (URL) => {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
        localStorage.setItem('all_data', JSON.stringify(response.data));
      })
  }

  useEffect(() => {
   fetchData('https://datausa.io/api/data?drilldowns=State&measures=Population');}, []);  
   return (
    <table>
    <tbody>
    <tr>
        <th>ID State</th>
        <th>State</th>
        <th>Year</th>
        <th>Population</th>
        <th>Slug State</th>
    </tr>
    {data.map((item) => (
        <tr key={item['ID State'] + item['Year']}>
            <td>{item['ID State']}</td>
            <td>{item.State}</td>
            <td>{item.Year}</td>
            <td>{item.Population}</td>
            <td>{item['Slug State']}</td>
        </tr>
    ))}
    </tbody>
  </table>
)
}

export default EntireData;