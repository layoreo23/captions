export function clearTranscriptionItems(items){
    items.forEach((item, key) => {
        if (!item.start_time){
            const prev = items[key-1];
            prev.alternatives[0].content += item.alternatives[0].content; 
            delete items[key];
        }             
    });
    return items.map(item=>{
        const {start_time,end_time}=item;
        const content=item.alternatives[0].content;
        return {start_time,end_time,content}
    });
}

function secondToHHMMSSMS(timeString){
    const d = new Date(parseFloat(timeString)*1000);
    return d.toISOString().slice(11,23).replace('.',',');
}
export function transcriptionItemsToSrt(items){
    let srt='';
    let i=1;
    items.filter(item => !!item).forEach(item => {
        //seq
        srt += i + "\n";
        //timestamps
        const {start_time, end_time} = item;
        srt += secondToHHMMSSMS(start_time)
            + ' --> '
            + secondToHHMMSSMS(end_time)
            + "\n";
        //content
        srt+=item.content+"\n";
        srt+="\n";
        i++;
    });
    return srt;
}