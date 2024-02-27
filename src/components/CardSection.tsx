"use client";

import { useTMDB } from '@/api/useMovies'
import { Media } from '@/types/api';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { EndpointKey } from '@/api/useMovies';

import './CardSection.css'

type CardSectionProps = {
  nameSection: string;
  parameter: EndpointKey;
}

export default function CardSection({ nameSection, parameter }: CardSectionProps) {


  const { data: movies, error, isLoading } = useTMDB(parameter);

  if (error) return <div>Erro ao buscar os filmes: {error.message}</div>;

  return (
    <div className='items-center mt-2 block text-white'>
      {isLoading ?
        <></>
        :
        <div>
          <h1 className="text-2xl font-bold text-white mt-3">{nameSection}</h1>
        </div>
      }
      <div className="select-none flex overflow-x-auto scrollbar-hide">
        <Swiper
          navigation={true}
          grabCursor={true}
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 4,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 15,
            }
          }}
          className="flex flex-col lg:w-full xl:h-[390px] 2xl:h-[450px]"
        >
          {movies?.map((movie: Media) => (
            <div>
              <SwiperSlide key={movie.id} className="py-3 pl-1">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`Poster do filme: ${movie.title}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority
                  quality={100}
                  className="rounded-sm w-full h-[100%] hover:opacity-80 transition hover:scale-105"
                />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
}