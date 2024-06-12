'use client'

import { setProcessing } from "@/lib/features/downloadSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatType } from "@/types/video";
import { socket } from "@/utils/getSocket";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineAudioMuted, AiTwotoneAudio } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";

type PropTypes = {
    url: string
    details: any
}
const Details = ({ url, details}: PropTypes) => {
  const [downloadStart, setDownloadStart] = useState(false)
  const dispatch = useAppDispatch()
  const {processing, formats} = useAppSelector(state => state.downloadSlice)
  const [progress, setProgress] = useState('')
  const [mb, setMb] = useState('')
  const [timeLeft, setTimeLeft] = useState('')
  const [running, setRunning] = useState('')
  const downloadVideo = async (itag: number) => {
    setDownloadStart(true)
    try {
      const response = await axios.get('http://localhost:5000/api/video/download', {
        params: { url, socket: socket?.id, itag },
        responseType: 'blob',
      });
      setDownloadStart(false)
      dispatch(setProcessing(false))
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'video.mp4');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setDownloadStart(false)
      dispatch(setProcessing(false))
      console.log(error)
    }
  }
  useEffect(() => {
    socket.on('progress', (data): void => {
      setProgress(data)
    }) 
    socket.on('mb', (data): void => {
      setMb(data)
    }) 
    socket.on('time-left', (data): void => {
      setTimeLeft(data)
    }) 
    socket.on('downloaded-minutes', (data): void => {
      setRunning(data)
    }) 
    return () => {
       socket.off('progress');
       socket.off('mb');
       socket.off('time-left');
       socket.off('downloaded-minutes');
    }
  }, [])
  return (
    <div>
         <div className="mt-5">
          {processing && <h1 className="text-green-600">Retrieving data please wait.........</h1>}
          {downloadStart && <h1>Downloading...</h1>}
          {progress &&  <div>
    <div className="mb-2 flex justify-between items-center">
      <span className="text-sm text-gray-800 dark:text-white" style={{paddingLeft: progress}}>{progress}</span>
    </div>
    <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden ">
      <div className="flex flex-col justify-center rounded-full overflow-hidden bg-[#00b887] text-xs text-white text-center whitespace-nowrap transition duration-500 " style={{width: progress}}></div>
    </div>
  </div>}
  {mb && timeLeft &&  <>
    <div className="mt-3 flex justify-between space-x-5 ">
    <h1>{mb}</h1>
    <h1>{timeLeft}</h1>
    </div>
    <div className="mt-3">
      <h1>{running}</h1>
    </div>
  </>}
      
      </div>
    {details && <div className="mt-7">
      <h1 className="text-xl">{details?.title}</h1>
   
      {/* <Image src={details?.thumbnail} alt="thumbnail" width={700} height={450} className="mt-5" /> */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
      <div className="w-full">
  
 
           {formats?.map((format:formatType) => (
           <div className="border-b flex w-full">
            <span className="px-4 py-3 text-left flex items-center space-x-3 "><span className="font-semibold">{format.height}</span> {format.hasAudio ? <AiTwotoneAudio color="green" /> : <AiOutlineAudioMuted color="red" />}</span>
            <span className="px-4 py-3 text-right flex justify-end  flex-1"><button className=" outline-none bg-[#00b887] h-[45px] px-6 rounded-md text-white capitalize text-base font-medium flex items-center space-x-3" onClick={() => downloadVideo(format.itag)}><IoMdDownload /> <span>download</span></button></span>
          </div>
           ))} 
       
      </div>
      <Image src={details?.thumbnail} alt="thumbnail" width={500} height={350} className="mt-5" />
      
    </div>
      
      </div>}
    </div>
  )
}

export default Details