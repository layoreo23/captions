import TranscriptionItem from "@/components/TranscriptionItem";
export default function TranscriptionEditor({awsTranscriptionItems, setAwsTranscriptionItems,}){
    
    function updateTranscriptionItem(index, prop, ev){
        const newAwsItems = [...awsTranscriptionItems];
        const newItem = {...newAwsItems[index]};
        newItem[prop] = ev.target.value;
        newAwsItems[index] = newItem;
        setAwsTranscriptionItems(newAwsItems);
    }
    
    return(
        <>
            <div className="grid grid-cols-3 sticky top-0 bg-custom-color/90 p-2 rounded-md">
                <div>From</div>
                <div>End</div>
                <div>Caption</div>
            </div>
            {awsTranscriptionItems.length>0 && (
            <div className="h-64 sm:h-auto overflow-y-scroll sm:overflow-auto">
                {awsTranscriptionItems.map((item, key)=>(
                <div key={key}>
                    <TranscriptionItem
                        handleStartTimeChange={ev => updateTranscriptionItem(key, 'start_time',ev)}
                        handleEndTimeChange={ev => updateTranscriptionItem(key, 'end_time',ev)}
                        handleContentChange={ev => updateTranscriptionItem(key, 'content',ev)}
                        item={item}/>
                </div>
                ))}
            </div>
            )}
        </>
    );
}