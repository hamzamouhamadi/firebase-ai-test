"use client";

import type { UseFormReturn } from 'react-hook-form';
import { Briefcase, BookOpen, GraduationCap, HelpCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FormData } from '@/lib/schemas/formSchema';
import { BAC_BRANCHES, ACADEMIC_LEVELS, EXPERIENCE_LEVELS, ACADEMIC_FIELDS } from '@/lib/schemas/formSchema';

interface Step2Props {

  

  form: UseFormReturn<FormData>;
}

export function Step2AcademicInfo({ form }: Step2Props) {
  const watchAcademicLevel = form.watch("niveau_academique");
  const watchHasPriorExperience = form.watch("experience_professionnelle");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="branche_bac"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center"><GraduationCap className="mr-2 h-4 w-4 text-primary" />Branche du Bac</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre branche du bac" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {BAC_BRANCHES.map((branch) => (
                  <SelectItem key={branch.value} value={branch.value}>
                    {branch.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="niveau_academique"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-primary" />Niveau Académique</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre niveau académique" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ACADEMIC_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

          <FormField
            control={form.control}
            name="filiere_academique"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-primary" />Filière académique</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre filière académique" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ACADEMIC_FIELDS.map((field) => (
                      <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
      <FormField
         control={form.control}
         name="has_professional_experience"
         render={({ field }) => (
           <FormItem className="space-y-3">
             <FormLabel className="flex items-center"><HelpCircle className="mr-2 h-4 w-4 text-primary" />Avez-vous une expérience professionnelle ?</FormLabel>
             <FormControl>
               <RadioGroup
                 onValueChange={field.onChange}
                 defaultValue={field.value}
                 className="flex flex-col space-y-1"
               >
                 <FormItem className="flex items-center space-x-3 space-y-0">
                   <FormControl>
                     <RadioGroupItem value="Oui" />
                   </FormControl>
                   <FormLabel className="font-normal">Oui</FormLabel>
                 </FormItem>
                 <FormItem className="flex items-center space-x-3 space-y-0">
                   <FormControl>
                     <RadioGroupItem value="Non" />
                   </FormControl>
                   <FormLabel className="font-normal">Non</FormLabel>
                 </FormItem>
               </RadioGroup>
             </FormControl>
             <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("has_professional_experience") === "Oui" && (
        <FormField
          control={form.control}
          name="experience_mois"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><Briefcase className="mr-2 h-4 w-4 text-primary" />Si oui, de combien de mois ?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre niveau d'expérience" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value} >
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
