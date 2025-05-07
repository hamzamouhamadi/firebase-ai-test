import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { FormData } from '@/lib/schemas/formSchema';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FormData | null;
}

export function SubmissionModal({ isOpen, onClose, data }: SubmissionModalProps) {
  if (!data) return null;

  // Helper to format values for display
  const formatValue = (value: any): string => {
    if (value instanceof Date) {
      return value.toLocaleDateString('fr-FR');
    }
    if (typeof value === 'boolean') {
      return value ? 'Oui' : 'Non';
    }
    if (Array.isArray(value)) {
      return value.join(', ') || 'Non spécifié';
    }
    return value || 'Non spécifié';
  };

  // Define a more readable label for each field
  const fieldLabels: Record<keyof FormData, string> = {
    nom: "Nom",
    prenom: "Prénom",
    date_naissance: "Date de naissance",
    cin: "CIN",
    genre: "Genre",
    email: "Email",
    telephone: "Téléphone",
    ville: "Ville",
    region: "Région",
    branche_bac: "Branche du Bac",
    niveau_academique: "Niveau Académique",
    filiere: "Filière",
    has_prior_experience_q1: "Expérience professionnelle antérieure ?",
    experience: "Détails de l'expérience",
    motivation_level: "Niveau de motivation",
    is_available_q2: "Disponible pour formation en soirée ?",
    interests: "Centres d'intérêt",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-primary">Récapitulatif de votre inscription</DialogTitle>
          <DialogDescription>
            Veuillez vérifier les informations que vous avez soumises.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-2">
          <div className="space-y-3 py-4 text-sm">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 gap-2 items-start">
                <span className="font-medium text-muted-foreground col-span-1">{fieldLabels[key as keyof FormData] || key}:</span>
                <span className="col-span-2 break-words">{formatValue(value)}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="button" onClick={onClose} className="bg-primary hover:bg-primary/90">
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
