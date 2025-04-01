import CarTypeBrowser from "@/components/CarTypeBrowser";
import CarManufacturerBrowser from "@/components/CarManufacturerBrowser";
import CarPlatformBanner from "@/components/Carbanner";
import CarPurchaseSteps from "@/components/CarPurchaseSteps";


export default function Home() {
  return (
    <div className="w-full">
      <CarPlatformBanner />
      <CarTypeBrowser />
      <CarManufacturerBrowser />
      <CarPurchaseSteps />
    </div>
  );
}
