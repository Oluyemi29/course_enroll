"use client";
import { Button, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { AdminCreateCourse } from "@/app/api/Action";

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    title: z.string().min(2, { message: "Minimum of 2 character" }),
    code: z.string().min(2, { message: "Minimum of 2 character" }),
    description: z.string().min(2, { message: "Minimum of 2 character" }),
  });
  type formSchemaType = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (value: formSchemaType) => {
    try {
      setLoading(true);
      const { code, description, title } = value;
      const response = await AdminCreateCourse({ code, description, title });
      if (response.success) {
        toast.success(response.message);
        reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="md:w-2/6 mx-auto rounded-lg p-5 border-2 border-maindeep mb-10 mt-14">
        <h1 className="text-maindeep text-center text-[1rem] font-semibold">
          Create Course
        </h1>
        <p className="text-maindeep text-center text-[0.8rem]">
          Kindly enter your course details
        </p>
        <div>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex mt-10 flex-col gap-4"
          >
            <Input
              {...register("title")}
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
              label={"Title"}
              type="text"
              placeholder="Title"
            />
            <Input
              {...register("code")}
              isInvalid={!!errors.code}
              errorMessage={errors.code?.message}
              label={"Course Code"}
              type="text"
              placeholder="Course"
            />
            <Textarea
              {...register("description")}
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
              label={"Description"}
              placeholder="Description"
            />
            <div className="mt-14">
              {loading ? (
                <Button
                  isLoading
                  className="w-full bg-maindeep text-white h-12"
                  type="button"
                >
                  Registering...
                </Button>
              ) : (
                <Button
                  className="w-full bg-maindeep text-white h-12"
                  type="submit"
                >
                  Register
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
