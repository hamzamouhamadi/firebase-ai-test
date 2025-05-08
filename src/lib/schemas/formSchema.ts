
import { z } from 'zod';

const REQUIRED_MESSAGE = "Ce champ est requis.";
const INVALID_EMAIL_MESSAGE = "Format d'email invalide.";

// Define field groups for clarity, these are ZodObject schemas
const step1Fields = z.object({
  nom: z.string().min(1, "Le nom est requis."),
  prenom: z.string().min(1, "Le prénom est requis."),
  date_naissance: z.date({ required_error: "La date de naissance est requise.", invalid_type_error: "La date de naissance est requise." }),
  cin: z.string().min(1, "Le CIN est requis."),
  genre: z.string().min(1, "Le genre est requis."),
  email: z.string().email(INVALID_EMAIL_MESSAGE).min(1, REQUIRED_MESSAGE),
  telephone: z.string().min(1, "Le numéro de téléphone est requis."),
  ville: z.string().min(1, "La ville est requise."),
  region: z.string().min(1, "La région est requise."),
});

const step2Fields = z.object({
  branche_bac: z.string({ required_error: "La branche du bac est requise." }).min(1, "La branche du bac est requise."),
  niveau_academique: z.string({ required_error: "Le niveau académique est requis." }).min(1, "Le niveau académique est requis."),
  filiere_academique: z.string({ required_error: "La filière académique est requise." }).min(1, "La filière académique est requise."),
  has_professional_experience: z.enum(["Oui", "Non"], { required_error: "Veuillez indiquer si vous avez une expérience professionnelle." }),
  professional_experience_duration: z.string().optional(),
});

const itSkills = [
  "HTML/CSS", "JavaScript", "Python", "Java", "C#", "PHP", "SQL", "React", "Angular", "Node.js", "Autre"
] as const;

const step3Fields = z.object({
  objectif: z.enum(["Trouver un emploi", "Lancer un projet personnel"], { required_error: "Veuillez sélectionner un objectif." }),
  situation_actuelle: z.enum(["Étudiant", "En recherche d’emploi", "En emploi", "Autre"], { required_error: "Veuillez sélectionner votre situation actuelle." }),
  has_laptop: z.enum(["Oui", "Non"], { required_error: "Veuillez indiquer si vous avez un ordinateur portable." }),
  has_it_knowledge: z.enum(["Oui", "Non"], { required_error: "Veuillez indiquer si vous avez des connaissances en IT." }),
  it_skills: z.array(z.enum(itSkills)).max(3, "Vous ne pouvez sélectionner que 3 compétences maximum.").optional(),
});



const step3Fields = z.object({
    motivation_level: z.string().min(1, "Le niveau de motivation est requis."),
    is_available_q2: z.boolean(),
    interests: z.array(z.string()).optional(),
    langue_mat: z.string().min(1, "La langue maternelle est requise"),
    langue_etrangere: z.array(z.string()).optional(),
    is_currently_employed: z.boolean(),
});


const formations = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Data Science",
  "Machine Learning",
  "Analyse de données",
] as const;

const step4Fields = z.object({
  formation_souhaitee: z.enum(formations, { required_error: "Veuillez sélectionner une formation souhaitée." }),
  how_did_you_hear_about_us: z.array(z.string()).min(1, { message: "Veuillez sélectionner au moins une option." }),
  engagement: z.boolean({ required_error: "Vous devez accepter les termes d'engagement." })
    .refine((value) => value === true, {
      message: "Vous devez accepter les termes d'engagement.",
    }),
});

const recapchaStep = z.object({
  recaptcha: z.string().min(1, "reCAPTCHA est requis")
});


const recapchaStep = z.object({
    recaptcha: z.string().min(1, "reCAPTCHA est requis")
});

// Combine the shapes of these ZodObjects to create a new ZodObject,
// then apply superRefine to this single, comprehensive ZodObject.
export const formSchema = z.object({
  ...step1Fields.shape,
  ...step2Fields.shape,
    ...step3Fields.shape,
    ...step4Fields.shape,
    ...recapchaStep.shape,
}).superRefine((data, ctx) => {
  // Refinement logic (previously in step2Schema)
  if (data.niveau_academique && data.niveau_academique !== "Bac" && (!data.filiere_academique || data.filiere_academique.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La filière est requise pour ce niveau académique.",
      path: ["filiere_academique"],
    });
  }
  if (data.has_professional_experience === "Oui" && (!data.professional_experience_duration || data.professional_experience_duration.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La durée d'expérience est requise si vous avez répondu oui.",
      path: ["professional_experience_duration"],
    });
  }
  if (data.has_it_knowledge === "Oui" && (!data.it_skills || data.it_skills.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "L'expérience est requise si vous avez répondu oui.",
      path: ["experience"],
    });
  }
  // Add any other cross-step or complex refinements here if needed
});

