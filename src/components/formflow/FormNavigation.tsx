import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => Promise<void>;
  onPrev: () => void;
  isSubmitting: boolean;
}

export function FormNavigation({ currentStep, totalSteps, onNext, onPrev, isSubmitting }: FormNavigationProps) {
  return (
    <div className="mt-8 flex justify-between">
      {currentStep > 0 && (
        <Button type="button" variant="outline" onClick={onPrev} disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
        </Button>
      )}
      {currentStep < totalSteps - 1 && (
        <Button type="button" onClick={onNext} className="ml-auto" disabled={isSubmitting}>
          Suivant <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
      {currentStep === totalSteps - 1 && (
        <Button type="submit" className="ml-auto" disabled={isSubmitting}>
          {isSubmitting ? "Soumission..." : "Soumettre"} <Send className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
