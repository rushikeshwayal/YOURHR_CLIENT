import { useState } from "react";
import NavToHome from "../NavBar/NavToHome";
import VideoScroller from "./VideoScroller";
import Footer from "../Footer/Footer";
import { AiOutlineClose } from "react-icons/ai";

const videoData = {
    "Featured For You": [
        {
            "title": "React JS Full Course | Build an App and Master React in 1 Hour",
            "video_link": "http://www.youtube.com/watch?v=b9eMGE7QtTk",
            "thumbnail_link": "https://i.ytimg.com/vi/b9eMGE7QtTk/maxresdefault.jpg"
        },
        {
            "title": "React JS Full Course for Beginners | Complete All-in-One Tutorial | 9 Hours",
            "video_link": "http://www.youtube.com/watch?v=RVFAyFWO4go",
            "thumbnail_link": "https://i.ytimg.com/vi/RVFAyFWO4go/maxresdefault.jpg"
        },
        {
            "title": "React Full Course for free ⚛️ (2024)",
            "video_link": "http://www.youtube.com/watch?v=CgkZ7MvWUAA",
            "thumbnail_link": "https://i.ytimg.com/vi/CgkZ7MvWUAA/maxresdefault.jpg"
        },
        {
            "title": "React Tutorial for Beginners",
            "video_link": "http://www.youtube.com/watch?v=SqcY0GlETPk",
            "thumbnail_link": "https://i.ytimg.com/vi/SqcY0GlETPk/maxresdefault.jpg"
        },
        {
            "title": "React JS Explained In 10 Minutes",
            "video_link": "http://www.youtube.com/watch?v=s2skans2dP4",
            "thumbnail_link": "https://i.ytimg.com/vi/s2skans2dP4/maxresdefault.jpg"
        },
        {
            "title": "UI / UX Design Tutorial – Wireframe, Mockup & Design in Figma",
            "video_link": "http://www.youtube.com/watch?v=c9Wg6Cb_YlU",
            "thumbnail_link": "https://i.ytimg.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg"
        },
        {
            "title": "Introducing Figma: A Beginners Tutorial (2023 UI UX Design)",
            "video_link": "http://www.youtube.com/watch?v=JGLfyTDgfDc",
            "thumbnail_link": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
        },
        {
            "title": "Figma UI Design Tutorial: Get Started in Just 24 Minutes!",
            "video_link": "http://www.youtube.com/watch?v=FTFaQWZBqQ8",
            "thumbnail_link": "https://i.ytimg.com/vi/FTFaQWZBqQ8/maxresdefault.jpg"
        },
        {
            "title": "Figma Tutorial for Beginners (13-min crash course!)",
            "video_link": "http://www.youtube.com/watch?v=jQ1sfKIl50E",
            "thumbnail_link": "https://i.ytimg.com/vi/jQ1sfKIl50E/maxresdefault.jpg"
        },
        {
            "title": "Free Figma UX Design UI Essentials Course",
            "video_link": "http://www.youtube.com/watch?v=kbZejnPXyLM",
            "thumbnail_link": "https://i.ytimg.com/vi/kbZejnPXyLM/maxresdefault.jpg"
        }
    ],
    "Web Development": [
        {
            "title": "HTML & CSS Full Course for free 🌎",
            "video_link": "http://www.youtube.com/watch?v=HGTJBPNC-Gw",
            "thumbnail_link": "https://i.ytimg.com/vi/HGTJBPNC-Gw/maxresdefault.jpg"
        },
        {
            "title": "Learn HTML & CSS – Full Course for Beginners",
            "video_link": "http://www.youtube.com/watch?v=a_iQb1lnAEQ",
            "thumbnail_link": "https://i.ytimg.com/vi/a_iQb1lnAEQ/maxresdefault.jpg"
        },
        {
            "title": "Web Development with HTML & CSS – Full Course for Beginners",
            "video_link": "http://www.youtube.com/watch?v=dX8396ZmSPk",
            "thumbnail_link": "https://i.ytimg.com/vi/dX8396ZmSPk/maxresdefault.jpg"
        },
        {
            "title": "HTML & CSS Full Course: Build Your First Website",
            "video_link": "http://www.youtube.com/watch?v=ZOx2g9NqtPQ",
            "thumbnail_link": "https://i.ytimg.com/vi/ZOx2g9NqtPQ/maxresdefault.jpg"
        },
        {
            "title": "Learn JavaScript - Full Course for Beginners",
            "video_link": "http://www.youtube.com/watch?v=PkZNo7MFNFg",
            "thumbnail_link": "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg"
        },
        {
            "title": "JavaScript Course for Beginners – Your First Step to Web Development",
            "video_link": "http://www.youtube.com/watch?v=W6NZfCO5SIk",
            "thumbnail_link": "https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg"
        },
        {
            "title": "Learn web development as an absolute beginner",
            "video_link": "http://www.youtube.com/watch?v=ysEN5RaKOlA",
            "thumbnail_link": "https://i.ytimg.com/vi/ysEN5RaKOlA/maxresdefault.jpg"
        },
        {
            "title": "How I'd Learn Web Development (If I Could Start Over)",
            "video_link": "http://www.youtube.com/watch?v=TG6XSFeOT3g",
            "thumbnail_link": "https://i.ytimg.com/vi/TG6XSFeOT3g/maxresdefault.jpg"
        },
        {
            "title": "Web Development Tutorial - For Complete Beginners!",
            "video_link": "http://www.youtube.com/watch?v=-s3InudNIrM",
            "thumbnail_link": "https://i.ytimg.com/vi/-s3InudNIrM/maxresdefault.jpg"
        },
        {
            "title": "100+ Web Development Things you Should Know",
            "video_link": "http://www.youtube.com/watch?v=erEgovG9WBs",
            "thumbnail_link": "https://i.ytimg.com/vi/erEgovG9WBs/maxresdefault.jpg"
        }
    ],
    "Design & Animation": [
        {
            "title": "Procreate clouds tutorial #procreatebrushes #procreatetutorial",
            "video_link": "http://www.youtube.com/watch?v=Tmn1_pZA66k",
            "thumbnail_link": "https://i.ytimg.com/vi/Tmn1_pZA66k/maxresdefault.jpg"
        },
        {
            "title": "Make Cloud Animation in Alight Motion (Tutorial)",
            "video_link": "http://www.youtube.com/watch?v=K2mSI59wPvg",
            "thumbnail_link": "https://i.ytimg.com/vi/K2mSI59wPvg/maxresdefault.jpg"
        },
        {
            "title": "Animating Clouds - AFTER EFFECTS Tutorial",
            "video_link": "http://www.youtube.com/watch?v=Aox78BfXpDs",
            "thumbnail_link": "https://i.ytimg.com/vi/Aox78BfXpDs/maxresdefault.jpg"
        },
        {
            "title": "How to animate lightning ⚡️from easy to difficult! #animation #procreate #lighning",
            "video_link": "http://www.youtube.com/watch?v=GWhTRh-9gH8",
            "thumbnail_link": "https://i.ytimg.com/vi/GWhTRh-9gH8/maxresdefault.jpg"
        },
        {
            "title": "Cavalry Tutorial — Easy Image Cloud Animation",
            "video_link": "http://www.youtube.com/watch?v=SkfffBmYzXU",
            "thumbnail_link": "https://i.ytimg.com/vi/SkfffBmYzXU/maxresdefault.jpg"
        }
    ],
    "Programming": [
        {
            "title": "Every programming tutorial",
            "video_link": "https://www.youtube.com/embed/GIKtvqpf-9A?si=hxgag_ELnI_EH1u9",
            "thumbnail_link": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
        },
        {
            "title": "How to Learn to Code",
            "video_link": "http://www.youtube.com/watch?v=NGlX-1jhYJE",
            "thumbnail_link": "https://i.ytimg.com/vi/NGlX-1jhYJE/maxresdefault.jpg"
        },
        {
            "title": "Learn To Code Like a GENIUS and Not Waste Time",
            "video_link": "http://www.youtube.com/watch?v=q-_ezD9Swz4",
            "thumbnail_link": "https://i.ytimg.com/vi/q-_ezD9Swz4/maxresdefault.jpg"
        },
        {
            "title": "Coding for 1 Month Versus 1 Year #shorts #coding",
            "video_link": "http://www.youtube.com/watch?v=k7LSFYyBZUs",
            "thumbnail_link": "https://i.ytimg.com/vi/k7LSFYyBZUs/maxresdefault.jpg"
        },
        {
            "title": "Coding Tutorials #coding",
            "video_link": "http://www.youtube.com/watch?v=a0me2X_Mi0M",
            "thumbnail_link": "https://i.ytimg.com/vi/a0me2X_Mi0M/maxresdefault.jpg"
        }
    ]
}

