import { profileSchema } from "./schema";

// Drafted from the CV. needsReview stays true until the owner approves the wording.
export const profile = profileSchema.parse({
  name: "Johannes De Deo Dimas Aryobimo",
  headline: "Software & Data Engineering student",
  tagline:
    "I build software and data systems, from live data pipelines to mobile apps and sensor dashboards.",
  location: "Indonesia",
  photo: "/images/profile.jpg",
  photoAlt: "Portrait of Johannes De Deo Dimas Aryobimo wearing a brown and gold batik shirt",
  bio: [
    "Information engineering student at Universitas Gadjah Mada, currently focused on software engineering and data engineering. Active in student tech communities as an organizer and mentor",
  ],
  education: {
    school: "Universitas Gadjah Mada",
    degree: "Undergraduate, Information Engineering",
    years: "2024 – 2028",
  },
  experience: [
    {
      organization: "KMTETI, Workshop Division",
      role: "Member of KMTETI Workshop Division",
      period: "2026 – Present",
      points: [
        "Ran a 6-session Data Science training for 60+ participants and acted as the link between participants and mentors.",
        "Led a 30+ member committee for Bootcamp TETI 2026 (100+ participants): mentor recruitment, timeline planning, and on-site supervision.",
      ],
    },
    {
      organization: "Night Login Data Science Community",
      role: "Deputy Head",
      period: "2026 – Present",
      points: [
        "Organized hybrid (online and in-person) Data Science trainings and workshops for 50+ members.",
        "Mentored members preparing for national Data Science competitions.",
      ],
    },
  ],
  achievements: [
    {
      title: "1st Place, VaniGrow (Bootcamp TETI 2026)",
      detail: "Won first place out of 11 teams with a real-time crop disease risk monitoring system.",
      date: "July 2026",
    },
    {
      title: "2nd Place, AEMADS (Bootcamp TETI 2026)",
      detail: "Won second place with a native Android app for factory power monitoring.",
      date: "July 2026",
    },
    {
      title: "1st Place, TETI Programming Week",
      detail: "Data Science competition on Kaggle and deliver presentation.",
      date: "October 2025",
    },
  ],
  interests: [
    {
      label: "Software engineering",
      items: ["Next.js", "React", "Express.js", "FastAPI", "Kotlin"],
    },
    {
      label: "Data engineering",
      items: ["Python", "Kafka", "Airflow", "dbt", "PostgreSQL"],
    },
  ],
  stats: [
    { value: 100, suffix: "+", label: "participants in Bootcamp TETI 2026, which I helped lead" },
    { value: 60, suffix: "+", label: "people trained in a Data Science course" },
    { value: 30, suffix: "+", label: "committee members led" },
    { value: 50, suffix: "+", label: "community members I organized trainings for" },
  ],
  needsReview: true,
});
