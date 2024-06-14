import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, useMediaQuery } from '@mui/material';
import { counterContext } from '../Context/Context';
import moment from 'moment'
import { Link } from 'react-router-dom'

function Home({category}) {

    const [video, setvideo] = useState([])
    const{check} = useContext(counterContext);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
      axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=AIzaSyBzl7wyCrJN2rHBsn_wqDPJ2h-JNV-eI0U`)
      .then(res => {
        setvideo(res.data.items)
        // console.log(res);
      })
 
    }, [category])


    const truncateTitle = (title, limit) => {
        return title.length > limit ? `${title.slice(0, limit)}...` : title;
      };

      const tubevideo = (viewCount) => {
        return viewCount>=1000000 ? Math.floor(viewCount/1000000) +'M' : Math.floor(viewCount/1000) +'K';
      }
    

  return (
    <div  className={`grid grid-cols-2 sm:grid-cols-4 pt-16 ${check ? 'pl-16': 'card-img pl-64 pr-0'}`}>
      {video.map((item,index) => (
        
           <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">

       <Card sx={{ maxWidth: 345, boxShadow: 'none', backgroundColor: 'black', color: 'white' }}  className={`mt-5  ${check ? 'card-mob': 'w-11/12 card-mob'}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={item.snippet.thumbnails.medium.url}
            alt="green iguana"
            className='rounded-xl hover:rounded-none'
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" className='title-vid'>
            {truncateTitle(item.snippet.title, isMobile ? 20 : 40)}
            </Typography>
            <Typography variant="body2" className='chan-na'>
            {item.snippet.channelTitle}
            </Typography>
            <Typography variant="body2" >
            {tubevideo(item.statistics.viewCount) } views &bull; 
            {" "+moment(item.snippet.publishedAt).fromNow()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
      ))}
    </div>
  )
}

export default Home
