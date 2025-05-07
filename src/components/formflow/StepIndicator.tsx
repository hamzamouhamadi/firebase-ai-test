import { Progress } from '@/components/ui/progress';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepTitles }: StepIndicatorProps) {
  const progressValue = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-center text-primary mb-1">
        Étape {currentStep + 1} sur {totalSteps}: {stepTitles[currentStep]}
      </p>
      <Progress value={progressValue} className="w-full h-2" />
    </div>
  );
}
