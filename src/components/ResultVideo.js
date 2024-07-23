import SparkleIcon from "./sparkleIcon";

export default function ResultVideo({filename}) {
    return (
    <>
         <div className="mb-4">
                        <button className="bg-custom-pink py-4 px-4 rounded-full inline-flex gap-2 
                        border border-white cursor-pointer mb-4">
                            <SparkleIcon/>
                            <span>Apply Captions</span>
                            </button>
                            </div>
                        <div className="rounded-xl overflow-hidden">
                            <video
                            controls
                            className="rounded-xl"
                        src={"https://aleena-captions.s3.amazonaws.com/"+ filename}>
                        </video>
            </div>
    </>
    );
}
