import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

const Recommended = ({ categoryId }) => {

    const [apiData, setApiData] = useState([]);
    const relatedVideo_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=46&regionCode=US&videoCategoryId=${categoryId}&key=AIzaSyBzl7wyCrJN2rHBsn_wqDPJ2h-JNV-eI0U`;

    useEffect(() => {
        fetch(relatedVideo_API).then(res => res.json()).then(data => setApiData(data.items))
    }, [])

    const tubevideo = (viewCount) => {
        return viewCount >= 1000000 ? Math.floor(viewCount / 1000000) + 'M' : Math.floor(viewCount / 1000) + 'K';
    }
 
    return (
        <div className="recommended text-white mt-20">
            {apiData.map((item,index) => {
                return (
                    <div key={index} className="flex mt-1">
                        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} onClick={()=>window.scrollTo(0,0)} >
                            <img src={item.snippet.thumbnails.medium.url} alt="" className='max-w-40 rounded-xl'/></Link>
                        <div className="mx-2">
                            <h4 className='text-sm'>{item.snippet.title}</h4>
                            <p className='text-sm text-gray-400'>{item.snippet.channelTitle}</p>
                            <div className='flex'>
                            <p className='text-sm text-gray-400'>{tubevideo(item.statistics.viewCount)} views  </p>
                            <p className='text-sm text-gray-400 ml-3'> &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                            </div>
                        </div>
                    </div>)
        })}
        </div>
    )
}

export default Recommended