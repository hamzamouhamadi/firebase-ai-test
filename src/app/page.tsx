"use client";

import { useState } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

import { FormHeader } from '@/components/formflow/FormHeader';
import { StepIndicator } from '@/components/formflow/StepIndicator';
import { Step1PersonalDetails } from '@/components/formflow/Step1PersonalDetails';
import { Step2AcademicInfo } from '@/components/formflow/Step2AcademicInfo';
import { Step3AdditionalInfo } from '@/components/formflow/Step3AdditionalInfo';
import { Step4TrainingPreferences } from '@/components/formflow/Step4TrainingPreferences';
import { FormNavigation } from '@/components/formflow/FormNavigation';
import { SubmissionModal } from '@/components/formflow/SubmissionModal';

import { formSchema, STEPS_VALIDATION_FIELDS, type FormData } from '@/lib/schemas/formSchema';
import { ReCAPTCHA } from '@/components/ui/recaptcha';


const STEP_TITLES = ["Informations Personnelles", "Parcours Académique", "Informations Complémentaires"];

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validate on change for better UX
    defaultValues: {
      nom: "",
      prenom: "",
      date_naissance: undefined,
      cin: "",
      genre: "",
      email: "",
      telephone: "",
        ville: "",
        region: "",
      branche_bac: "",
      niveau_academique: "",
        filiere_academique: "",
        has_professional_experience: "non",
        months_of_experience: undefined,
        objectif: undefined,
        situation_actuelle: undefined,
        has_powerful_laptop: undefined,
        has_it_knowledge: "non",
        it_knowledge: [],
        training_preference: undefined,
        how_did_you_hear: [],
      experience: "",
      motivation_level: "",
      is_available_q2: false,
      interests: [],
    },
  });

  const handleNextStep = async () => {
    const fieldsToValidate = STEPS_VALIDATION_FIELDS[currentStep] as FieldPath<FormData>[];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(form.formState.errors)[0];
      if (firstErrorField) {
        const element = document.getElementsByName(firstErrorField)[0];
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs avant de continuer.",
        variant: "destructive",
      });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Form data submitted:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Replace with actual API call
    // try {
    //   const response = await fetch('/api/inscription', { // Assuming you'll create an API route later
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const result = await response.json();
    //   console.log('API Response:', result);
      
    //   setSubmittedData(data);
    //   setIsModalOpen(true);
    //   form.reset(); // Reset form after successful submission
    //   setCurrentStep(0); // Go back to first step
    //   toast({
    //     title: "Inscription Réussie!",
    //     description: "Vos informations ont été enregistrées avec succès.",
    //   });

    // } catch (error) {
    //   console.error('Submission error:', error);
    //   toast({
    //     title: "Erreur de soumission",
    //     description: "Une erreur s'est produite. Veuillez réessayer.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }

    // For now, just show modal with data
    setSubmittedData(data);
    setIsModalOpen(true);
    // form.reset(); // Uncomment if you want to reset after showing modal
    // setCurrentStep(0); // Uncomment if you want to go to first step
     toast({
       title: "Données Prêtes!",
       description: "Le récapitulatif de vos données est affiché.",
     });
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Step1PersonalDetails form={form} />;
            case 1:
                return <Step2AcademicInfo form={form} />;
            case 2:
                return <Step3AdditionalInfo form={form} />;
            case 3:
                return <Step4TrainingPreferences form={form} />;
            case 4:
                return <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="text-sm">Veuillez confirmer que vous n'êtes pas un robot.</p>
                    <ReCAPTCHA />
                    <Button type="submit" disabled={isSubmitting}>
                      Soumettre ma candidature
                    </Button>
                </div>;

            default:
                return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <FormHeader />
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <StepIndicator currentStep={currentStep} totalSteps={STEP_TITLES.length} stepTitles={STEP_TITLES} />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="transition-all duration-300 ease-in-out">
                                {renderStepContent()}
              </div>
              {currentStep !=4 ? (
                <FormNavigation
                  currentStep={currentStep}
                  totalSteps={5}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                  isSubmitting={isSubmitting || form.formState.isSubmitting}
                />):null}
            </form>
          </Form>
        </CardContent>
      </Card>
      <SubmissionModal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
          form.reset();
          setCurrentStep(0);
        }} data={submittedData} />
        
      {/* Global loading indicator if needed, or for full page transitions */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
