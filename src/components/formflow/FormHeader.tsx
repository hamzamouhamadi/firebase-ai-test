import { FileText } from 'lucide-react';

export function FormHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
        <FileText className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-4xl font-bold text-primary">FormFlow</h1>
      <p className="text-muted-foreground">Inscription en plusieurs étapes</p>
    </div>
  );
}
