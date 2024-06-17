import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const URL = `https://api.fda.gov/drug/drugsfda.json?search=${query}&count=openfda.generic_name.exact&limit=500`;

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await fetch(URL);
        const dataAPI = await response.json();
        setData(dataAPI);
      } catch (error) {
        console.log(error);
      }
    };
    getResults();
  }, [query]);

  console.log(query);
  console.log(data);

  return (
    <>
      <h1>Proyecto Jaraxa</h1>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
      />
      <ul>
        {data?.results ? (
          data.results.map((drug, index) => (
            <li key={index}>
              {drug.term} : {drug.count}
            </li>
          ))
        ) : (
          <p>No hay resultados</p>
        )}
      </ul>
    </>
  );
}

export default App;
