import React from "react";

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
        <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
            clipRule="evenodd"
        />
    </svg>
);

const VideoCard = ({ video, onVideoSelect }) => {
    return (
        <div
            className="group relative flex-none w-64 sm:w-72 cursor-pointer rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-102 hover:shadow-xl"
            onClick={() => onVideoSelect(video)}
        >
            <img
                className="w-full h-36 sm:h-44 object-cover"
                src={video.thumbnail_link}
                alt={video.title}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayIcon />
            </div>
            <div className="absolute bottom-0 left-0 p-3 w-full bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm font-light text-white">{video.title}</p>
            </div>
        </div>

    );
};

export default VideoCard;
