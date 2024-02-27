"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

export interface Movies {
  id?: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

export function PopularMovies() {

  const [page, setPage] = useState<number>(1);
  const APIKEY = process.env.NEXT_PUBLIC_API_KEY;
  const FeaturedApi = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&language=pt-BR&page=${page}`;
  const getMovies = async () => {
    return await axios.get(FeaturedApi).then((res) => res.data.results);
  };


  const { isLoading, data } = useQuery<Movies[]>({
    queryKey: ["movies", page],
    queryFn: getMovies,
  });

  function dataFormatada(dataOriginal: string) {
    const dataObjeto = new Date(dataOriginal);
    return dataObjeto.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  return (
    <div className="flex flex-col flex-grow">
      {isLoading ? (
        <div>
          <h1 className="flex flex-grow items-center justify-center text-white mt-48 font-bold">Carregando...</h1>
        </div>
      ) : (
        <div>
          <div className="text-3xl text-white mt-3 font-medium">Filmes populares</div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-center pt-5 justify-center pb-5">
            {(data ?? []).length > 0 &&
              (data ?? []).map((movie) =>
                <div key={movie.id} className="relative flex flex-col flex-grow items-center">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`Poster do filme: ${movie.title}`}
                    width={500}
                    height={500}
                    priority
                    style={{ width: "100%", height: "100%" }}
                    className="transition duration-150 ease-in-out transform hover:scale-105 hover:opacity-85 rounded-sm"
                  />
                  <div className="absolute flex items-center top-0 left-0 bg-indigo-900 p-2 space-x-1 text-yellow-400 rounded-sm text-base mt-2">
                    <FaStar className="mr-1" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <div className="flex min-w-full justify-center items-center h-14 p-3 rounded-b-sm">
                    <h1 className="md:text-base text-xs font-medium text-white">{movie.title}</h1>
                    <h2 className="ml-2 text-xs md:text-base font-bold text-slate-100">({movie.release_date.split('-')[0]})</h2>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
