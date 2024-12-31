import React, { useState, useEffect } from "react";
import slide1 from "../assets/images/slide-01.jpg";
import slide2 from "../assets/images/slide-02.jpg";
import slide3 from "../assets/images/slide-03.jpg";

const Hero = () => {
  // State untuk menyimpan indeks slide saat ini
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array berisi data slide (gambar, teks, dan link)
  const slides = [
    {
      image: slide1, 
      preTitle: "Women Collection 2018", 
      title: "NEW SEASON", 
      link: "/shop", 
    },
    {
      image: slide2, 
      preTitle: "Men New-Season", 
      title: "Jackets & Coats", 
      link: "/shop", 
    },
    {
      image: slide3, 
      preTitle: "Men Collection 2018",
      title: "New arrivals", 
      link: "/shop",
    },
  ];

  // useEffect untuk membuat interval otomatis mengubah slide setiap 5 detik
  useEffect(() => {
    const slideInterval = setInterval(() => {
      // Pindah ke slide berikutnya dengan perhitungan siklus
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Interval waktu 5000ms (5 detik)

    return () => clearInterval(slideInterval); // Membersihkan interval saat komponen dilepas
  }, [slides.length]); // Efek dipicu saat jumlah slide berubah

  // Fungsi untuk berpindah ke slide berikutnya secara manual
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Pindah ke slide berikutnya
  };

  // Fungsi untuk berpindah ke slide sebelumnya secara manual
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Pindah ke slide sebelumnya
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />

          {/* Content */}
          <div className="relative container mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
            <div className="text-white text-left max-w-xl space-y-4 z-10">
              <div
                className="text-xl sm:text-2xl lg:text-3xl text-gray-200 
                                transform transition-all duration-700 ease-in-out"
                style={{
                  transform:
                    currentSlide === index
                      ? "translateY(0)"
                      : "translateY(20px)",
                  opacity: currentSlide === index ? 1 : 0,
                }}
              >
                {slide.preTitle}
              </div>

              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white
                                transform transition-all duration-1000 ease-in-out"
                style={{
                  transform:
                    currentSlide === index
                      ? "translateY(0)"
                      : "translateY(30px)",
                  opacity: currentSlide === index ? 1 : 0,
                  transitionDelay: "0.3s",
                }}
              >
                {slide.title}
              </div>

              <div
                className="transform transition-all duration-1000 ease-in-out"
                style={{
                  transform:
                    currentSlide === index
                      ? "translateY(0)"
                      : "translateY(40px)",
                  opacity: currentSlide === index ? 1 : 0,
                  transitionDelay: "0.6s",
                }}
              >
                <a
                  href={slide.link}
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 
                                    text-white rounded-lg text-lg transition duration-300 
                                    transform hover:scale-105 active:scale-95"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 z-20">
        <button
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
