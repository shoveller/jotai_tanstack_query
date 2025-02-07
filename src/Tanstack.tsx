import { useEffect, useState } from "react";
import "./App.css";
import { Api, PaginatedPokemonSummaryList } from "./sdk/api";
import { useQuery } from "@tanstack/react-query";

const sdk = new Api({
  // baseURL: "https://pokeapi.co/api/v2",
});

sdk.instance.interceptors.response.use((res) => {
  // throw new Error("200이지만 사실은 에러임");
  return res;
});

// const instance = axios.create({
//   baseURL: "https://pokeapi.co/api/v2",
// });

function App() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemonlist", page],
    queryFn: () =>
      sdk.api.pokemonList({
        limit: 10,
        offset: page * 10,
      }),
  });

  if (isLoading) {
    return <h1>로딩중</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <div>{JSON.stringify(data)}</div>
      <button onClick={() => setPage(page - 1)}>-</button>
      <button onClick={() => setPage(page + 1)}>+</button>
    </>
  );
}

export default App;
