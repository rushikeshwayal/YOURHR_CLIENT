import MainBgJpg from '../../assets/mainbg.jpg'
import Testo from "./Testo";
function Testimonial() {
  return (
    <div className="relative w-full mt-0 min-h-screen">
      {/* Image Container */}
      <div
        className="w-full h-[850px] relative bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${MainBgJpg})` }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>
      {/* Text overlay (scrolls while image remains fixed) */}
      <div className="absolute top-0 w-full h-[850px] flex flex-wrap  pt-10  justify-center items-start z-20">
        <div className=" flex flex-col justify-start items-center gap-3">
          <h1 className="text-green-400 text-sm font-bold">Testimonial</h1>
          <h1 className="text-white text-5xl font-bold">What Our Client Say ?</h1>
          <Testo />
          <Testo />
        </div>
      </div>
    </div>
  )
}
export default Testimonial;