export type FormData = z.infer<typeof formSchema>;

// STEPS_VALIDATION_FIELDS remains the same as it refers to field names (keys of FormData)
export const STEPS_VALIDATION_FIELDS: (keyof FormData)[][] = [
  // Step 1 keys:
  ['nom', 'prenom', 'date_naissance', 'cin', 'genre', 'email', 'telephone', 'ville', 'region'],
  ['branche_bac', 'niveau_academique', 'filiere_academique', 'has_professional_experience', 'professional_experience_duration'],
  ['objectif', 'situation_actuelle', 'has_laptop', 'has_it_knowledge', 'it_skills'],
  ['formation_souhaitee', 'how_did_you_hear_about_us', 'engagement'],

  // Step 5: Recapcha step

  ['recaptcha']
];

// Constants for select options
export const GENDERS = [
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
  { value: "autre", label: "Autre" },
];

export const CITIES = [
  { value: "Casablanca", label: "Casablanca" },
  { value: "Rabat", label: "Rabat" },
  { value: "Marrakech", label: "Marrakech" },
  { value: "Fes", label: "Fès" },
  { value: "Tangier", label: "Tanger" },
  { value: "Agadir", label: "Agadir" },
  { value: "Other", label: "Autre" },
];

export const REGIONS = [
  { value: "Tanger-Tétouan-Al Hoceïma", label: "Tanger-Tétouan-Al Hoceïma" },
  { value: "L'Oriental", label: "L'Oriental" },
  { value: "Fès-Meknès", label: "Fès-Meknès" },
  { value: "Rabat-Salé-Kénitra", label: "Rabat-Salé-Kénitra" },
  { value: "Béni Mellal-Khénifra", label: "Béni Mellal-Khénifra" },
  { value: "Casablanca-Settat", label: "Casablanca-Settat" },
  { value: "Marrakech-Safi", label: "Marrakech-Safi" },
  { value: "Drâa-Tafilalet", label: "Drâa-Tafilalet" },
  { value: "Souss-Massa", label: "Souss-Massa" },
  { value: "Guelmim-Oued Noun", label: "Guelmim-Oued Noun" },
  { value: "Laâyoune-Sakia El Hamra", label: "Laâyoune-Sakia El Hamra" },
  { value: "Dakhla-Oued Ed-Dahab", label: "Dakhla-Oued Ed-Dahab" },
];

export const BAC_BRANCHES = [
  { value: "Scientifique", label: "Scientifique" },
  { value: "Littéraire", label: "Littéraire" },
  { value: "Économique", label: "Économique" },
  { value: "Technique", label: "Technique" },
  { value: "Autre", label: "Autre" }
];

export const ACADEMIC_LEVELS = [
  { value: "Bac", label: "Bac" },
  { value: "Bac+1", label: "Bac+1" },
  { value: "Bac+2", label: "Bac+2" },
  { value: "Bac+3", label: "Bac+3" },
  { value: "Bac+5", label: "Bac+5" },
  { value: "Plus", label: "Plus" },
];

export const ACADEMIC_FILIERES = [
  { value: "Informatique", label: "Informatique" },
  { value: "Électronique", label: "Électronique" },
  { value: "Mathématiques", label: "Mathématiques" },
  { value: "Gestion", label: "Gestion" },
  { value: "Autres", label: "Autres" },
];

export const EXPERIENCE_LEVELS = [
  { value: "1-3 mois", label: "1-3 mois" },
  { value: "4-6 mois", label: "4-6 mois" },
  { value: "6-12 mois", label: "6-12 mois" },
  { value: "+12 mois", label: "+12 mois" },
];


export const INTEREST_ITEMS = [
  { id: "technologie", label: "Technologie" },
  { id: "art_culture", label: "Art et Culture" },
  { id: "sport", label: "Sport" },
  { id: "entrepreneuriat", label: "Entrepreneuriat" },
  { id: "benevolat", label: "Bénévolat" },
  { id: "voyages", label: "Voyages" },
];

export const FORMATIONS = {
  "Développement Web": [
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "Fullstack", label: "Fullstack" },
  ],
  "Data & IA": [
    { value: "Data Science", label: "Data Science" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Analyse de données", label: "Analyse de données" },
  ],
};

export const HOW_DID_YOU_HEAR_ABOUT_US_OPTIONS = [
  { value: "Réseaux sociaux", label: "Réseaux sociaux" },
  { value: "Site web", label: "Site web" },
  { value: "Ami/Collègue", label: "Ami/Collègue" },
  { value: "École/Université", label: "École/Université" },
  { value: "Autre", label: "Autre" },
];

export const HOW_YOU_KNOW_ITEMS = [
    { value: "Réseaux sociaux", label: "Réseaux sociaux" },
    { value: "Bouche-à-oreille", label: "Bouche-à-oreille" },
];
