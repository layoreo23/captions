'use client';
import UploadIcon from "./uploadIcon";
import axios from "axios";
export default function UploadForm(){
    async function upload(ev){
        ev.preventDefault();
        const files = ev.target.files; 
        if (files.length>0){
            const file=files[0];  
             
            const res = await axios.postForm('/api/upload',{
                file,
            });
            console.log(res.data);
        }
      }
      
    return(     
    <label className="bg-custom-pink py-4 px-4 rounded-full inline-flex gap-2 border border-white cursor-pointer">
        <UploadIcon/>
        <span>Choose File</span>
        <input onChange={upload} type="file" className="hidden" />
      </label>);
}