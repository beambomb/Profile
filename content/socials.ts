import { certificatesSchema, cvSchema, socialsSchema } from "./schema";

// Links taken from the CV header.
export const socials = socialsSchema.parse({
  github: "https://github.com/beambomb",
  linkedin: "https://www.linkedin.com/in/johannesbimo",
  email: "johannesdimasbimo@gmail.com",
});

// The CV PDF contains a phone number and home address. Keep `published: false`
// until a public-safe copy is placed at public/cv.pdf and the owner approves it.
export const cv = cvSchema.parse({
  published: false,
  path: "/cv.pdf",
  fileName: "Johannes_De_Deo_Dimas_Aryobimo_CV.pdf",
});

// Certificates will be supplied later. An empty list renders a neutral state.
export const certificates = certificatesSchema.parse([
  {
    id: "datacamp-associate-data-engineer-sql",
    name: "Associate Data Engineer in SQL",
    issuer: "DataCamp",
    year: 2026,
    verifyUrl:
      "https://www.datacamp.com/completed/statement-of-accomplishment/track/4b0affb07341ee75234eca19654f06845a88feb3",
    image: "/images/certificates/datacamp-associate-data-engineer-sql.png",
    imageAlt:
      "DataCamp statement of accomplishment for Associate Data Engineer in SQL, awarded to Johannes De Deo Dimas Aryobimo, completed October 18, 2026",
  },
  {
    id: "freecodecamp-back-end-apis",
    name: "Back-End Development and APIs",
    issuer: "freeCodeCamp",
    year: 2026,
    verifyUrl: "https://www.freecodecamp.org/certification/beambomb/back-end-development-and-apis-v9",
    image: "/images/certificates/freecodecamp-back-end-apis.png",
    imageAlt:
      "freeCodeCamp Back-End Development and APIs developer certification for Johannes De Deo Dimas Aryobimo, October 16, 2026",
  },
]);
