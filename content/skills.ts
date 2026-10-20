import { skillsSchema } from "./schema";

// Source: the Technical Skills section of the CV. No proficiency percentages on purpose.
export const skills = skillsSchema.parse([
  {
    id: "languages",
    label: "Languages",
    plain: "The programming languages I write in.",
    items: ["Python", "Kotlin", "SQL", "JavaScript", "TypeScript", "C++"],
  },
  {
    id: "web-mobile",
    label: "Web & Mobile",
    plain: "Tools for building websites, apps, and live user interfaces.",
    items: ["Next.js", "React", "Node.js", "Express.js", "Socket.IO", "Jetpack Compose"],
  },
  {
    id: "backend-apis",
    label: "Backend & APIs",
    plain: "Services that sit behind an app and serve data to it.",
    items: ["FastAPI", "Express.js", "Streamlit", "Supabase"],
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    plain: "Moving, storing, and cleaning large amounts of data automatically.",
    items: ["Kafka", "Airflow", "dbt", "PostgreSQL", "MongoDB"],
  },
  {
    id: "ml-analytics",
    label: "Machine Learning & Analytics",
    plain: "Training models that learn patterns and make predictions.",
    items: ["XGBoost", "PyTorch", "Scikit-Learn", "Pandas", "Optuna"],
  },
  {
    id: "iot-devops",
    label: "IoT & Developer Tools",
    plain: "Connecting hardware sensors and packaging software so it runs anywhere.",
    items: ["MQTT", "ESP32", "Docker", "Git", "GitHub"],
  },
]);
