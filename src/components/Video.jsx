import React, { useEffect, useContext } from "react";
import PlayVideo from "./PlayVideo";
import Recommended from "./Recommended";
import { useParams } from "react-router-dom";


const Video = ({category}) => {

  const {videoId,categoryId} = useParams();
  
  

  return (
      <div className="play-container">
        <PlayVideo category={category} videoId={videoId} />
        <Recommended categoryId={categoryId}/>
      </div>
  );
};

export default Video;