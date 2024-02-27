import { Navbar } from "@/components/Navbar";
import CardSection from "@/components/CardSection";

export default function Movies() {

 

  return (
    <main className="min-w-screen min-h-screen flex flex-col">
      <Navbar />
      
      <div className="min-w-full bg-black flex-grow pr-2 pl-2 lg:pr-12 lg:pl-12">
        <CardSection 
          nameSection="No cinema"
          parameter="now_playing"
        />
        <CardSection 
          nameSection="Em Alta"
          parameter="trending"
        />
        <CardSection 
          nameSection="Populares"
          parameter="popular"
        />
        <CardSection 
          nameSection="Mais Votados"
          parameter="top_rated"
        />
      </div>
      
    </main>
  );
}
