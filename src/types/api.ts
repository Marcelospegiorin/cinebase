export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
}

export interface TVShow {
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
}

export type Media = Movie | TVShow;