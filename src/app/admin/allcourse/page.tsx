import AdminNavbar from "@/components/AdminNavbar";
import AllCourse from "@/components/AllCourse";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "All Course",
};

const page = async () => {
  noStore();
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <AdminNavbar />
      <AllCourse courses={courses} />
    </div>
  );
};

export default page;
