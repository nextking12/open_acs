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
          content: `A typical PACS is organized in **layers**, from the software that sets policy down to the hardware at each door.

## The main layers

- **Management application** — where admins define cardholders, access levels, and schedules
- **Database** — stores configuration, credentials, and event history
- **Access controllers** — field devices that make real-time decisions
- **Readers** — mounted at doors to capture credentials
- **Door hardware** — electric locks, position switches, and request-to-exit devices
- **Network** — connects the controllers to the management services

> The software defines *policy*; the controllers and door hardware *enforce* it — even when the network is down.`,
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
          content: `A **credential** is what a person (or device) presents to prove they should be allowed in.

## Common credential types

- **Proximity cards** — low-cost 125 kHz cards; easy to use but easy to clone
- **Smart cards** — 13.56 MHz cards with encryption and mutual authentication
- **Mobile credentials** — stored in a phone wallet, presented over NFC or Bluetooth
- **PINs** — a memorized code entered on a keypad
- **Biometrics** — fingerprint, face, or iris matched against a stored template
- **Key fobs & visitor badges** — convenient or temporary credentials

## Single vs. multi-factor

Combining types — for example **card + PIN** — creates *multi-factor* access for higher-security doors.`,
        },
        {
          title: "How Readers Interpret Credentials",
          slug: "how-readers-interpret-credentials",
          content: `A **reader** captures credential data at the door and forwards it to a controller, which makes the actual decision.

## What happens at the reader

1. The credential is presented (tapped, swiped, or scanned)
2. The reader reads the raw data and converts it to a standard format
3. The data travels to the controller over a wiring protocol
4. The controller looks up the credential and decides grant or deny

## How readers differ

- **Frequency** — 125 kHz proximity vs. 13.56 MHz smart cards
- **Protocol** — legacy **Wiegand** vs. the secure, supervised **OSDP**
- **Encryption** — whether the card-to-reader exchange is protected
- **Extras** — keypads for PINs, or biometric sensors

> Prefer **OSDP** over Wiegand for new installs: it supports encryption and detects tampering or cut wires.`,
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
          content: `The **controller** is the brain of the door. It makes access decisions locally, so the system keeps working even if the network or server is unavailable.

## What a controller does

- Stores a local copy of cardholders, access levels, and schedules
- Decides **grant or deny** when a credential arrives
- Monitors inputs (door position, request-to-exit, tamper)
- Activates outputs (unlock the strike or mag lock)
- Buffers events and reports them to the management system

## Offline operation

Because decisions are made at the controller, doors keep enforcing policy during a network outage. Events are **buffered** locally and uploaded once the connection returns.`,
        },
        {
          title: "Door Hardware Basics",
          slug: "door-hardware-basics",
          content: `**Door hardware** is everything physical at the opening that locks, unlocks, and senses the door's state.

## Locking devices

- **Electric strikes** — release the strike plate so a latched door can open
- **Magnetic locks (mag locks)** — an electromagnet holds the door; removing power unlocks it
- **Electrified locksets** — a standard lock with electric control built in

## Sensing & exit devices

- **Door position switch (DPS)** — reports whether the door is open or closed
- **Request-to-exit (REX)** — lets people leave without presenting a credential
- **Power supplies & fire alarm interfaces** — provide power and release doors during an alarm

> **Fail-safe vs. fail-secure:** mag locks are *fail-safe* (unlock on power loss) for egress; many strikes are *fail-secure* (stay locked). Life-safety codes drive the choice.`,
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
          content: `An **access level** ties together *which doors* a person may use and *when* — so you can assign access by role instead of door-by-door.

## How access levels are built

An access level usually combines:

- One or more **doors** (or reader groups)
- A **schedule** that says when access is valid

## Assigning access

Cardholders are granted one or more access levels based on **role, department, location, or need**. A contractor might get "Lobby — business hours," while facilities staff get "All doors — 24/7."

> A clean set of reusable access levels is the single biggest factor in keeping a large system manageable.`,
        },
        {
          title: "Schedules and Holidays",
          slug: "schedules-and-holidays",
          content: `A **schedule** defines *when* something is valid — when a credential works, when a door auto-unlocks, or when an input is monitored.

## What schedules control

- Whether an access level is active at a given time
- **Auto-unlock** windows (for example, a lobby open 9–5)
- When alarms and inputs are armed

## Holidays

A **holiday** is a special date that overrides the normal weekly pattern. On a holiday, a "Mon–Fri 9–5" schedule can be treated as closed, so doors stay locked during a closure or special event.

> Define holidays once, centrally, so a single closure date applies everywhere it should.`,
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
          content: `An **access event** is a timestamped record of something that happened at a door or controller.

## Common events

- **Access granted** — valid credential, door released
- **Access denied** — credential not authorized for this door or time
- **Invalid credential** — unknown or expired card
- **Door forced open** — opened without a valid request
- **Door held open** — left open longer than allowed
- **Request to exit** — someone left via the REX device
- **Controller offline** — lost communication with the server

## Why they matter

Events drive **real-time monitoring** and alarms, and they accumulate into the history used for investigations and reporting.`,
        },
        {
          title: "Audit Trails",
          slug: "audit-trails",
          content: `An **audit trail** is the durable history of access events and administrative changes, used to answer "who did what, when, and where."

## What good audit records show

- **Who** — the cardholder or operator
- **What** — the action or decision
- **When** — an accurate timestamp
- **Where** — the door, controller, or system object affected

## What audit trails are used for

- Investigating incidents (who entered a room, and when)
- Demonstrating **compliance** with policies and regulations
- Tracking configuration changes (who edited an access level)

> An audit trail is only trustworthy if records can't be quietly altered — protect and back up the event history.`,
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
