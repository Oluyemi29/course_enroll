"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="w-full md:mt-10 mt-24">
      <div className="md:w-2/6 w-full border-2 mx-auto flex flex-col items-center justify-center border-maindeep rounded-md p-5">
        <h1 className="text-maindeep font-semibold">Welcome</h1>
        <Image
          src={"/grad-gown.png"}
          alt="gown"
          width={100}
          height={100}
          priority
          quality={95}
          className="w-[80%]"
        />
        <p className="text-maindeep text-[0.8rem] text-center">
          you are about to start a journey to success, congratulation in advance
        </p>
        <Button
          as={Link}
          href="/register"
          className="w-full h-12 bg-maindeep text-white mt-10"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Landing;
