
import CoutesPng from "../../assets/Coutes.png"
import FacebookIcon from "../../assets/facebookIcon.png"
import InstaIcon from "../../assets/icons8-instagram-24.png"
import LinkdinIcon from "../../assets/icons8-linkedin-24.png"
import YoutubeIcon from "../../assets/icons8-youtube-24.png"
import Bg1 from '../../assets/pexels-thisisengineering-3862365.jpg'
import Bg2 from '../../assets/pexels-polina-zimmerman-3778619.jpg'
function Nonummy() {
    return (
        <div className="flex flex-wrap items-center mt-20 gap-24">
            <div className="flex">
                <img className="h-[450px]" src={Bg1} alt="img" />
                <img className="h-[450px]" src={Bg2} alt="img" />
            </div>
            <div className="w-[600px] ">
                <div className="flex flex-col flex-wrap gap-5">
                    <h1 className="text-2xl text-green-500 font-bold">We Help Propel Your Career to New Heights!</h1>
                    <p className="text-5xl font-bold">Cultivating Success</p>
                    <p className="text-xl">YourHR is focused on transforming how organizations manage their workforce by simplifying HR processes, enhancing employee engagement, and boosting productivity.</p>
                    <img className="w-8" src={CoutesPng} alt="img" />
                    <p className="text-xl">By leveraging advanced technology and best practices, we aim to create a positive work culture and drive success for businesses in a dynamic environment.</p>
                </div>
                <div className="flex w-52 justify-around items-center space-x-5 mt-5">
                    <img className="h-12 w-12 bg-cover p-1 rounded-full object-contain hover:bg-green-300" src={FacebookIcon} alt="img" />
                    <img className="h-12 w-12 bg-cover p-1 rounded-full object-contain hover:bg-green-300" src={InstaIcon} alt="img" />
                    <img className="h-11 w-11 bg-cover p-1 rounded-full object-contain hover:bg-green-300" src={LinkdinIcon} alt="img" />
                    <img className="h-12 w-12 bg-cover p-1 rounded-full object-contain hover:bg-green-300" src={YoutubeIcon} alt="img" />
                </div>
            </div>
        </div>
    );
}

export default Nonummy;
