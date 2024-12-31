import React from "react";
import bgAbout from "../assets/images/bg-01.jpg";
import bgAboutUs from "../assets/images/about-01.jpg";
import bgAboutUs2 from "../assets/images/about-02.jpg";

const About = () => {
  return (
    <>
      {/* Title Page */}
      <section
        className="bg-cover bg-center text-center py-24 px-4"
        style={{ backgroundImage: `url(${bgAbout})` }}
      >
        <h2 className="text-5xl text-white">About</h2>
      </section>

      {/* Content Page */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          {/* Our Story Section */}
          <div className="flex flex-col md:flex-row items-center pb-24">
            <div className="w-full md:w-7/12 lg:w-8/12 md:pr-16">
              <h3 className="text-3xl text-gray-800 pb-4">Our Story</h3>

              <div className="space-y-6 text-gray-600">
                <p>
                  Glamoura's journey began with a simple dream: to provide a
                  stage for talented local designers. We, a group of individuals
                  who have a deep love for the world of fashion, saw the great
                  untapped potential of MSMEs in Indonesia. Inspired by their
                  undying spirit, we decided to join forces and build Glamoura.
                </p>

                <p>
                  Every stitch, every motif, and every detail on every product
                  at Glamoura is the work of dedicated, skilled hands. We
                  believe that every designer has a unique story that they want
                  to tell through their work. Through Glamoura, those stories
                  can now be heard and enjoyed by many people.
                </p>
                <p>
                  From a small idea, Glamoura has now grown into a solid
                  community, uniting designers, fashion lovers, and all parties
                  who care about the development of the creative industry in
                  Indonesia. We are committed to continuing to provide full
                  support to local designers, so that they can continue to work
                  and inspire.
                </p>
              </div>
            </div>

            <div className="w-11/12 md:w-5/12 lg:w-4/12 mt-8 md:mt-0 mx-auto">
              <div className="border-2 border-gray-200 overflow-hidden">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={bgAboutUs}
                    alt="About Us"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="w-full md:w-7/12 lg:w-8/12 md:pl-16">
              <h3 className="text-3xl text-gray-800 pb-4">Our Mission</h3>

              <div className="space-y-6 text-gray-600">
                <p>
                  Our mision is to make Indonesian fashion more well-known in
                  the international arena, while also providing a positive
                  impact on the creative economy in the country. We believe that
                  everyone has the right to appear confident by wearing clothes
                  that reflect their personality.
                </p>

                <div className="border-l-4 border-gray-300 pl-8 py-4 mt-6 italic">
                  <p className="text-lg text-gray-700 mb-3">
                    "Creativity is just connecting things. When you ask creative
                    people how they did something, they feel a little guilty
                    because they didn't really do it, they just saw something.
                    It seemed obvious to them after a while."
                  </p>

                  <span className="text-sm text-gray-500">- Steve Jobs</span>
                </div>
              </div>
            </div>

            <div className="w-11/12 md:w-5/12 lg:w-4/12 mt-8 md:mt-0 mx-auto">
              <div className="border-2 border-gray-200 overflow-hidden">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={bgAboutUs2}
                    alt="Our Mission"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
