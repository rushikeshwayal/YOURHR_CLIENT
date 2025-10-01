import React, { useRef } from "react";
import VideoCard from "./VideoCard";

const ChevronLeftIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const VideoScroller = ({ title, videos, onVideoSelect }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = current.offsetWidth * 0.9;
            current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="my-10 group relative w-full">
            <h2 className="text-2xl sm:text-3xl font-semibold text-green-600 mb-4 px-4 lg:px-16">
                {title}
            </h2>

            {/* Left Scroll Button */}
            <button
                onClick={() => scroll("left")}
                className="absolute top-1/2 -left-6 lg:-left-10 z-20 p-2 bg-white text-blue-600 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
            >
                <ChevronLeftIcon />
            </button>

            {/* Video Cards */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-5 py-2 scrollbar-hide scroll-smooth px-4 lg:px-16"
            >
                {videos.map((video, i) => (
                    <VideoCard key={i} video={video} onVideoSelect={onVideoSelect} />
                ))}
            </div>

            {/* Right Scroll Button */}
            <button
                onClick={() => scroll("right")}
                className="absolute top-1/2 -right-6 lg:-right-10 z-20 p-2 bg-white text-blue-600 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
            >
                <ChevronRightIcon />
            </button>
        </div>
    );
};

export default VideoScroller;
