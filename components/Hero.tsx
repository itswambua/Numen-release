"use client";

import Image from "next/image";
import { PrimaryButton, OutlineButton } from "@/components/Button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-mountain-pattern text-white py-16 md:py-24">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Numen of <span className="text-rooster">Banda</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 italic">
              "A journey that transcends time and culture where ancient traditions clash with changing worlds"
            </p>
            <p className="text-lg mb-8 max-w-lg">
              Embark on an extraordinary adventure through iridescent landscapes where century-old rituals and generational wisdom are tested to the limit by an unstoppable new generation of trailblazers driven by unapologetic modernity. Within this vibrant tapestry of life, love, and destiny, Hillan K. Nzioka weaves a compelling tale of audacity and hope that will leave you at the edge of your seat.
            </p>
            <p className="text-lg mb-8 max-w-lg">
              <strong>Discover the story that readers can't put down – where every page reveals another layer of an exotic world yet intimately familiar.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton href="/purchase">Purchase Now</PrimaryButton>
              <OutlineButton href="/book" variant="light">
                Learn More
              </OutlineButton>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-96 md:w-80 md:h-112 shadow-2xl transition-transform hover:scale-105 duration-300">
              {/* Use the actual book cover image */}
              <Image
                src="/book-cover.jpg"
                alt="The Numen of Banda by Hillan K. Nzioka"
                width={320}
                height={480}
                className="rounded-lg shadow-xl"
              />

              {/* Price tag overlay */}
              <div className="absolute -top-4 -right-4 bg-rooster text-white text-lg font-bold py-2 px-4 rounded-full shadow-lg transform rotate-12">
                $26.99
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
