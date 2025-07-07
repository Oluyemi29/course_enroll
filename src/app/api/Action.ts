"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

interface UserRegisterProps {
  name: string;
  email: string;
  password: string;
}
export const UserRegister = async ({
  email,
  name,
  password,
}: UserRegisterProps) => {
  try {
    if (!email || !name || !password) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existStudent = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existStudent) {
      return {
        success: false,
        message: "User already exist",
      };
    }
    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );
    const register = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
        role: "Student",
      },
    });
    if (register) {
      revalidatePath("/admin");
      return {
        success: true,
        message: "User register successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when registering",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface AdminRegisterProps {
  email: string;
  password: string;
}

export const AdminRegister = async ({
  email,
  password,
}: AdminRegisterProps) => {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existAdmin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (existAdmin) {
      return {
        success: false,
        message: "Admin already exist",
      };
    }
    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );
    const register = await prisma.admin.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    if (register) {
      return {
        success: true,
        message: "Admin register successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when registering admin",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface CreateCourseProps {
  code: string;
  description: string;
  title: string;
}
export const AdminCreateCourse = async ({
  code,
  description,
  title,
}: CreateCourseProps) => {
  try {
    if (!code || !description || !title) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existCourse = await prisma.course.findFirst({
      where: {
        title,
        code,
        description,
      },
    });
    if (existCourse) {
      return {
        success: false,
        message: "Course already created",
      };
    }
    const course = await prisma.course.create({
      data: {
        code,
        description,
        title,
      },
    });
    if (course) {
      revalidatePath("/admin/createcourse");
      revalidatePath("/student");
      return {
        success: true,
        message: "Course register successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when registering course",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface UserDeleteEnrollProps {
  enrollId: number;
  userId: number;
}
export const UserDeleteEnroll = async ({
  enrollId,
  userId,
}: UserDeleteEnrollProps) => {
  try {
    if (!userId || !enrollId) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existEnroll = await prisma.enroll.findUnique({
      where: {
        id: enrollId,
        userId,
      },
    });
    if (!existEnroll) {
      return {
        success: false,
        message: "Enroll course not found",
      };
    }
    const deleteEnroll = await prisma.enroll.delete({
      where: {
        id: enrollId,
      },
    });
    if (deleteEnroll) {
      revalidatePath("/student");
      revalidatePath("/admin/enrollcourse");
      return {
        success: true,
        message: "Enroll course remove successfully",
      };
    } else {
      return {
        success: false,
        message: "error when removing enroll course",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};
interface UserEnrollCourseProps {
  courseId: number;
  userId: number;
}
export const UserEnrollCourse = async ({
  courseId,
  userId,
}: UserEnrollCourseProps) => {
  try {
    if (!userId || !courseId) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existEnroll = await prisma.enroll.findFirst({
      where: {
        courseId: courseId,
        userId,
      },
    });
    if (existEnroll) {
      return {
        success: false,
        message: "You already enroll for this course",
      };
    }
    const enrollCourse = await prisma.enroll.create({
      data: {
        courseId,
        userId,
      },
    });
    if (enrollCourse) {
      revalidatePath("/student");
      revalidatePath("/admin/enrollcourse");
      return {
        success: true,
        message: "Course Enrolled successfully",
      };
    } else {
      return {
        success: false,
        message: "error when enrolling course",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface AdminDeleteEnrollProps {
  enrollId: number;
}

export const AdminDeleteEnroll = async ({
  enrollId,
}: AdminDeleteEnrollProps) => {
  try {
    if (!enrollId) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existEnroll = await prisma.enroll.findUnique({
      where: {
        id: enrollId,
      },
    });
    if (!existEnroll) {
      return {
        success: false,
        message: "Enroll course not found",
      };
    }
    const removeEnroll = await prisma.enroll.delete({
      where: {
        id: enrollId,
      },
    });
    if (removeEnroll) {
      revalidatePath("/student");
      revalidatePath("/admin/enrollcourse");
      return {
        success: true,
        message: "Enroll course deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when removing enroll course",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface AdminDeleteCourseProps {
  courseId: number;
}

export const AdminDeleteCourse = async ({
  courseId,
}: AdminDeleteCourseProps) => {
  try {
    if (!courseId) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!existCourse) {
      return {
        success: false,
        message: "course not found",
      };
    }
    const removeCourse = await prisma.course.delete({
      where: {
        id: courseId,
      },
    });
    if (removeCourse) {
      revalidatePath("/student");
      revalidatePath("/admin/allcourse");
      return {
        success: true,
        message: "Course deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when removing course",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface AdminEditEnrollCourseProps {
  courseId: number;
  code: string;
  title: string;
  description: string;
}

export const AdminEditEnrollCourse = async ({
  courseId,
  code,
  title,
  description,
}: AdminEditEnrollCourseProps) => {
  try {
    if (!courseId || !code || !title || !description) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!existCourse) {
      return {
        success: false,
        message: "course not found",
      };
    }
    const editCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        code,
        title,
        description,
      },
    });
    if (editCourse) {
      revalidatePath("/admin/allcourse", "page");
      return {
        success: true,
        message: "Course edited successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when editing course",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};
