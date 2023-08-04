import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function run() {
  const employee = await prisma.employee.upsert({
    where: { email: "employee@example.com" },
    update: {},
    create: {
      email: "employee@example.com",
      name: "Vivek",
    },
  });

 
  console.log({ employee });

}
run()



  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
