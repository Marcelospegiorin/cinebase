"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Media } from '@/types/api';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const endpoints = {
  originals: "/discover/tv",
  trending: "/trending/all/week",
  now_playing: "/movie/now_playing",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};

export type EndpointKey = keyof typeof endpoints;

export const useTMDB = (endpoint: EndpointKey) => {
  const fetchData = async (): Promise<Media[]> => {
    const url = `${BASE_URL}${endpoints[endpoint]}?api_key=${API_KEY}&language=pt-BR`;
    const response = await axios.get(url);
    return response.data.results;
  };

  return useQuery<Media[]>({
    queryKey: ["movies", endpoint],
    queryFn: fetchData,
  });
};
