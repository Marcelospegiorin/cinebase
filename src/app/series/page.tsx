"use client"

import { Navbar } from "@/components/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

export default function Series() {

  return (
    <main className="min-w-screen min-h-screen flex flex-col">
      <Navbar />

      <div className="container min-w-full bg-slate-200 flex-grow">
        <h1 className="container">No series</h1>
      </div>
    </main>
  );
}
