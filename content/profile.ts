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
      organization: "TECHNOCORNER",
      role: "Subkoordinator Divisi Acara",
      period: "Jun 2026",
      month: "Jun",
      year: 2026,
      points: [
        "Mengelola penyusunan rundown, manajemen layout area, serta pemenuhan kebutuhan perlengkapan pada sesi kompetisi IoT.",
        "Menjembatani dan memastikan kelancaran koordinasi komunikasi antardivisi kepanitiaan.",
        "Mengatur pembagian tugas (jobdesc) secara terstruktur serta mengawasi kinerja staf di lapangan.",
      ],
    },
    {
      organization: "Find IT!",
      role: "Staff Teknis Data Analytics",
      period: "May 2026",
      month: "May",
      year: 2026,
      points: [
        "Menyusun guidebook dan regulasi teknis sebagai panduan resmi bagi seluruh peserta kompetisi Data Analytics tingkat nasional.",
        "Merancang dan mengawasi jalannya kompetisi yang diselenggarakan melalui platform Kaggle.",
        "Melakukan penilaian notebook peserta secara objektif berdasarkan rubrik evaluasi yang telah ditetapkan.",
      ],
    },
    {
      organization: "KMTETI",
      role: "Member of KMTETI Workshop Division",
      period: "Jan 2026 – Sekarang",
      month: "Jan",
      year: 2026,
      points: [
        "Penanggung Jawab Pelatihan Data Science: Mengelola pelaksanaan pelatihan Data Science untuk 60+ peserta dalam 6 sesi, memastikan operasional teknis berjalan lancar, dan bertindak sebagai narahubung utama antara peserta dan mentor.",
        "Ketua Pelaksana Bootcamp TETI 2026: Memimpin kepanitiaan 30+ anggota untuk mengoordinasikan Bootcamp berkapasitas 100+ peserta dari akuisisi mentor, linimasa kerja, hingga pengawasan hari-H.",
      ],
    },
    {
      organization: "Night Login Data Science Community",
      role: "Wakil Bidang Night Login Data Science Community (NDSC)",
      period: "Jan 2026 – Sekarang",
      month: "Jan",
      year: 2026,
      points: [
        "Menyelenggarakan sesi pelatihan bidang Data Science bagi anggota Night Login Data Science Community (NDSC) secara hybrid (online dan offline).",
        "Mentor kompetisi bagi anggota NDSC dalam persiapan serta penyusunan strategi menghadapi perlombaan Data Science.",
        "Mengembangkan proyek teknologi berskala internal maupun eksternal yang diamanahkan kepada organisasi Night Login.",
      ],
    },
    {
      organization: "TECHNOCORNER",
      role: "Staff Divisi Acara",
      period: "Jun 2025",
      month: "Jun",
      year: 2025,
      points: [
        "Membantu perencanaan dan penyusunan rangkaian acara, serta berkontribusi dalam pembuatan rundown dan teknis pelaksanaan.",
        "Berkoordinasi dengan Divisi Perlengkapan untuk kebutuhan lokasi/lomba, Divisi Teknis IoT untuk teknis kompetisi, serta Divisi Keamanan untuk alur peserta.",
      ],
    },
    {
      organization: "Departemen Teknik Elektro dan Teknologi Informasi (DTETI)",
      role: "Staff Divisi Acara – Panitia Wisuda",
      period: "Nov 2024 – Nov 2025",
      month: "Nov",
      year: 2024,
      points: [
        "Kontrak kepanitiaan 1 tahun (November 2024 – November 2025) untuk mengelola rangkaian prosesi wisuda mahasiswa DTETI.",
        "Menyusun skrip dan melatih Master of Ceremony (MC) guna memastikan kesiapan pemanduan acara sesuai dengan linimasa yang ditetapkan.",
        "Mengawasi jalannya operasional acara untuk memastikan seluruh rangkaian sesi berjalan dengan lancar dan tepat waktu.",
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
