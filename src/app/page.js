import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import UploadForm from "@/components/UploadForm";


export default function Home() {

  return (
    <>
    
    <PageHeaders 
    h1Text={'Add Captions to your videos'}
    h2Text={'Just upload your video'}
    />
    <div className="text-center">
    <UploadForm/>
    
    </div>
    <DemoSection/>
  </>
  );
}
