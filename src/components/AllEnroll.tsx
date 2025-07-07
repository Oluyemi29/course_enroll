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
  Button,
  Modal,
  ModalContent,
  ModalBody,
  Card,
  CardBody,
  ModalFooter,
  Input,
} from "@heroui/react";
import toast from "react-hot-toast";
import { AdminDeleteEnroll } from "@/app/api/Action";
import { FaSearch } from "react-icons/fa";

type AllEnroll = {
  enrolls: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    courseId: number;
    User: {
      name: string;
      email: string;
    };
    Course: {
      code: string;
      title: string;
      id: number;
      description: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};
type AllFiltered = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  courseId: number;
  User: {
    name: string;
    email: string;
  };
  Course: {
    code: string;
    title: string;
    id: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
}[];
const AllEnroll = ({ enrolls }: AllEnroll) => {
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filtered, setFiltered] = useState<AllFiltered>(enrolls);
  const [deleteInfo, setDeleteInfo] = useState({
    id: 0,
    title: "",
    description: "",
    code: "",
  });
  useEffect(() => {
    setFiltered(enrolls); // keep filtered in sync with courses if no search is active
  }, [enrolls]);

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

  const handleRemoveEnroll = (
    title: string,
    id: number,
    description: string,
    code: string
  ) => {
    setDeleteInfo((prevData) => {
      return {
        ...prevData,
        code,
        description,
        id,
        title,
      };
    });
    setDeleteModal(true);
  };

  const DeleteEnrollCourse = async () => {
    try {
      setLoading(true);
      if (!deleteInfo.id || deleteInfo.id < 1) {
        toast.error("Invalid credentials");
        return;
      }
      const enrollId = deleteInfo.id;
      const response = await AdminDeleteEnroll({ enrollId });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setDeleteModal(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const result = enrolls.filter((eachEnroll) => {
      return (
        eachEnroll.Course.code.toLowerCase().includes(value.toLowerCase()) ||
        eachEnroll.Course.title.toLowerCase().includes(value.toLowerCase()) ||
        eachEnroll.User.email.toLowerCase().includes(value.toLowerCase()) ||
        eachEnroll.User.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFiltered(value ? result : enrolls);
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
          <TableColumn>TITLE</TableColumn>
          <TableColumn>CODE</TableColumn>
          <TableColumn>ATION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Student Currently"}>
          {item.map((eachEnroll, index) => (
            <TableRow key={index}>
              <TableCell>{eachEnroll.User.name}</TableCell>
              <TableCell>
                {eachEnroll.User.email.slice(0, 3)}...
                {eachEnroll.User.email.slice(-10)}
              </TableCell>
              <TableCell>{eachEnroll.Course.title}</TableCell>
              <TableCell>{eachEnroll.Course.code}</TableCell>
              <TableCell>
                <Button
                  onPress={() =>
                    handleRemoveEnroll(
                      eachEnroll.Course.title,
                      eachEnroll.id,
                      eachEnroll.Course.description,
                      eachEnroll.Course.code
                    )
                  }
                  className="bg-red-700 text-white"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <ModalContent>
          <ModalBody>
            <Card className="w-full mt-10 mx-auto">
              <CardBody className="w-full p-5">
                <h1 className="text-maindeep font-semibold text-[0.9rem] text-center">
                  Remove {deleteInfo.title} from the Enroll Course
                </h1>
                <p className="text-center text-[0.7rem] text-maindeep">
                  {deleteInfo.description}
                </p>
                <div className="mt-10">
                  {loading ? (
                    <Button
                      className="bg-red-700 text-white"
                      disabled
                      isLoading
                    >
                      Removing...
                    </Button>
                  ) : (
                    <Button
                      className="bg-red-700 text-white"
                      onPress={() => DeleteEnrollCourse()}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setDeleteModal(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AllEnroll;
