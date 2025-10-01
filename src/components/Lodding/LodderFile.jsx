// import React from "react";
import LodderVideo from "./Dual Ball@1x-1.0s-200px-200px.mp4" // Import the video file

function Lodder() {
  return (
    <div>
      <video autoPlay loop muted className="h-14 object-cover ">
        <source src={LodderVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Lodder;
