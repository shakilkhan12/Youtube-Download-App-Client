
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Search from "@/components/Search";
// https://www.youtube.com/watch?v=CbM6etHb4QI
import Image from "next/image";
export default function Home() {

  return (
   <>
   <Nav />
    <div className="flex justify-center py-20 px-5 min-h-[calc(100vh-144px)]">
    <div className="bg-white w-full lg:w-8/12">
        <Search />    
    </div>
</div>
<Footer />
   </>
  );
}
