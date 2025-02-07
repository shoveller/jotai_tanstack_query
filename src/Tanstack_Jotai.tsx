import { useEffect, useState } from "react";
import "./App.css";
import { Api, PaginatedPokemonSummaryList } from "./sdk/api";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

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

// 명사
const pageAtom = atom(0);
const offsetAtom = atom((get) => {
  const page = get(pageAtom);

  return page * 10;
});
const pokeListAtom = atomWithQuery((get) => {
  const offset = get(offsetAtom);

  return {
    queryKey: ["pokemonlist", offset],
    queryFn: () =>
      sdk.api.pokemonList({
        limit: 10,
        offset,
      }),
  };
});
const goldPokeListAtom = atom((get) => {
  const res = get(pokeListAtom);

  return {
    ...res,
    data: res?.data?.data?.results?.map((item) => {
      return {
        ...item,
        name: "금" + item.name,
      };
    }),
  };
});

function App() {
  const [page, setPage] = useAtom(pageAtom);
  const { data, isError, isLoading, error } = useAtomValue(goldPokeListAtom);

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
