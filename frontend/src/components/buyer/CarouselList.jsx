import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Banner1 from "@/assets/4azby2xl.png";
import Banner2 from "@/assets/6k9vnr6i.png";
import Banner3 from "@/assets/8939934.jpg";
import Banner4 from "@/assets/hyber7zu.png";

const CarouselList = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
      >
        <CarouselContent className="flex items-center">
          {[Banner3, Banner4, Banner2, Banner1].map((banner, index) => (
            <CarouselItem key={index} className="w-full">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-md p-2 rounded-full" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-md p-2 rounded-full" />
      </Carousel>
    </div>
  );
};

export default CarouselList;