import { projectsSchema } from "./schema";

/**
 * Sources: project READMEs on github.com/beambomb and the CV.
 * Wording is written in plain English by the assistant. Every entry keeps
 * needsReview: true until the owner confirms accuracy and role descriptions.
 */
export const projects = projectsSchema.parse([
  {
    slug: "vanigrow",
    title: "VaniGrow",
    domain: "IoT",
    period: "July 2026",
    award: "1st Place out of 11 teams, Bootcamp TETI 2026",
    oneLiner:
      "A sensor system that warns vanilla farmers when greenhouse conditions make a fungal disease likely.",
    problem: [
      "Vanilla plants can be damaged by a fungal disease called Fusarium stem rot, which thrives when the air is warm and humid in the wrong way.",
      "Farmers usually find out after the damage has started, because nobody watches the greenhouse climate around the clock.",
    ],
    solution: [
      "Sensors in the greenhouse measure air temperature, humidity, and leaf temperature. The system turns those readings into a measure called vapor pressure deficit (VPD) and tracks how long conditions stay risky.",
      "A live dashboard shows the current risk and lets an operator switch a fan or vent remotely. It can also export a daily report as PDF or CSV.",
    ],
    results: [
      "Won 1st place out of 11 teams at Bootcamp TETI 2026, judged by external mentors.",
      "Delivered a working path from sensor to dashboard: ESP32 sensors, a message broker, a Node.js bridge, a database, and a live Next.js 16 dashboard.",
    ],
    role: "Designed the event-driven data pipeline from the ESP32 sensors through MQTT and the Node.js bridge to Supabase and the Next.js dashboard.",
    tags: ["ESP32", "MQTT", "Node.js", "Supabase", "Next.js", "Recharts"],
    stack: [
      { label: "Edge", items: ["ESP32 (C++ firmware)", "DHT22", "MLX90614", "Wokwi simulator"] },
      { label: "Messaging", items: ["MQTT"] },
      { label: "Backend", items: ["Node.js bridge", "Supabase (PostgreSQL)"] },
      { label: "Dashboard", items: ["Next.js 16", "Recharts"] },
    ],
    architecture: {
      summary: "Readings travel from the greenhouse to the screen in a few steps, and commands travel back the same way.",
      steps: [
        { label: "ESP32 sensors", detail: "Measure air and leaf conditions and listen for commands." },
        { label: "MQTT broker", detail: "Carries readings, device status, and commands." },
        { label: "Node.js bridge", detail: "Validates readings and writes them to the database." },
        { label: "Supabase", detail: "Stores sensor logs and device status." },
        { label: "Next.js dashboard", detail: "Shows live risk, charts, and remote controls." },
      ],
    },
    decisions: [
      {
        title: "Risk based on VPD and duration",
        why: "Fungal risk depends on how long conditions stay unfavorable, so the model accumulates time above thresholds instead of reacting to a single reading.",
      },
      {
        title: "Two-way control over MQTT",
        why: "The same channel that brings readings in also carries fan and vent commands out, which keeps the hardware side simple.",
      },
    ],
    limitations: [],
    repoUrl: "https://github.com/beambomb/VaniGrow-monitoring",
    needsReview: true,
  },
  {
    slug: "aemads",
    title: "AEMADS",
    domain: "Mobile",
    period: "July 2026",
    award: "2nd Place, Bootcamp TETI 2026",
    oneLiner:
      "An Android app that lets factory technicians watch machine power usage live and get alerted to problems.",
    problem: [
      "In factories, electrical problems such as sudden power spikes or slow drifts in power quality can damage machines.",
      "Monitoring usually happens in a central control room, so technicians on the floor hear about problems late.",
    ],
    solution: [
      "AEMADS puts live power data on the technician's phone, with charts and a color-coded alarm map across four production lines: red for a spike, yellow for a drift.",
      "Technicians can photograph damaged machines in the app, link the photo to the related alert, and export energy data as CSV or PDF.",
    ],
    results: [
      "Won 2nd place at Bootcamp TETI 2026, judged by external mentors.",
      "Built as a native Android app. The data feed is simulated by a Python generator, not by real factory equipment.",
    ],
    role: "Built the app architecture and implementation: MVVM with Jetpack Compose and StateFlow, polling Supabase for live readings, charts, and camera-based damage reporting.",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Supabase", "Vico", "Python"],
    stack: [
      { label: "Mobile", items: ["Kotlin", "Jetpack Compose", "MVVM + StateFlow", "Vico charts", "Coil"] },
      { label: "Backend", items: ["Supabase (PostgreSQL + Storage)"] },
      { label: "Simulation", items: ["Python generator"] },
    ],
    architecture: {
      summary: "A simulator feeds the database, and the app reads from it every two seconds.",
      steps: [
        { label: "Python generator", detail: "Simulates four production lines, including spikes and drifts." },
        { label: "Supabase database", detail: "Stores energy logs and damage reports." },
        { label: "REST polling (2 s)", detail: "The app asks for the latest readings on a short timer." },
        { label: "Android app", detail: "Shows charts, the alarm map, and the damage report form." },
      ],
    },
    decisions: [
      {
        title: "Polling every 2 seconds instead of WebSockets",
        why: "Factory and campus networks often cut long-lived connections, and technicians walk through weak-signal areas. Short repeated requests recover on their own and keep the server load low.",
      },
    ],
    limitations: ["Uses simulated data rather than a live factory feed."],
    repoUrl: "https://github.com/beambomb/AEMADS",
    needsReview: true,
  },
  {
    slug: "turbofan-predictive-maintenance",
    title: "Turbofan Predictive Maintenance",
    domain: "Data",
    period: "October 2026",
    oneLiner:
      "A prototype that estimates how much life a jet engine has left, so maintenance can happen before a failure.",
    problem: [
      "Airlines can fix engines only after they fail, or inspect them on a fixed schedule. The first is risky and expensive, and the second wastes inspections on healthy engines.",
    ],
    solution: [
      "The system replays engine sensor data from NASA's public C-MAPSS dataset as a live stream, stores and transforms it, and uses a machine learning model to predict remaining useful life (RUL) for each engine.",
      "Predictions are served through an API and a live feed, and a fleet dashboard shows which engines need attention. It includes a simulator that compares maintenance strategies.",
    ],
    results: [
      "On the official NASA test set of 100 engines the tuned model scored RMSE 13.88, MAE 10.18, and NASA score 342.71.",
      "In the project's own cost simulation, inspecting when predicted life drops to 25 cycles or less cost far less than waiting for failures. This is illustrative: it assumes every alert gets a timely inspection.",
    ],
    role: "Built the prototype end to end: streaming ingestion, data modeling, model training, API, dashboard, containerization, and CI.",
    tags: ["Kafka", "PostgreSQL", "dbt", "XGBoost", "FastAPI", "Streamlit", "Docker"],
    stack: [
      { label: "Streaming & storage", items: ["Apache Kafka (KRaft)", "PostgreSQL"] },
      { label: "Transformation", items: ["dbt", "Parquet feature store (38 features)"] },
      { label: "Machine learning", items: ["XGBoost", "ONNX Runtime", "Python"] },
      { label: "Serving & UI", items: ["FastAPI (REST + WebSocket)", "Streamlit"] },
      { label: "Quality & ops", items: ["Docker Compose", "pytest", "CI"] },
    ],
    architecture: {
      summary: "Sensor data flows left to right, from a replayed stream to a decision dashboard.",
      steps: [
        { label: "Telemetry replay", detail: "Replays engine sensor data as a stream of events." },
        { label: "Kafka", detail: "Delivers events reliably to the next stage." },
        { label: "PostgreSQL", detail: "Stores the time series in a warehouse." },
        { label: "dbt features", detail: "Builds rolling statistics and wear indicators." },
        { label: "XGBoost model", detail: "Predicts remaining useful life per engine." },
        { label: "FastAPI + Streamlit", detail: "Serves predictions and shows fleet health." },
      ],
    },
    decisions: [
      {
        title: "Model tournament",
        why: "Four model types were compared on held-out engines before choosing the tuned XGBoost model as champion.",
      },
      {
        title: "Honest benchmarking",
        why: "Results are compared with published papers. Some published models score better, so this is presented as a working prototype, not a state-of-the-art claim.",
      },
    ],
    limitations: [
      "Uses one operating condition and one fault type from the FD001 dataset.",
      "Sensor data is simulated, with no dropouts or calibration drift.",
      "The cost comparison uses illustrative cost figures.",
    ],
    repoUrl: "https://github.com/beambomb/turbofan-predictive-maintenance",
    needsReview: true,
  },
  {
    slug: "weather-elt-pipeline",
    title: "Weather ELT Pipeline",
    domain: "Data",
    period: "October 2026",
    oneLiner:
      "An automated pipeline that collects weather data for 20 Indonesian cities every day and prepares it for analysis.",
    problem: [
      "Weather data from public APIs arrives as raw, nested JSON. Analysts cannot query it directly, and collecting it by hand does not scale or stay reliable.",
    ],
    solution: [
      "A daily job fetches hourly weather for 20 cities across six island groups, retries when the API fails, and saves the raw responses to a database.",
      "A transformation step cleans the data and reshapes it into a star schema, a layout built for fast analytical questions. Automated tests check the data, and the whole system runs in containers.",
    ],
    results: [
      "Each run produces 480 hourly records (20 cities, 24 hours).",
      "18 automated data tests check uniqueness, missing values, and links between tables.",
    ],
    role: "Designed and built the pipeline: extraction, loading, dimensional modeling, tests, orchestration, and containerization.",
    tags: ["Python", "Airflow", "dbt", "PostgreSQL", "Docker"],
    stack: [
      { label: "Ingestion", items: ["Python", "Open-Meteo REST API"] },
      { label: "Storage", items: ["PostgreSQL (JSONB raw layer)"] },
      { label: "Transformation", items: ["dbt Core", "Kimball star schema"] },
      { label: "Orchestration", items: ["Apache Airflow (LocalExecutor)", "Docker Compose"] },
    ],
    architecture: {
      summary: "Extract and load first, transform afterwards (ELT), with a scheduler running the steps in order.",
      steps: [
        { label: "Open-Meteo API", detail: "Source of hourly weather for 20 cities." },
        { label: "Python extract & load", detail: "Uses retries with exponential backoff." },
        { label: "PostgreSQL raw layer", detail: "Keeps untouched JSON payloads." },
        { label: "dbt staging + star schema", detail: "Cleans, de-duplicates, and models facts and dimensions." },
        { label: "Airflow DAG", detail: "Runs load, dbt run, and dbt test daily." },
      ],
    },
    decisions: [
      {
        title: "Kimball dimensional modeling",
        why: "A central fact table with dimension tables keeps analytical queries to simple joins, instead of many-table joins.",
      },
      {
        title: "Surrogate keys",
        why: "Generated keys decouple the analytics tables from upstream identifier changes.",
      },
    ],
    limitations: [],
    repoUrl: "https://github.com/beambomb/ELT-Weather-Pipeline",
    needsReview: true,
  },
  {
    slug: "carikos",
    title: "CariKos",
    domain: "Web",
    period: "September 2026 – Present",
    oneLiner:
      "A web platform that gathers boarding-house listings near campus in one place, with verified information.",
    problem: [
      "Information about boarding houses (kos) near campus is spread across WhatsApp groups, social media, and banners. It is hard to find a complete, current, trustworthy listing.",
    ],
    solution: [
      "CariKos serves three kinds of users. Seekers search and filter listings, find the nearest ones, save favorites, book rooms, leave reviews, and chat with owners. Owners manage their listings, room availability, photos, and incoming bookings. Admins verify listings before they go public.",
    ],
    results: [
      "Room booking updates available rooms automatically when an owner approves a request.",
      "Role-based access control with protection against users promoting themselves to admin.",
      "A Postman test suite with 33 automated assertions covers the API.",
    ],
    role: "Coordinated a 4-person course team (technical decisions, meetings, task split) and built the admin module: kos verification, role-based access control, and a statistics dashboard. Also worked on booking, reviews, nearby search, image upload, and real-time chat and notifications.",
    tags: ["Node.js", "Express", "MongoDB", "Socket.IO", "JWT", "Cloudinary"],
    stack: [
      { label: "Backend", items: ["Node.js", "Express", "JWT + bcrypt"] },
      { label: "Database", items: ["MongoDB"] },
      { label: "Real-time", items: ["Socket.IO"] },
      { label: "Media", items: ["Cloudinary", "Multer"] },
      { label: "Testing", items: ["Postman"] },
    ],
    architecture: {
      summary: "One API serves three roles, with a real-time channel for chat and notifications.",
      steps: [
        { label: "Seeker / Owner / Admin", detail: "Three roles with separate permissions." },
        { label: "Express API", detail: "JWT login and role checks on every request." },
        { label: "MongoDB", detail: "Listings, bookings, reviews, and users." },
        { label: "Socket.IO", detail: "Live chat and notifications." },
        { label: "Cloudinary", detail: "Stores listing photos." },
      ],
    },
    decisions: [
      {
        title: "Nearby search with the Haversine formula",
        why: "It computes the distance across the earth's surface, so results can be limited to a radius around the user.",
      },
      {
        title: "Admin verification before publishing",
        why: "Listings only go public after review, which addresses the trust problem that scattered posts have.",
      },
    ],
    limitations: ["This is a team course project with four members."],
    repoUrl: "https://github.com/beambomb/Tim8-US2",
    needsReview: true,
  },
]);
