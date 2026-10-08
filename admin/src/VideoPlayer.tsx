import { useRef, useState } from "react";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUrl =
    "videos/1744181761820-0a0xewbf-Order_APIs-20231001_164014-Meeting_Recording.mp4".split(
      "videos/",
    );
  const videoUrl = `http://localhost:8080/video/${fetchUrl[1]}`;

  const handleLoadedData = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div>
      {isLoading && <p>Loading video...</p>}
      <video
        ref={videoRef}
        src={videoUrl} // Direct URL to the server
        controls
        width="640"
        height="360"
        crossOrigin="anonymous"
        onLoadedData={handleLoadedData}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
