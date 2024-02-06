import Carousel from "../Carousel";

export default function HeroSection() {
  return (
    <div className="w-full mb-5">
      <Carousel autoSlide={true} autoSlideInterval={10000}>
        <div
          className="md:h-[80vh] h-[50vh] min-w-full  flex flex-col justify-center items-center"
          style={{
            backgroundImage: "url('/clothing_image.jpg')",
            backgroundPosition: "center",
            objectFit: "cover",
            // backgroundPosition: "right",
          }}
        >
          <p className="text-5xl text-white  shadow-inner shadow-xl font-extrabold`">
            A Store
          </p>
          <p className="text-lg text-white">The Smart Way to shop</p>
        </div>

        <div
          className="md:h-[80vh] h-[50vh] min-w-full"
          style={{
            backgroundImage: "url('/electronics.jpg')",
            backgroundPosition: "right",
            objectFit: "cover",
          }}
        ></div>
      </Carousel>
    </div>
  );
}
