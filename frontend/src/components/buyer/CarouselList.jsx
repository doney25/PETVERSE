import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Banner1 from "@/assets/f58di5ys.png";
import Banner2 from "@/assets/hyber7zu.png";
import Banner3 from "@/assets/pa9pkzlg.png";

const CarouselList = () => {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem>
            <img src={Banner1} alt="" className="w-3/4 h-80 object-cover mx-auto" />
          </CarouselItem>
          <CarouselItem>
            <img src={Banner2} alt="" className="w-3/4 h-80 object-cover mx-auto" />
          </CarouselItem>
          <CarouselItem>
            <img src={Banner3} alt="" className="w-3/4 h-80 object-cover mx-auto" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselList;
