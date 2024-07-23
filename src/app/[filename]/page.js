'use client';
import TranscriptionItem from "@/components/TranscriptionItem";
import { clearTranscriptionItems } from "@/libs/awsTranscriptionHelpers";
import { TranscriptionJobStatus } from "@aws-sdk/client-transcribe";
import axios from "axios";
import { useEffect,useState } from "react";


export default function FilePage({params}){
    const filename = params.filename;
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isFetchingInfo, setIsFetchingInfo]=useState(false);
    const [awsTranscriptionItems, setAwsTranscriptionItems ] = useState([]);
    useEffect(()=> {
        getTranscription();
    },[filename]);

    function getTranscription(){
        setIsFetchingInfo(true);
        axios.get('/api/transcribe?filename='+filename).then(response => {
            setIsFetchingInfo(false);
            const status = response.data?.status;
            const transcription = response.data?.transcription;
            if (status === 'IN_PROGRESS'){
                setIsTranscribing(true);
                setTimeout(getTranscription, 3000);
            }
            else{
                setIsTranscribing(false);
                setAwsTranscriptionItems(
                    clearTranscriptionItems(transcription.results.items)
                );
            }
        });
    }

    if (isTranscribing){
        return(
            <div>Transcribing your video...</div>
        );
    }

    if (isFetchingInfo){
        return(
            <div>Fetching Information...</div>
        );
    }
    return (
        <div>
            <div className="grid grid-cols-2 gap-9">
                <div className="">
                    <h2 className="text-2xl mb-4 text-white/70 ">Transcription</h2>
                    <div className="grid grid-cols-3 sticky top-0 bg-custom-pink/90 p-2 rounded-md">
                        <div>From</div>
                        <div>End</div>
                        <div>Caption</div>
                    </div>
                    {awsTranscriptionItems.length>0 && awsTranscriptionItems.map(item => (
                    <TranscriptionItem item={item} />
                    ))}
                </div>
                <div>
                    <h2 className="text-2xl mb-4 text-white/70 ">Results</h2>
                    <div>
                        <button>Put Captions</button>
                    </div>
                    <video
                        controls
                     src={"https://aleena-captions.s3.amazonaws.com/"+ filename}>
                    </video>
                        
                </div>
            </div>

        
        </div>
    );
}