// eslint-disable-next-line @typescript-eslint/no-require-imports
const { CourseList } = require("./../script/courselist");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("./../generated/prisma");

const prisma = new PrismaClient();
const runmain = async () => {
  await Promise.all(
    CourseList.map(async (eachCourseLiast) => {
      return await prisma.course.create({
        data: {
          code: eachCourseLiast.code,
          description: eachCourseLiast.description,
          title: eachCourseLiast.title,
        },
      });
    })
  );
};
runmain()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("Error while seeding database", e);
    await prisma.$disconnect();
    process.exit(1);
  });
