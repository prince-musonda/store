"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const previousSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide == 0 ? slides.length - 1 : currentSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide == slides.length - 1 ? 0 : currentSlide + 1
    );
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-2">
        {/* show left arrow button if we have more than one slide*/}
        {slides.length > 1 && (
          <button
            onClick={previousSlide}
            className="bg-white/80 shadow  rounded-full p-1 text-gray-800 hover:bg-white"
          >
            <ChevronLeft size={30} />
          </button>
        )}
        {/* show right arrow button if we have more than one slide*/}
        {slides.length > 1 && (
          <button
            onClick={nextSlide}
            className="bg-white/80 shadow  rounded-full p-1 text-gray-800 hover:bg-white"
          >
            <ChevronRight size={30} />
          </button>
        )}

        {/* carousl dots indicater */}
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => {
              return (
                <div
                  key={i}
                  className={`transition-all w-2 h-2 bg-white rounded-full ${
                    currentSlide == i ? "p-2" : "bg-opacity-50"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
