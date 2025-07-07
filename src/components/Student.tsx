"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  CardHeader,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  CardFooter,
  Pagination,
} from "@heroui/react";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import { UserDeleteEnroll, UserEnrollCourse } from "@/app/api/Action";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";

type CategoryProps = {
  allcourse: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    code: string;
    description: string;
  }[];
  allenroll: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    courseId: number;
    Course: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      title: string;
      code: string;
      description: string;
    };
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

const Student = ({ allcourse, allenroll }: CategoryProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState<AllFiltered>(allcourse);
  const [page, setPage] = React.useState(1);
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
  useEffect(() => {
    setFiltered(allcourse); // keep filtered in sync with courses if no search is active
  }, [allcourse]);
  const MyEnroll = allenroll.filter((eachEnroll) => {
    return eachEnroll.userId === Number(session?.user.id as number);
  });

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
    setEnrollInfo((prevData) => {
      return {
        ...prevData,
        code,
        description,
        id,
        title,
      };
    });
    setEnrollModal(true);
  };
  const DeleteEnrollCourse = async () => {
    try {
      setLoading(true);
      if (!deleteInfo.id || deleteInfo.id < 1) {
        toast.error("Invalid credentials");
        return;
      }
      const enrollId = deleteInfo.id;
      const userId = session?.user.id as number;
      const response = await UserDeleteEnroll({ enrollId, userId });
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

  const AddEnrollCourse = async () => {
    try {
      setLoading(true);
      if (!enrollInfo.id || enrollInfo.id < 1) {
        toast.error("Invalid credentials");
        return;
      }
      const courseId = enrollInfo.id;
      const userId = session?.user.id as number;
      const response = await UserEnrollCourse({ courseId, userId });
      if (response.success) {
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
    const result = allcourse.filter((eachCourse) => {
      return (
        eachCourse.code.toLowerCase().includes(value.toLowerCase()) ||
        eachCourse.description.toLowerCase().includes(value.toLowerCase()) ||
        eachCourse.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFiltered(value ? result : allcourse);
  };
  return (
    <div>
      <div className="flex mt-5 flex-row justify-between items-center">
        <div className="">
          <h1 className="text-maindeep text-[0.9rem] font-semibold">
            {session?.user.name}
          </h1>
          <p className="text-[0.7rem] text-maindeep">
            {session?.user.email.slice(0, 3)}...{session?.user.email.slice(-9)}
          </p>
        </div>
        <Button onPress={() => signOut()} className="bg-red-700 text-white">
          Logout
        </Button>
      </div>
      <div className="flex w-full mt-10 flex-col">
        <Tabs aria-label="Options" className="">
          <Tab
            key="allcourse"
            title={
              <div className="flex items-center space-x-2">
                <HiMiniAcademicCap className="text-maindeep" />
                <span className="text-maindeep font-semibold">All Course</span>
              </div>
            }
          >
            <Card>
              <CardHeader className="flex flex-col w-full items-center justify-center">
                <h1 className="font-semibold text-center underline underline-offset-2 text-maindeep">
                  All Course
                </h1>
                <Input
                  className="w-full my-4"
                  placeholder={"Search"}
                  endContent={<FaSearch />}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearch(e)
                  }
                />
              </CardHeader>
              <CardBody className="text-maindeep">
                {item.length < 1 ? (
                  <div className="my-10 text-center">
                    <h1 className="text-maindeep font-semibold">
                      no Course available currently
                    </h1>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 w-full">
                    {item.map((eachCourse, index) => {
                      return (
                        <div
                          className="w-full rounded-md p-2 odd:bg-slate-200 even:bg-transparent text-[0.9rem] flex flex-col md:flex-row gap-5"
                          key={index}
                        >
                          <div className="md:w-2/12 flex flex-col">
                            <p className="underline underline-offset-2">
                              Title
                            </p>
                            <p className="">{eachCourse.title}</p>
                          </div>
                          <div className="md:w-6/12 h-20 no-scrollbar overflow-y-auto">
                            <p className="underline underline-offset-2">
                              Description
                            </p>
                            <p className="">{eachCourse.description}</p>
                          </div>
                          <div className="md:w-2/12">
                            <p className="underline underline-offset-2">
                              Course Code
                            </p>
                            <p>{eachCourse.code}</p>
                          </div>
                          <div>
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
                              Enroll
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardBody>
              <CardFooter className="flex justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="default"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </CardFooter>
            </Card>
          </Tab>

          <Tab
            key="myenrollcourse"
            title={
              <div className="flex items-center space-x-2">
                <HiMiniAcademicCap className="text-maindeep" />
                <span className="text-maindeep font-semibold">
                  My Enroll Course
                </span>
              </div>
            }
          >
            <Card>
              <CardHeader className="flex w-full items-center justify-center">
                <h1 className="font-semibold text-center underline underline-offset-2 text-maindeep">
                  My Enroll Course
                </h1>
              </CardHeader>
              <CardBody className="text-maindeep">
                {MyEnroll.length < 1 ? (
                  <div className="my-10 text-center">
                    <h1 className="text-maindeep font-semibold">
                      You have no Course enrolled currently
                    </h1>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 w-full">
                    {MyEnroll.map((eachEnroll, index) => {
                      return (
                        <div
                          className="w-full rounded-md p-2 odd:bg-slate-200 even:bg-transparent text-[0.9rem] flex flex-col md:flex-row gap-5"
                          key={index}
                        >
                          <div className="md:w-2/12 flex flex-col">
                            <p className="">Title</p>
                            <p className="">{eachEnroll.Course.title}</p>
                          </div>
                          <div className="md:w-6/12 h-20 no-scrollbar overflow-y-auto">
                            <p>Description</p>
                            <p className="">{eachEnroll.Course.description}</p>
                          </div>
                          <div className="md:w-2/12">
                            <p>Course Code</p>
                            <p>{eachEnroll.Course.code}</p>
                          </div>
                          <div>
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
                              Remove
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <ModalContent>
          <ModalBody>
            <Card className="w-full mt-10 mx-auto">
              <CardBody className="w-full p-5">
                <h1 className="text-maindeep font-semibold text-[0.9rem] text-center">
                  Remove {deleteInfo.title} Course from Your Enroll
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
              <CardBody className="w-full p-5">
                <h1 className="text-maindeep font-semibold text-[0.8rem] text-center">
                  Add {enrollInfo.title} to your Enroll Course
                </h1>
                <p className="text-center text-[0.7rem] text-maindeep">
                  {enrollInfo.description}
                </p>
                <div className="mt-10">
                  {loading ? (
                    <Button
                      className="bg-maindeep text-white"
                      disabled
                      isLoading
                    >
                      Enrolling...
                    </Button>
                  ) : (
                    <Button
                      className="bg-maindeep text-white"
                      onPress={() => AddEnrollCourse()}
                    >
                      Enroll
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

export default Student;
