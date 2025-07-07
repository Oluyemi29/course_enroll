import Student from "@/components/Student";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Student",
};

const page = async () => {
  noStore();
  const [allcourse, allenroll] = await Promise.all([
    await prisma.course.findMany(),
    await prisma.enroll.findMany({
      include: {
        Course: true,
      },
    }),
  ]);
  return (
    <div>
      <Student allcourse={allcourse} allenroll={allenroll} />
    </div>
  );
};

export default page;
