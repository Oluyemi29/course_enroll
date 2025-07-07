import AdminNavbar from "@/components/AdminNavbar";
import CreateCourse from "@/components/CreateCourse";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Course",
};

const page = async () => {
  return (
    <div>
      <AdminNavbar />
      <CreateCourse />
    </div>
  );
};

export default page;