function LearnAcademy() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoSelect = (video) => setSelectedVideo(video);
    const closeModal = () => setSelectedVideo(null);
    const toEmbedUrl = (url) => (url ? url.replace("watch?v=", "embed/") : "");

    return (
        <div className="bg-black text-white min-h-screen font-sans">
            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0%);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>

            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center pt-40 pb-40 flex items-center justify-center text-center min-h-[80vh]"
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg')",
                }}
            >
                {/* Overlays */}
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black"></div>

                {/* Navigation */}
                <div className="absolute top-0 left-0 w-full z-20">
                    <NavToHome />
                </div>

                {/* Hero Text */}
                <div className="relative z-10 px-4">
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-green-400">
                        Welcome to Learn Academy
                    </h1>
                    <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-white font-medium">
                        Your one-stop destination for high-quality tutorials in tech, design, and more.
                    </p>
                </div>
            </div>
            {/* Video Sections */}
            <div className="container mx-auto px-4 lg:px-12 py-8 bg-black">
                {Object.keys(videoData).map((category, idx) => (
                    <VideoScroller
                        key={idx}
                        title={category}
                        videos={videoData[category]}
                        onVideoSelect={handleVideoSelect}
                    />
                ))}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-6xl h-[80vh] bg-black rounded-xl shadow-2xl overflow-hidden animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            aria-label="Close modal"
                            className="absolute top-3 right-3 text-gray-400 hover:text-white z-10 transition-colors"
                        >
                            <AiOutlineClose className="h-6 w-6" />
                        </button>

                        {/* Video Player */}
                        <div className="w-full h-full">
                            <iframe
                                className="w-full h-full"
                                src={`${toEmbedUrl(selectedVideo.video_link)}?autoplay=1&rel=0`}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video Title */}
                        <div className="absolute bottom-0 w-full p-5 bg-black/70 border-t border-gray-800">
                            <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default LearnAcademy;
