import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const course = {
  title: "Physical Access Control Fundamentals",
  slug: "physical-access-control-fundamentals",
  description:
    "Learn the core components, workflows, and terminology used in physical access control systems.",
  modules: [
    {
      title: "System Components",
      slug: "system-components",
      lessons: [
        {
          title: "What Is a Physical Access Control System?",
          slug: "what-is-a-physical-access-control-system",
          content: `A **physical access control system (PACS)** controls who can enter secured spaces such as buildings, rooms, gates, and cabinets.

## Core building blocks

Most systems combine a handful of cooperating parts:

- **Credentials** — what a person presents (card, PIN, mobile, biometric)
- **Readers** — capture the credential at the door
- **Controllers** — make the actual grant/deny decision
- **Door hardware** — locks, strikes, and sensors
- **Schedules & access levels** — *who* may enter, and *when*
- **Monitoring & audit history** — what happened, and when

> Together these answer one question: *should this person be allowed through this door right now?*`,
        },
        {
          title: "Common ACS Architecture",
          slug: "common-acs-architecture",
          content:
            "A typical architecture includes a management application, a database, access controllers, card readers, electric locks, door position switches, request-to-exit devices, and network connectivity between field hardware and software services.",
        },
      ],
    },
    {
      title: "Credentials and Readers",
      slug: "credentials-and-readers",
      lessons: [
        {
          title: "Credential Types",
          slug: "credential-types",
          content:
            "Credentials identify a person or device requesting access. Common examples include proximity cards, smart cards, mobile credentials, PINs, biometrics, key fobs, and temporary visitor badges.",
        },
        {
          title: "How Readers Interpret Credentials",
          slug: "how-readers-interpret-credentials",
          content:
            "Readers capture credential data and send it to a controller for a decision. Reader technologies vary by frequency, protocol, encryption capability, keypad support, biometric support, and installation environment.",
        },
      ],
    },
    {
      title: "Controllers and Door Hardware",
      slug: "controllers-and-door-hardware",
      lessons: [
        {
          title: "Controller Responsibilities",
          slug: "controller-responsibilities",
          content:
            "Controllers make access decisions, store local configuration, monitor inputs, activate lock outputs, and report events back to the management system. Many controllers can continue operating during a network outage.",
        },
        {
          title: "Door Hardware Basics",
          slug: "door-hardware-basics",
          content:
            "Door hardware commonly includes electric strikes, magnetic locks, electrified locksets, door position switches, request-to-exit devices, power supplies, and fire alarm interfaces.",
        },
      ],
    },
    {
      title: "Access Levels and Schedules",
      slug: "access-levels-and-schedules",
      lessons: [
        {
          title: "Access Levels",
          slug: "access-levels",
          content:
            "Access levels define which doors a person can use and under what conditions. They are usually assigned to cardholders based on role, department, location, or operational need.",
        },
        {
          title: "Schedules and Holidays",
          slug: "schedules-and-holidays",
          content:
            "Schedules define when access is valid. Holiday rules can override normal schedules so organizations can handle closures, special events, or reduced operating hours.",
        },
      ],
    },
    {
      title: "Events, Alarms, and Auditing",
      slug: "events-alarms-and-auditing",
      lessons: [
        {
          title: "Access Events",
          slug: "access-events",
          content:
            "Access events record decisions and activity such as access granted, access denied, invalid credential, door forced open, door held open, request to exit, and controller offline.",
        },
        {
          title: "Audit Trails",
          slug: "audit-trails",
          content:
            "Audit trails help administrators investigate incidents, validate compliance, and understand system changes. Good audit records show who did what, when it happened, and which system object was affected.",
        },
      ],
    },
  ],
};

async function main() {
  // Temporary stand-in for an authenticated user. Replaced by real login later.
  await prisma.user.upsert({
    where: { email: "dev@open-acs.local" },
    update: {},
    create: { email: "dev@open-acs.local", name: "Dev User" },
  });
  console.log("Seeded dev user: dev@open-acs.local");

  await prisma.course.upsert({
    where: { slug: course.slug },
    update: {
      title: course.title,
      description: course.description,
      modules: {
        deleteMany: {},
        create: course.modules.map((module, moduleIndex) => ({
          title: module.title,
          slug: module.slug,
          order: moduleIndex + 1,
          lessons: {
            create: module.lessons.map((lesson, lessonIndex) => ({
              title: lesson.title,
              slug: lesson.slug,
              content: lesson.content,
              order: lessonIndex + 1,
            })),
          },
        })),
      },
    },
    create: {
      title: course.title,
      slug: course.slug,
      description: course.description,
      modules: {
        create: course.modules.map((module, moduleIndex) => ({
          title: module.title,
          slug: module.slug,
          order: moduleIndex + 1,
          lessons: {
            create: module.lessons.map((lesson, lessonIndex) => ({
              title: lesson.title,
              slug: lesson.slug,
              content: lesson.content,
              order: lessonIndex + 1,
            })),
          },
        })),
      },
    },
  });

  console.log(`Seeded course: ${course.title}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
