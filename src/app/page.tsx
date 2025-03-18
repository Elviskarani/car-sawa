import CarTypeBrowser from "@/components/CarTypeBrowser";
import CarManufacturerBrowser from "@/components/CarManufacturerBrowser";
import HowItWorks from "@/components/Howitworks";



export default function Home() {
  return (
    <div className="w-full">
      <CarTypeBrowser />
      <CarManufacturerBrowser />
      <HowItWorks />

     

    </div>
  );
}
