import AdminNavbar from "@/components/AdminNavbar";
import AllEnroll from "@/components/AllEnroll";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Enroll Course",
};

const page = async () => {
  const enrolls = await prisma.enroll.findMany({
    include: {
      Course: true,
      User: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });
  return (
    <div>
        <AdminNavbar />
      <AllEnroll enrolls={enrolls} />
    </div>
  );
};

export default page;
