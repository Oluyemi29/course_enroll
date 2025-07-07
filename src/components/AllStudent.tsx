"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from "@heroui/react";
import moment from "moment";
import { FaSearch } from "react-icons/fa";

type AllStudent = {
  students: {
    name: string;
    email: string;
    role: "Student" | "Admin";
    createdAt: Date;
  }[];
};
type AllFiltered = {
  name: string;
  email: string;
  role: "Student" | "Admin";
  createdAt: Date;
}[];
const AllStudent = ({ students }: AllStudent) => {
  const [filtered, setFiltered] = useState<AllFiltered>(students);

  useEffect(() => {
    setFiltered(students); // keep filtered in sync with courses if no search is active
  }, [students]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages =
    filtered.length > rowsPerPage
      ? Math.ceil(filtered.length / rowsPerPage)
      : 0;
  const item = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filtered.slice(start, end);
  }, [filtered, rowsPerPage, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const result = students.filter((eachStudent) => {
      return (
        eachStudent.email.toLowerCase().includes(value.toLowerCase()) ||
        eachStudent.name.toLowerCase().includes(value.toLowerCase()) ||
        eachStudent.role.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFiltered(value ? result : students);
  };
  return (
    <div>
      <Input
        className="w-full my-4"
        placeholder={"Search"}
        endContent={<FaSearch />}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
      />
      <Table
        aria-label="Example static collection table"
        isStriped
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="default"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>CREATED</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Student Currently"}>
          {item.map((eachStudent, index) => (
            <TableRow key={index}>
              <TableCell>{eachStudent.name}</TableCell>
              <TableCell>{eachStudent.email}</TableCell>
              <TableCell>{eachStudent.role}</TableCell>
              <TableCell>{moment(eachStudent.createdAt).fromNow()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllStudent;
