'use client'

import axios from "axios";
import {  useState } from "react";
import Details from "./Details";
import { useAppDispatch } from "@/lib/hooks";
import { setFormats, setProcessing } from "@/lib/features/downloadSlice";
import { formatType } from "@/types/video";

const Search = () => {
  const [url, setUrl] = useState('');
  const [videoDetails, setVideoDetails] = useState<any>(null)
  const dispatch = useAppDispatch()
  const handleDownload = async () => {
   if(url.trim() !== '') {
    dispatch(setProcessing(true))
    dispatch(setFormats([]))
    setVideoDetails(null)
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/video/video-details`, {
        params: {url}
      })
      console.log(data)
      // const store: formatType[] = []
      // data?.videoInfo?.formats?.forEach((format: formatType) => {
      //    const video = store.find((item:formatType) => item?.qualityLabel === format.qualityLabel);
      //    if(!video) {
      //     if(format.mimeType.includes('video/mp4;')) {
      //       if(format.hasAudio) {
      //          store.push(format)
      //       }
      //     }
      //    }
      // })
      dispatch(setFormats(data?.formats))
      setVideoDetails(data)
      dispatch(setProcessing(false))
      console.log(data)
    } catch (error) {
      dispatch(setProcessing(false))
      console.error('Error downloading video', error);
    }
   }
  };

  return (
<div>
    <div className="text-center mb-4">
    <h1 className="text-2xl font-semibold mb-2">Youtube Video Downloader</h1>
    <p>Tool to download Youtube video Full HD, 1080p, 2k, 4k</p>
    </div>
<div className="flex flex-col md:flex-row flex-wrap">
        <input type="text" value={url}
            onChange={(e) => setUrl(e.target.value)} className="flex-1 border-[2px] border-[#00b887] min-h-[55px] px-5 rounded-tl-md rounded-bl-md rounded-tr-md rounded-br-md md:!rounded-tr-none md:!rounded-br-none outline-none" placeholder="Enter the Youtube video link here" required />
        <button onClick={handleDownload} className=" outline-none mt-3 md:mt-0 bg-[#00b887] h-[55px] px-8 border-[2px] border-[#00b887] rounded-tr-md rounded-br-md rounded-tl-md md:rounded-tl-none rounded-bl-md md:rounded-bl-none text-white capitalize text-base font-medium">search</button>
    </div>
    <Details details={videoDetails} url={url} />
</div>
  )
}

export default Search