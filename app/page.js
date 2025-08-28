import Instrucciones from "@/components/Instrucciones";
import Rifas from "@/components/Rifas";
import Footer  from "@/components/Footer";

export default function Home() {
    return(
      
    <main>
      <section className="w-[90%] max-w-[1600px] mx-auto my-0 py-[70px] flex flex-col gap-[20px] ">
        <h1 className=" text-[40px] text-center leading-[35px] font-semibold ">¡Gana Increíbles Premios!</h1>
        <p className=" text-[20px] leading-[20px] text-center">Participa en nuestras rifas y ten la oportunidad de ganar autos, dinero, tecnología y mucho más. ¡Tu suerte está a un click de distancia!</p>
        <button className="bg-[#e9b30e] text-[22px] text-black font-bold w-[270px] py-[15px] mx-auto rounded-[5px]">Ver Rifas disponibles</button>
      </section>

      <Rifas></Rifas>

      <Instrucciones></Instrucciones>

      <Footer></Footer>
    </main>
    )
    
}
