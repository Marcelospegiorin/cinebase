"use client";

import { useState } from "react";

export const Navbar = () => {

  const [isClick, setIsClick] = useState(false)

  const toggleNavbar = () => {
    setIsClick(!isClick);
  }

  interface SearchResult {
    id: number;
    name?: string;
    title?: string;
  }

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      debouncedSearch(value);
    }
  };

  // Função debounce para TypeScript
  function debounce<F extends (...args: any[]) => void>(func: F, waitFor: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debounced = (...args: any[]) => {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };

    return debounced;
  }

  const fetchSearchResults = async (query: string) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=pt-BR&page=1&query=${query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Erro na busca:", error);
    }
  };

  const debouncedSearch = debounce(fetchSearchResults, 200);

  return (
    <div className="px-3 py-6 bg-white">
      <header className="container flex justify-between">
        <div className="w-max ml-0 text-center select-none cursor-pointer">
          <a href="/">
            <h1 className="text-4xl font-bold tracking-widest text-black">CINEBASE</h1>
            <h2 className="text-sm font-normal uppercase tracking-tighter text-black">discover worlds</h2>
          </a>
        </div>
        <ul className="text-black hidden md:flex items-center cursor-pointer text-lg font-normal select-none">
          <li className="ml-4 hover:bg-black hover:text-white rounded-md p-2">
            <a href="/movies">Filmes</a>
          </li>
          <li className="ml-4 hover:bg-black hover:text-white rounded-md p-2">
            <a href="/series">Séries</a>
          </li>
          <li className="ml-4 hover:bg-black hover:text-white rounded-md p-2">
            <a href="/movies">Gêneros</a>
          </li>
          <div className="ml-4 p-2 rounded-md">
            <input
              type="text"
              placeholder="Buscar por filmes e séries"
              className="border px-4 border-zinc-500 rounded-sm"
              onChange={handleSearchChange}
              value={searchTerm}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
            {searchTerm && focus && (
              <div className="text-black bg-slate-100 absolute z-10 max-h-64 overflow-auto text-base max-w-[300px] rounded-sm p-1 ml-[-30px]">
                {searchResults.map((result) => (
                  <div key={result.id}>{result.title || result.name}</div>
                ))}
              </div>
            )}
          </div>
        </ul>
        <div className="text-black md:hidden items-center flex">
          <button className="inline-flex items-center justify-center p-2 rounded-md text-black md:text-black hover:text-black focus:outline-none focus:ring-2 
              focus:ring-inset focus:ring-black"
            onClick={toggleNavbar}
          >
            {isClick ? (
              <svg className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor" >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>
      {isClick && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-0 space-y-1 sm:px-3">
            <ul className="text-black md:flex items-center cursor-pointer text-lg font-normal select-none">
              <li className="hover:bg-black hover:text-white rounded-md p-2">
                <a href="/movies">Filmes</a>
              </li>
              <li className="hover:bg-black hover:text-white rounded-md p-2">
                <a href="/series">Séries</a>
              </li>
              <li className="hover:bg-black hover:text-white rounded-md p-2">
                <a href="/movies">Gêneros</a>
              </li>
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Buscar por filmes e séries"
                  onChange={handleSearchChange}
                  className="border px-4 border-zinc-500 rounded-sm w-full"
                  value={searchTerm}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                />
                {searchTerm && focus && (
                  <div className="text-black bg-slate-100 absolute z-10 max-h-64 overflow-scroll text-base max-w-[300px]">
                    {searchResults.map((result) => (
                      <div key={result.id}>{result.title || result.name}</div>
                    ))}
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}