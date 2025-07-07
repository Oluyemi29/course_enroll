import AdminNavbar from "@/components/AdminNavbar";
import AllStudent from "@/components/AllStudent";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "All Student",
};
const page = async () => {
  noStore();
  const students = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
  return (
    <div>
      <AdminNavbar />
      <AllStudent students={students} />
    </div>
  );
};

export default page;
