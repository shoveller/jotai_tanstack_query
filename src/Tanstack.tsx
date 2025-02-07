import { useEffect, useState } from "react";
import "./App.css";
import { Api, PaginatedPokemonSummaryList } from "./sdk/api";
import { useQuery } from "@tanstack/react-query";

const sdk = new Api({
  // baseURL: "https://pokeapi.co/api/v2",
});

sdk.instance.interceptors.response.use((res) => {
  console.log("인터셉트!");
  return res;
});

// const instance = axios.create({
//   baseURL: "https://pokeapi.co/api/v2",
// });

function App() {
  const [data, setData] = useState<PaginatedPokemonSummaryList>([]);
  const [page, setPage] = useState(0);
  useQuery({
    queryKey: ["pokemonlist"],
    queryFn: () =>
      sdk.api.pokemonList({
        limit: 10,
        offset: page * 10,
      }),
  });

  useEffect(() => {
    const offset = page * 10;
    sdk.api
      .pokemonList({
        limit: 10,
        offset,
      })
      .then((res) => {
        setData(res.data);
      });

    // instance.get(`/pokemon?limit=10&offset=${offset}`).then((res) => {
    //   setData(res.data);
    // });
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
