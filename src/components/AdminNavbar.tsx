"use client";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="w-full my-6">
      <div className="md:w-max w-[95%] no-scrollbar overflow-x-scroll mx-auto flex flex-row gap-5">
        <Button
          as={Link}
          href="/admin"
          className="bg-maindeep min-w-max text-white"
        >
          All Student
        </Button>
        <Button
          as={Link}
          href="/admin/allcourse"
          className="bg-maindeep min-w-max text-white"
        >
          All Course
        </Button>
        <Button
          as={Link}
          href="/admin/createcourse"
          className="bg-maindeep min-w-max text-white"
        >
          Create Course
        </Button>
        <Button
          as={Link}
          href="/admin/enrollcourse"
          className="bg-maindeep min-w-max text-white"
        >
          Enrolled Course
        </Button>
        <Button
          onPress={() => signOut()}
          className="text-white min-w-max bg-red-700"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminNavbar;
