
import homePng from '../../assets/home Bg.jpg'
// import NavBar from "./NavToHome";
import NavBar from "../NavBar/NavToHome";


function LandingHome() {
    return (
        <div >
            <div className="h-[1000px] w-full bg-cover bg-center -z-10 " style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homePng})`, backgroundAttachment: 'fixed' }}>
                <NavBar className="text-white" />
                <div className="text-white min-h-screen flex flex-wrap justify-center flex-col items-center pb-40 gap-2">
                    <h1 className="text-2xl  ">Your Career, Our Priority!</h1>
                    <h1 className="text-7xl  font-bold">Connecting Talent with</h1>
                    <h1 className="text-7xl font-bold text-green-400">Opportunity</h1>
                </div>
            </div>
        </div>
    );
}



export default LandingHome;