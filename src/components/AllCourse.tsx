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
  Textarea,
} from "@heroui/react";
import toast from "react-hot-toast";
import { AdminDeleteCourse, AdminEditEnrollCourse } from "@/app/api/Action";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

type AllCourse = {
  courses: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    code: string;
    description: string;
  }[];
};
type AllFiltered = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  code: string;
  description: string;
}[];

const AllCourse = ({ courses }: AllCourse) => {
  const router = useRouter();
  const [filtered, setFiltered] = useState<AllFiltered>(courses);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [enrollModal, setEnrollModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({
    id: 0,
    title: "",
    description: "",
    code: "",
  });

  const [enrollInfo, setEnrollInfo] = useState({
    id: 0,
    title: "",
    description: "",
    code: "",
  });
  const [newEnrollInfo, setNewEnrollInfo] = useState({
    title: "",
    description: "",
    code: "",
  });
  useEffect(() => {
    setFiltered(courses); // keep filtered in sync with courses if no search is active
  }, [courses]);
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

  const handleEnrollForthis = (
    title: string,
    id: number,
    description: string,
    code: string
  ) => {
    try {
      setEnrollInfo((prevData) => {
        return {
          ...prevData,
          code,
          description,
          id,
          title,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEnrollModal(true);
    }
  };
  const DeleteEnrollCourse = async () => {
    try {
      setLoading(true);
      if (!deleteInfo.id || deleteInfo.id < 1) {
        toast.error("Invalid credentials");
        return;
      }
      const courseId = deleteInfo.id;
      const response = await AdminDeleteCourse({ courseId });
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setNewEnrollInfo((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const EditCourse = async () => {
    try {
      setLoading(true);
      const code = newEnrollInfo.code ? newEnrollInfo.code : enrollInfo.code;
      const title = newEnrollInfo.title
        ? newEnrollInfo.title
        : enrollInfo.title;
      const description = newEnrollInfo.description
        ? newEnrollInfo.description
        : enrollInfo.description;
      if (!enrollInfo.id || enrollInfo.id < 1) {
        toast.error("Invalid credentials");
        return;
      }
      const courseId = enrollInfo.id;
      const response = await AdminEditEnrollCourse({
        courseId,
        code,
        title,
        description,
      });
      if (response.success) {
        router.refresh();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEnrollModal(false);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const result = courses.filter((eachCourse) => {
      return (
        eachCourse.code.toLowerCase().includes(value.toLowerCase()) ||
        eachCourse.description.toLowerCase().includes(value.toLowerCase()) ||
        eachCourse.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFiltered(value ? result : courses);
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
          <TableColumn>TITLE</TableColumn>
          <TableColumn>CODE</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Course Currently"}>
          {item.map((eachCourse, index) => (
            <TableRow key={index}>
              <TableCell>{eachCourse.title}</TableCell>
              <TableCell>{eachCourse.code}</TableCell>
              <TableCell>{eachCourse.description}</TableCell>
              <TableCell className="flex flex-row gap-5">
                <Button
                  onPress={() =>
                    handleEnrollForthis(
                      eachCourse.title,
                      eachCourse.id,
                      eachCourse.description,
                      eachCourse.code
                    )
                  }
                  className="bg-maindeep text-white"
                >
                  Edit
                </Button>
                <Button
                  onPress={() =>
                    handleRemoveEnroll(
                      eachCourse.title,
                      eachCourse.id,
                      eachCourse.description,
                      eachCourse.code
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
                  Remove {deleteInfo.title} Course from Enroll
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

      <Modal isOpen={enrollModal} onClose={() => setEnrollModal(false)}>
        <ModalContent>
          <ModalBody>
            <Card className="w-full mt-10 mx-auto">
              <CardBody className="w-full  p-5">
                <div className="w-full mx-auto rounded-lg p-5 border-2 border-maindeep">
                  <h1 className="text-maindeep text-center text-[1rem] font-semibold">
                    Edit Course
                  </h1>
                  <p className="text-maindeep text-center text-[0.8rem]">
                    Kindly enter your new course details
                  </p>
                  <div>
                    <form className="flex w-full h-60 overflow-y-auto no-scrollbar mt-10 flex-col gap-4">
                      <Input
                        label={"Title"}
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={newEnrollInfo.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e)
                        }
                      />
                      <Input
                        label={"Course Code"}
                        type="text"
                        placeholder="Course Code"
                        name="code"
                        value={newEnrollInfo.code}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e)
                        }
                      />
                      <Textarea
                        label={"Description"}
                        placeholder="Description"
                        name="description"
                        value={newEnrollInfo.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e)
                        }
                      />
                      <div className="mt-14">
                        {loading ? (
                          <Button
                            isLoading
                            disabled
                            className="w-full bg-maindeep text-white h-12"
                            type="button"
                          >
                            Updating...
                          </Button>
                        ) : (
                          <Button
                            className="w-full bg-maindeep text-white h-12"
                            type="submit"
                            onPress={() => EditCourse()}
                          >
                            Update
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setEnrollModal(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AllCourse;
