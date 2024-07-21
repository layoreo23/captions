import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import UploadIcon from "@/components/uploadIcon";
export default function Home() {
  return (
    <>
    
    <PageHeaders 
    h1Text={'Add Captions to your videos'}
    h2Text={'Just upload your video'}
    />
    <div className="text-center">
      <button className="bg-custom-pink py-4 px-4 rounded-full inline-flex gap-2 border border-white">
        <UploadIcon/>
        <span>Choose File</span>
      </button>
    </div>
    <DemoSection/>
  </>
  );
}
