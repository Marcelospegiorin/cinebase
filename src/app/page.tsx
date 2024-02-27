import { Navbar } from "@/components/Navbar";
import { PopularMovies } from "@/components/PopularMovies";

export default function Home() {

  return (
    <main className="min-w-screen min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container min-w-full bg-black flex-grow">
        <PopularMovies />
      </div>
    </main>
  );
}
