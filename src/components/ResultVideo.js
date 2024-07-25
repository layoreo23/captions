import { useEffect, useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import SparkleIcon from "./sparkleIcon";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import transcriptionItemsToSrt from "@/libs/awsTranscriptionHelpers";
import roboto from './../fonts/Roboto-Regular.ttf';
import robotoBold from './../fonts/Roboto-Bold.ttf';


export default function ResultVideo({filename, transcriptionItems}) {
    const videoUrl = "https://aleena-captions.s3.amazonaws.com/"+ filename;
    const [loaded, setLoaded] = useState(false);
    const [primaryColour, setPrimaryColour] = useState('#FFFFFF');
    const [outlineColour, setOutlineColour] = useState('#000000');
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);
    useEffect(()=>{
            videoRef.current.src = videoUrl;
            load();
    },[]);


    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
    }

    function toFFmpegColor(rgb){ 
        const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
        return '&H' + bgr + '&';
    }

    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        const srt = transcriptionItemsToSrt(transcriptionItems);
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
        await ffmpeg.writeFile('subs.srt', srt);
        ffmpeg.on('log',({message})=>{
            console.log(message);
        });
        await ffmpeg.exec([
            '-i', filename ,
            '-preset','ultrafast',
            '-vf',`subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=100,PrimaryColour=${toFFmpegColor(primaryColour)},OutlineColour=${toFFmpegColor(outlineColour)}'`,
            'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src =
            URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
    }

    return (
    <>
        <div className="mb-4">
            <button 
                onClick={transcode}
                className="bg-custom-color py-4 px-4 rounded-full inline-flex gap-2 
                border border-white cursor-pointer mb-4">
                <SparkleIcon/>
                <span>Apply Captions</span>
            </button>
        </div>
        <div>
            primary color:
            <input 
                type="color" 
                value={primaryColour} 
                onChange={ev => setPrimaryColour(ev.target.value)}/>
            <br />
            outline color:
            <input 
                type="color"   
                value={outlineColour} 
                onChange={ev => setOutlineColour(ev.target.value)}/>
        </div>
        <div className="rounded-xl overflow-hidden">
            <video
                data-video = {0}
                ref ={videoRef}
                controls>
            </video>
        </div>
    </>
    );
}
