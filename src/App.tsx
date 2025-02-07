import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const offset = page * 10;

    instance.get(`/pokemon?limit=10&offset=${offset}`).then((res) => {
      setData(res.data);
    });
  }, [page]);

  return (
    <>
      <div>{JSON.stringify(data)}</div>
      <button onClick={() => setPage(page - 1)}>-</button>
      <button onClick={() => setPage(page + 1)}>+</button>
    </>
  );
}

export default App;
