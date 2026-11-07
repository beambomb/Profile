import { projectsSchema } from "./schema";

/**
 * Sources: project READMEs on github.com/beambomb and the CV.
 * Wording is written in plain English by the assistant. Every entry keeps
 * needsReview: true until the owner confirms accuracy and role descriptions.
 */
export const projects = projectsSchema.parse([
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
    screenshots: [
      {
        src: "/images/projects/carikos/carikos-hero.png",
        alt: "CariKos landing page and campus search interface",
        caption: "Landing page with verified boarding house search near campus",
      },
      {
        src: "/images/projects/carikos/carikos-catalog.png",
        alt: "CariKos recommended boarding houses catalog with filtering",
        caption: "Curated catalog with gender filters and distance indicators",
      },
    ],
    needsReview: true,
  },
  {
    slug: "bengawan-solo-flood-forecasting",
    title: "Bengawan Solo Flood Forecasting",
    domain: "AI/ML",
    period: "January 2026 – Present",
    award: "Sebelas Maret Statistics & Data Science (SSDS) 2026",
    oneLiner:
      "A multi-horizon hydrological machine learning system predicting water levels across 30 river stations for the 8-month Bengawan Solo flood season.",
    problem: [
      "Forecasting water surface elevation (TMA) along Indonesia's longest river basin across 30 heterogeneous monitoring stations over an 8-month deployment window without future ground-truth water level readings.",
      "Standard autoregressive models collapse due to recursive error accumulation over 242-day rollouts, while elevation disparities (1 to 144 mdpl) and sensor telemetry anomalies cause severe model bias.",
    ],
    solution: [
      "Developed the V60 Grand Master pipeline, transitioning from isolated station models to a unified Target-Normalized Global Ensemble combining diverse CatBoost and LightGBM models trained on robust Z-score scaled water levels.",
      "Engineered domain-specific hydrological features: Antecedent Precipitation Index (API) across three half-life soil saturation regimes (12h, 48h, 7 days), effective direct runoff, and topological upstream routing through the HydroRIVERS network with exponential distance decay.",
      "Employed Huber loss optimization with conservative sample weight damping (0.05) on single-point sensor spikes to preserve true flood peak signals while immunizing against hardware telemetry glitches.",
    ],
    results: [
      "Successfully generated 21,780 multi-horizon target predictions across all 30 stations spanning 242 days (3 daily observation timestamps at 06:00, 12:00, and 18:00 WIB).",
      "Validated temporal generalization across a 4-fold rolling-origin backtesting framework without data leakage, evaluating global RMSE, macro-station MAE, and worst-station MAE.",
      "Documented experimental progression across 58 iterative architectures—benchmarking LSTMs, Graph WaveNets, and Temporal Fusion Transformers before perfecting the heterogeneous tree ensemble.",
    ],
    role: "Led end-to-end machine learning and hydrological engineering: geospatial reach traversal using HydroRIVERS topology, robust target scaling, 58 iterative model experiments, rolling-origin validation, and final 5-head heterogeneous ensemble deployment.",
    tags: ["Python", "CatBoost", "LightGBM", "XGBoost", "Hydrology", "HydroRIVERS", "Optuna", "Folium"],
    stack: [
      { label: "Modeling & Ensembling", items: ["CatBoost", "LightGBM", "XGBoost", "Heterogeneous 5-Head Ensemble", "Quantile Regressors"] },
      { label: "Hydrological Feature Engineering", items: ["Antecedent Precipitation Index (API)", "Soil Moisture Saturation", "HydroRIVERS Topology", "Hydraulic Distance Decay"] },
      { label: "Optimization & Validation", items: ["Optuna", "Huber Loss (delta=1.5)", "Robust Z-Score Scaling", "4-Fold Rolling-Origin CV"] },
      { label: "Geospatial & Tooling", items: ["Python", "GeoPandas", "Folium (Interactive Stream Paths)", "Shapely"] },
    ],
    architecture: {
      summary: "Multi-horizon river basin forecasting pipeline routing environmental and topological signals through a target-normalized heterogeneous ensemble.",
      steps: [
        { label: "Meteorological Ingestion", detail: "Hourly precipitation, soil moisture, and climate indicators across 30 stations." },
        { label: "Hydrological Modeling", detail: "Computes API soil memory (12h, 48h, 168h) and HydroRIVERS upstream routing." },
        { label: "Robust Normalization", detail: "Station-wise median and IQR scaling maps disparate elevations (1-144 mdpl) to common z-scores." },
        { label: "Heterogeneous Ensemble", detail: "5 diverse CatBoost and LightGBM models trained with Huber loss and spike damping." },
        { label: "Inverse Scaling", detail: "Reconstructs physical water level elevation (meters above sea level) per station." },
        { label: "Multi-Horizon Forecast", detail: "Generates 21,780 predictions across 242 days with optional quantile uncertainty bounds." },
      ],
    },
    decisions: [
      {
        title: "Target-normalized global model over local station models",
        why: "Individual station models struggled with limited historical variance and overfitting. Normalizing target water levels into station-relative robust z-scores allowed a single global ensemble to learn shared hydrological flood dynamics across all 30 stations.",
      },
      {
        title: "HydroRIVERS topological reach traversal with distance decay",
        why: "Rather than relying solely on local station weather, upstream rainfall was routed downstream along true river network reaches weighted by exponential hydraulic distance decay.",
      },
      {
        title: "Rolling-origin 4-fold validation over random k-fold",
        why: "Simulates the exact real-world deployment environment over four 8-month historical forecast horizons, preventing future lookahead leakage in time-series evaluation.",
      },
    ],
    limitations: [
      "Target observations contain occasional unphysical single-point sensor spikes requiring conservative damping.",
      "Long-range 8-month weather inputs rely on seasonal forecasts rather than measured precipitation.",
    ],
    repoUrl: "https://github.com/beambomb/SSF-SSDS",
    screenshots: [
      {
        src: "/images/projects/SSF-SSDS/bengawan-solo-spatial-map.png",
        alt: "Bengawan Solo river basin interactive spatial topology map showing 30 monitoring stations and flow paths",
        caption: "Geographic spatial distribution of all 30 monitoring stations along the Bengawan Solo basin with elevation color gradient",
      },
    ],
    needsReview: true,
  },
  {
    slug: "document-assistant",
    title: "Enterprise Document Assistant",
    domain: "AI/ML",
    period: "October 2026",
    oneLiner:
      "A grounded enterprise RAG system with Role-Based Access Control (RBAC) pre-filtering, adversarial red-teaming, and quantitative evaluation.",
    problem: [
      "Access Leakage & Privilege Escalation: In enterprise knowledge bases, standard RAG setups leak confidential files (like C-level payroll or security keys) when filtering is handled post-retrieval or via prompt instructions alone.",
      "Hallucination & Fabricated Citations: Language models often hallucinate plausible-sounding answers and invent non-existent citation passages when queries fall outside the corpus.",
      "Lack of Empirical Verification: Deployments often lack automated quantitative regression tests for retrieval accuracy, refusal behavior, and prompt jailbreaks.",
    ],
    solution: [
      "Enforced security at the database retrieval layer via ACL Pre-Filtering so unauthorized document chunks never reach the prompt context.",
      "Engineered a Dual-Index retrieval engine combining Okapi BM25 (exact SOP and policy alphanumeric codes) and Dense Vector embeddings (multilingual semantic search) merged via Reciprocal Rank Fusion (RRF) and Cross-Encoder Reranking.",
      "Implemented a calibrated Confidence Gate (score >= 0.35) for deterministic abstention when evidence is insufficient, accompanied by regex-based ground-truth citation verification.",
      "Built an automated quantitative evaluation harness and a 49-test suite benchmarking Recall@k, MRR, nDCG, 0.00% ACL leakage, and 100% trap rejection.",
    ],
    results: [
      "Passed all 49 automated unit, integration, and security tests with 100% success rate across adversarial penetration and retrieval flows.",
      "Maintained 0.00% ACL leakage on confidential documents and 100% trap rejection against prompt injection attacks.",
      "Supported offline local CPU inference (Qwen 2.5 0.5B GGUF at 3-5s latency, $0 cost) and cloud AI (OpenRouter at 1-2s latency) with an interactive Streamlit workbench.",
    ],
    role: "Architected and implemented the end-to-end RAG system: dual-index retrieval pipeline (BM25 + Dense RRF + Cross-Encoder), ACL pre-filter engine, quantitative evaluation harness, and Streamlit workbench.",
    tags: ["Python", "FastAPI", "RAG", "BM25", "Streamlit", "PyTest", "LLM", "RBAC"],
    stack: [
      { label: "Core & Retrieval", items: ["Python 3.10+", "Okapi BM25", "Dense Vector Search", "Reciprocal Rank Fusion", "Cross-Encoder Reranker"] },
      { label: "LLM & Security", items: ["Local GGUF (Qwen 2.5)", "OpenRouter Cloud", "RBAC Pre-Filtering", "Adversarial Red-Teaming", "Citation Verifier"] },
      { label: "Interface & Testing", items: ["Streamlit", "FastAPI", "PyTest (49 Tests)", "Evaluation Harness (Recall, MRR, nDCG)"] },
    ],
    architecture: {
      summary: "Grounded enterprise RAG architecture where access permissions are strictly pre-filtered before candidate chunks are queried from dual lexical and vector indexes.",
      steps: [
        { label: "User Query & RBAC Authentication", detail: "Maps query to active user roles (e.g. Tamu, Karyawan, Keuangan, Direksi, Admin) to establish cryptographic access boundaries." },
        { label: "ACL Pre-Filter Engine", detail: "Filters out unauthorized document chunks at the metadata layer before search execution, making privilege escalation impossible." },
        { label: "Dual-Index Hybrid Retrieval", detail: "Queries permitted documents simultaneously using Okapi BM25 for exact alphanumeric SOP codes and Dense Vector embeddings for semantic context." },
        { label: "Reciprocal Rank Fusion & Reranking", detail: "Merges ranked candidate chunks via RRF and refines relevance ordering using a Cross-Encoder Reranker." },
        { label: "Confidence Gate & Abstention", detail: "Checks reranker score against a 0.35 threshold; returns deterministic refusal if evidence is out-of-scope or context is empty." },
        { label: "Prompt Guardrails & Generation", detail: "Constrains model formatting and streams response using Local CPU GGUF or Cloud AI." },
        { label: "Citation Verifier & Telemetry", detail: "Validates bracketed citations against retrieved chunk IDs and outputs execution latency breakdown." },
      ],
    },
    decisions: [
      {
        title: "Pre-Retrieval ACL Filtering over Post-Retrieval Prompt Filtering",
        why: "Filtering after retrieval or instructing LLMs via prompt instructions to ignore confidential records consistently fails against adversarial jailbreaks. Pre-filtering at the index level guarantees unauthorized data never enters memory or model context.",
      },
      {
        title: "Hybrid BM25 + Dense RRF over Dense-Only Retrieval",
        why: "Corporate documents are dense with alphanumeric identifiers (e.g. SOP-IT-001, KEB-SEC-005). Dense vector embeddings frequently fail on exact code lookups that lexical BM25 solves effortlessly, while dense search captures semantic intent.",
      },
      {
        title: "Deterministic Confidence Gating",
        why: "To eliminate fabricated answers, the pipeline explicitly abstains when the top reranked score falls below 0.35, preventing false confidence in mission-critical corporate policies.",
      },
    ],
    limitations: [
      "Synthetic Document Dataset: Initial evaluation is performed on structured Markdown SOPs; real-world messy corporate scans require specialized OCR extraction pipelines.",
      "Metadata-level RBAC: Access roles currently operate on document metadata; production enterprise deployment should bind directly to SSO, Active Directory, or OAuth2/OIDC providers.",
      "Small Local CPU Model Constraints: Local CPU Qwen 2.5 0.5B requires repetition penalties (1.22) to avoid phrasing loops compared to larger cloud reasoning models.",
    ],
    repoUrl: "https://github.com/beambomb/Document-Assistant",
    screenshots: [
      {
        src: "/images/projects/Document-Assistant/chat-interface.png",
        alt: "Document Assistant Streamlit Chat Interface with RBAC Role Selector and Model Controls",
        caption: "Grounded chat interface with active role switching (Karyawan, Keuangan, Direksi) and SOP citations",
      },
      {
        src: "/images/projects/Document-Assistant/benchmark-table.png",
        alt: "Empirical Retrieval and Security Benchmark Evaluation Table",
        caption: "Quantitative evaluation benchmark comparing BM25, Dense Vector, Hybrid RRF, and Cross-Reranker with 0% ACL leakage",
      },
      {
        src: "/images/projects/Document-Assistant/document-acl-modal.png",
        alt: "Official Document Ingestion and Access Control Classification Modal",
        caption: "Document upload interface with division assignment and access classification tags",
      },
    ],
    needsReview: true,
  },
  {
    slug: "face-anti-spoofing",
    title: "Face Anti-Spoofing & Liveness Detection",
    domain: "AI/ML",
    period: "June 2026",
    oneLiner:
      "A zero-server edge AI system classifying 6 real vs. spoof attack modalities (masks, mannequins, screens, photos) using ConvNeXt-Tiny and in-browser ONNX Runtime Web.",
    problem: [
      "Presentation Attacks & Biometric Spoofing: Facial verification systems are vulnerable to physical presentation attacks—including printed photos, digital screen replays, 3D silicone masks, and mannequins.",
      "Heavy Server Infrastructure & Privacy Risks: Streaming live webcam frames to remote GPU servers incurs heavy cloud costs and raises serious biometric data privacy concerns for users.",
      "Extreme Attack Imbalance: Physical spoof datasets exhibit heavily skewed distributions across attack types, causing standard cross-entropy models to miss subtle 3D mask or mannequin artifacts.",
    ],
    solution: [
      "Trained ConvNeXt-Tiny on 1,474 deduplicated face images across 6 attack classes, freezing the ImageNet backbone to prevent overfitting and fine-tuning a custom Linear(768 -> 6) classification head.",
      "Optimized hyperparameters using Optuna over Stratified 5-Fold Cross Validation with Weighted Focal Loss (gamma=2.18) and CosineAnnealingLR to aggressively penalize hard spoof misclassifications.",
      "Exported the best Fold 1 PyTorch checkpoint to ONNX (106 MB) and built a client-side web application powered by ONNX Runtime Web for real-time 384x384 in-browser inference without sending images to a server.",
      "Engineered dual deployment: a standalone Hugging Face Static Space and a Vercel edge frontend that dynamically fetches model weights with zero server compute overhead.",
    ],
    results: [
      "Achieved a 5-fold cross-validation Macro F1 score of 0.9034 ± 0.0149, with the best Fold 1 model reaching 0.9295 Macro F1 and 93.56% validation accuracy (295 samples).",
      "Executed 100% private, serverless client-side inference directly inside the visitor's browser—camera frames never leave the local device.",
      "Real-time multi-class probability breakdown across 6 distinct categories: Real Face, Mask, Mannequin, Screen Replay, Printed Photo, and Unknown Spoof.",
    ],
    role: "Machine Learning & Edge Deployment Engineer: Trained ConvNeXt-Tiny with frozen backbone and weighted focal loss in PyTorch, tuned hyperparameters with Optuna over 5-fold CV, exported the Fold 1 model to ONNX, and engineered the in-browser ONNX Runtime Web client.",
    tags: ["PyTorch", "ConvNeXt", "ONNX", "Computer Vision", "Optuna", "FastAPI", "WebAssembly", "AI/ML"],
    stack: [
      { label: "Model & Training", items: ["PyTorch", "ConvNeXt-Tiny", "Weighted Focal Loss (gamma=2.18)", "Optuna", "Stratified 5-Fold CV"] },
      { label: "Edge Inference & Web", items: ["ONNX Runtime Web", "WebAssembly / WebGL", "JavaScript (ES6+)", "Hugging Face Static Space", "Vercel"] },
      { label: "Backend & Tooling", items: ["FastAPI", "Uvicorn", "Python 3.11", "Albumentations", "ImageNet Normalization"] },
    ],
    architecture: {
      summary: "End-to-end edge computer vision pipeline from PyTorch ConvNeXt training and Optuna tuning to zero-server in-browser ONNX inference across 6 attack classes.",
      steps: [
        { label: "Image Capture & Normalization", detail: "Captures webcam frame or user upload, resizes single RGB image to 384x384, and normalizes using ImageNet mean and standard deviation." },
        { label: "Client-Side ONNX Session", detail: "Loads the 106 MB Fold 1 ONNX model directly into browser memory via ONNX Runtime Web without uploading biometric data." },
        { label: "ConvNeXt-Tiny Feature Extraction", detail: "Feeds normalized tensor through the frozen ConvNeXt-Tiny backbone to produce 768-dimensional visual feature embeddings." },
        { label: "6-Class Classifier Projection", detail: "Linear projection (768 -> 6) and numerical Softmax calculate confidence probabilities for realperson, fake_mask, fake_mannequin, fake_screen, fake_printed, and fake_unknown." },
        { label: "Verdict & Probability Visualizer", detail: "Displays primary classification decision (Real vs. Spoof detected) alongside individual class distribution progress bars." },
      ],
    },
    decisions: [
      {
        title: "In-Browser ONNX Runtime over Remote Cloud GPU API",
        why: "Running inference locally in the user's browser via ONNX Runtime Web eliminates recurring GPU cloud hosting expenses and guarantees complete biometric privacy since photos never leave the machine.",
      },
      {
        title: "Weighted Focal Loss (gamma=2.18) over Standard Cross-Entropy",
        why: "Face spoof attack datasets suffer from severe class imbalances. Focal loss dynamically down-weights easy examples and forces the model to learn subtle attack boundaries like mask edges and mannequin textures.",
      },
      {
        title: "Frozen ConvNeXt-Tiny Backbone with Custom Linear Classifier",
        why: "With ~1,500 training images, unfreezing the full network risks catastrophic overfitting. Freezing pretrained ImageNet weights while tuning only the 768 -> 6 classifier yielded superior generalization (0.9295 Macro F1).",
      },
    ],
    limitations: [
      "Initial Model Download: The 106 MB ONNX model requires a brief initial load time depending on network connection before the in-browser model status turns ready.",
      "Single-Frame RGB Detection: Operates on a single 384x384 image without dedicated infrared, structured light depth sensors, or multi-frame temporal video tracking.",
    ],
    repoUrl: "https://github.com/afiqchoiruzan/anti-spoofing",
    screenshots: [
      {
        src: "/images/projects/antispoofing/anti-spoofing-demo.png",
        alt: "Face Anti-Spoofing Web Demo detecting silicone mask attack with multi-class probability breakdown",
        caption: "In-browser ONNX inference detecting a 3D mask spoof attack with 6-class confidence scores",
      },
      {
        src: "/images/projects/antispoofing/anti-spoofing-hero.png",
        alt: "Anti-Spoofing overview with 6 detected attack classes and single-frame 384px resolution pipeline",
        caption: "Overview of detected attack modalities: real human, masks, mannequins, screens, and printouts",
      },
    ],
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
    screenshots: [
      {
        src: "/images/projects/turbofan-predictive-maintenance/turbofan-live-stream.png",
        alt: "NASA Turbofan RUL live telemetry stream and WebSocket prediction dashboard",
      },
      {
        src: "/images/projects/turbofan-predictive-maintenance/turbofan-fleet-intelligence.png",
        alt: "NASA Turbofan Fleet Intelligence Platform showing fleet risk and health distribution",
      },
    ],
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
    screenshots: [
      {
        src: "/images/projects/weather-elt-pipeline/airflow_dag_success.png",
        alt: "Airflow DAG execution graph for Weather ELT Pipeline",
      },
      {
        src: "/images/projects/weather-elt-pipeline/dbt_lineage_graph.png",
        alt: "dbt lineage graph showing staging and star schema dimension and fact tables",
      },
    ],
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
    screenshots: [
      {
        src: "/images/projects/aemads/aemads-dashboard.jpeg",
        alt: "AEMADS Technician Portal with power monitoring charts and shop heatmap",
      },
      {
        src: "/images/projects/aemads/aemads-history.jpeg",
        alt: "AEMADS anomaly events history log",
      },
      {
        src: "/images/projects/aemads/aemads-login.jpeg",
        alt: "AEMADS sign in control room screen",
      },
      {
        src: "/images/projects/aemads/aemads-register.jpeg",
        alt: "AEMADS account registration screen",
      },
    ],
    needsReview: true,
  },
  {
    slug: "vanigrow",
    title: "VaniGrow Monitoring",
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
    screenshots: [
      {
        src: "/images/projects/vanigrow/vanigrow-dashboard.png",
        alt: "VaniGrow live greenhouse fungal risk monitoring dashboard and Wokwi simulation",
      },
      {
        src: "/images/projects/vanigrow/vanigrow-sensors-chart.png",
        alt: "VaniGrow VPD and sensor timeline charts with remote actuator control",
      },
    ],
    needsReview: true,
  },
]);
