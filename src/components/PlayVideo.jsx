import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, useMediaQuery } from '@mui/material';



const PlayVideo = ({ videoId, category }) => {
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [showComments, setShowComments] = useState(!useMediaQuery('(max-width:768px)'));
    const [showFullDescription, setShowFullDescription] = useState(false);

    const API_KEY = 'AIzaSyBzl7wyCrJN2rHBsn_wqDPJ2h-JNV-eI0U'; // Replace with your actual API key

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const videoDetailsResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key=${API_KEY}&id=${videoId}`);
                const videoDetailsData = await videoDetailsResponse.json();
                setApiData(videoDetailsData.items[0]);

                const channelLogoResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${videoDetailsData.items[0].snippet.channelId}&key=${API_KEY}`);
                const channelLogoData = await channelLogoResponse.json();
                setChannelData(channelLogoData.items[0]);

                const videoCommentResponse = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=50&key=${API_KEY}&videoId=${videoId}`);
                const videoCommentData = await videoCommentResponse.json();
                setCommentData(videoCommentData.items);

                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchVideoData();
    }, [videoId, API_KEY, category]);

    const tubevideo = (viewCount) => {
        return viewCount >= 1000000 ? Math.floor(viewCount / 1000000) + 'M' : Math.floor(viewCount / 1000) + 'K';
    }

    const handleShowMoreComments = () => {
        setShowComments(!showComments);
    }

    const handleShowMoreDescription = () => {
        setShowFullDescription(!showFullDescription);
    }

    return (
        <div className="play-video sm:max-w-4xl sm:m-20 ml-14 mt-10 text-white">
            <iframe 
                src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`} 
                className="rounded-xl w-full h-96" 
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
            </iframe>
            <h3 className="mt-4 font-bold text-xl">{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="mt-2">
                <p>{apiData ? `${tubevideo(apiData.statistics.viewCount)} Views • ${moment(apiData.snippet.publishedAt).fromNow()}` : "1525 Views • 2 days ago"}</p>
            </div>
            <hr className="my-4"/>
            <div className="flex items-center">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" className="rounded-full w-10 h-10 mr-4" />
                <div>
                    <p className="font-semibold">{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span className="text-sm">{channelData ? `${tubevideo(channelData.statistics.subscriberCount)} Subscribers` : "1M Subscribers"}</span>
                </div>
                <Button variant="contained" color="primary" className="join-but">Join</Button>
                <Button variant="contained" color="primary" className="sub-but">Subscribe</Button>
            </div>
            <div className="mt-4">
                <p>
                    {apiData ? (showFullDescription ? apiData.snippet.description : `${apiData.snippet.description.slice(0, 250)}...`) : "Description Here"}
                </p>
                {apiData && apiData.snippet.description.length > 250 && (
                    <Button  onClick={handleShowMoreDescription}>
                        {showFullDescription ? "Show Less" : "Show More"}
                    </Button>
                )}
                <hr className="my-4"/>
                <div className='flex justify-between'>
                    <h4 className="font-semibold">{apiData ? `${tubevideo(apiData.statistics.commentCount)} Comments` : "130 Comments"}</h4>
                    <Button onClick={handleShowMoreComments}>
                        {showComments ? "Hide Comments" : "Show Comments"}
                    </Button>
                </div>
                {showComments && (
                    commentData.map((item, index) => (
                        <div key={index} className="comment flex items-start mt-4">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" className="rounded-full w-8 h-8 mr-4" />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.snippet.topLevelComment.snippet.authorDisplayName} <span className="text-sm">{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                <p className="mt-1">{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action flex items-center mt-2">
                                    <img src="like-icon-url" alt="like" className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{item.snippet.topLevelComment.snippet.likeCount}</span>
                                    <img src="dislike-icon-url" alt="dislike" className="w-4 h-4 ml-4 mr-1" />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PlayVideo;
