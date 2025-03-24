"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cars, type Car } from "@/app/data/cars";
import { notFound } from "next/navigation";

export default function CarDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const car = cars.find((c) => c.id === resolvedParams.id);

  if (!car) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-[#272D3C] text-white py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/cars"
            className="inline-flex items-center text-white hover:text-[#c1ff72] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Cars
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Car Images Section */}
          <div className="relative h-[600px] w-full">
            <Image
              src={car.imageUrl}
              alt={`${car.year} ${car.make} ${car.model}`}
              fill
              className="object-cover"
              priority
            />
            {car.savings && (
              <div className="absolute top-6 right-6">
                <span className="bg-[#c1ff72] text-[#1a1a1a] px-4 py-2 rounded-full text-sm font-semibold">
                  {car.savings}
                </span>
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Car Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold text-[#272D3C] mb-3">
                  {car.year} {car.make} {car.model}
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-semibold text-[#272D3C]">
                    KES {car.price.toLocaleString()}
                  </p>
                  {car.leasePrice && (
                    <p className="text-gray-600">
                      Lease from KES {car.leasePrice.toLocaleString()}/mo
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    car.status === "AVAILABLE"
                      ? "bg-[#c1ff72] text-[#1a1a1a]"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {car.status}
                </span>
              </div>
            </div>

            {/* Car Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-[#c1ff72] hover:text-[#1a1a1a] transition-colors">
                <p className="text-sm text-gray-600">Condition</p>
                <p className="font-semibold text-lg">{car.condition}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-[#c1ff72] hover:text-[#1a1a1a] transition-colors">
                <p className="text-sm text-gray-600">Mileage</p>
                <p className="font-semibold text-lg">
                  {car.mileage?.toLocaleString() || "N/A"} km
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-[#c1ff72] hover:text-[#1a1a1a] transition-colors">
                <p className="text-sm text-gray-600">Transmission</p>
                <p className="font-semibold text-lg">{car.transmission}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-[#c1ff72] hover:text-[#1a1a1a] transition-colors">
                <p className="text-sm text-gray-600">Engine</p>
                <p className="font-semibold text-lg">{car.engineSize}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#272D3C] mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {car.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#272D3C] mb-4">
                Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {car.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-[#c1ff72] hover:text-[#1a1a1a] transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-[#272D3C] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dealer Information */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={car.dealer.profileImage}
                      alt={car.dealer.name}
                      fill
                      className="rounded-full object-cover border-2 border-[#c1ff72]"
                    />
                    {car.dealer.verified && (
                      <div className="absolute -right-1 -bottom-1 bg-[#c1ff72] rounded-full p-1">
                        <svg
                          className="w-4 h-4 text-[#1a1a1a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-[#272D3C]">
                      {car.dealer.name}
                    </h3>
                    <p className="text-sm">
                      {car.dealer.online ? (
                        <span className="text-green-600">● Online now</span>
                      ) : (
                        <span className="text-gray-500">
                          Last seen {car.dealer.lastSeen}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="bg-[#272D3C] text-white px-6 py-3 rounded-xl hover:bg-[#1a1a1a] transition-colors">
                    Contact Dealer
                  </button>
                  <button className="border-2 border-[#272D3C] text-[#272D3C] px-6 py-3 rounded-xl hover:bg-[#c1ff72] hover:border-[#c1ff72] hover:text-[#1a1a1a] transition-colors">
                    Schedule Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
