
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
  branche_bac: z.string().min(1, "La branche du bac est requise."),
  niveau_academique: z.string().min(1, "Le niveau académique est requis."),
  filiere: z.string().optional(),
  has_prior_experience_q1: z.boolean(),
  experience: z.string().optional(),
});

const step3Fields = z.object({
  motivation_level: z.string().min(1, "Le niveau de motivation est requis."),
  is_available_q2: z.boolean(),
  interests: z.array(z.string()).optional(),
});

// Combine the shapes of these ZodObjects to create a new ZodObject,
// then apply superRefine to this single, comprehensive ZodObject.
export const formSchema = z.object({
  ...step1Fields.shape,
  ...step2Fields.shape,
  ...step3Fields.shape,
}).superRefine((data, ctx) => {
  // Refinement logic (previously in step2Schema)
  if (data.niveau_academique && data.niveau_academique !== "Baccalauréat" && (!data.filiere || data.filiere.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La filière est requise pour ce niveau académique.",
      path: ["filiere"],
    });
  }
  if (data.has_prior_experience_q1 && (!data.experience || data.experience.trim() === "")) {
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
  // Step 2 keys:
  ['branche_bac', 'niveau_academique', 'filiere', 'has_prior_experience_q1', 'experience'],
  // Step 3 keys:
  ['motivation_level', 'is_available_q2', 'interests'],
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
  { value: "Sciences Mathématiques A", label: "Sciences Mathématiques A" },
  { value: "Sciences Mathématiques B", label: "Sciences Mathématiques B" },
  { value: "Sciences Physiques", label: "Sciences Physiques" },
  { value: "Sciences de la Vie et de la Terre", label: "Sciences de la Vie et de la Terre" },
  { value: "Sciences Agronomiques", label: "Sciences Agronomiques" },
  { value: "Sciences Économiques", label: "Sciences Économiques" },
  { value: "Techniques de Gestion Comptable", label: "Techniques de Gestion Comptable" },
  { value: "Lettres", label: "Lettres" },
  { value: "Arts Appliqués", label: "Arts Appliqués" },
  { value: "Autre", label: "Autre" },
];

export const ACADEMIC_LEVELS = [
  { value: "Baccalauréat", label: "Baccalauréat" },
  { value: "Bac+1", label: "Bac+1" },
  { value: "Bac+2 (DEUG, DUT, BTS)", label: "Bac+2 (DEUG, DUT, BTS)" },
  { value: "Bac+3 (Licence)", label: "Bac+3 (Licence)" },
  { value: "Bac+4 (Maîtrise)", label: "Bac+4 (Maîtrise)" },
  { value: "Bac+5 (Master, Ingénieur)", label: "Bac+5 (Master, Ingénieur)" },
  { value: "Doctorat", label: "Doctorat" },
  { value: "Autre", label: "Autre" },
];

export const EXPERIENCE_LEVELS = [
  { value: "Aucune", label: "Aucune" },
  { value: "Moins d'un an", label: "Moins d'un an" },
  { value: "1-2 ans", label: "1-2 ans" },
  { value: "2-5 ans", label: "2-5 ans" },
  { value: "Plus de 5 ans", label: "Plus de 5 ans" },
];

export const MOTIVATION_LEVELS = [
  { value: "Très motivé(e)", label: "Très motivé(e)" },
  { value: "Motivé(e)", label: "Motivé(e)" },
  { value: "Peu motivé(e)", label: "Peu motivé(e)" },
  { value: "Pas du tout motivé(e)", label: "Pas du tout motivé(e)" },
];

export const INTEREST_ITEMS = [
  { id: "technologie", label: "Technologie" },
  { id: "art_culture", label: "Art et Culture" },
  { id: "sport", label: "Sport" },
  { id: "entrepreneuriat", label: "Entrepreneuriat" },
  { id: "benevolat", label: "Bénévolat" },
  { id: "voyages", label: "Voyages" },
];
