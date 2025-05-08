"use client";

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { CheckSquare, AlertTriangle, Laptop } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { FormData, ItSkills } from '@/lib/schemas/formSchema';
import { OBJECTIVES, CURRENT_SITUATION, IT_SKILLS } from '@/lib/schemas/formSchema';
const itSkills = IT_SKILLS
interface Step3Props {
  form: UseFormReturn<FormData>;
}

export function Step3AdditionalInfo({ form }: Step3Props) {
  return (
    <div className="space-y-6">
      {/* Quel est votre objectif? */}
      <FormField
        control={form.control}
        name="objectif" // This should match the name in your schema
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-primary" />Quel est votre objectif ?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                 value={field.value}
                className="flex flex-col space-y-1"
              >
                {OBJECTIVES.map((objective) => (
                  <FormItem key={objective.value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={objective.value} />
                    </FormControl> 
                     <FormLabel className="font-normal">{objective.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Quelle est votre situation actuelle? */}
      <FormField
        control={form.control}
        name="situation_actuelle" // This should match the name in your schema
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-primary" />Quelle est votre situation actuelle ?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                {CURRENT_SITUATION.map((situation) => (
                  <FormItem key={situation.value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={situation.value} />
                    </FormControl>
                    <FormLabel className="font-normal">{situation.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Avez-vous un ordinateur portable suffisamment puissant */}
      <FormField
        control={form.control}
        name="has_laptop" // This should match the name in your schema
        render={({ field }) => (
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormLabel className="font-normal flex items-center space-x-2"><Laptop className="h-4 w-4 text-primary" />Avez-vous un ordinateur portable suffisamment puissant (minimum CPU i5, RAM 8 Go) ?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex space-x-4">
                <RadioGroupItem value="Oui" /> <FormLabel className="font-normal">Oui</FormLabel>
                <RadioGroupItem value="Non" /> <FormLabel className="font-normal">Non</FormLabel>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Avez-vous des connaissances en IT */}
      <FormField
        control={form.control}
        name="has_it_knowledge" // This should match the name in your schema


        render={({ field }) => (
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormLabel className="font-normal flex items-center space-x-2"><Laptop className="h-4 w-4 text-primary" />Avez-vous des connaissances en IT ?*</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4">
                <RadioGroupItem value="Oui" /> <FormLabel className="font-normal">Oui</FormLabel>
                <RadioGroupItem value="Non" /> <FormLabel className="font-normal">Non</FormLabel>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("has_it_knowledge") === "Oui" && (
        <FormField
          control={form.control}
          name="it_skills" // This should match the name in your schema
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base flex items-center">
                  <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                  Merci de préciser les langages de développement maîtrisés*
                </FormLabel>
                <FormDescription>Sélectionnez les 3 meilleures compétences.</FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {itSkills.map((language:ItSkills) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={field.value?.includes(language)}
                      onCheckedChange={(checked) => {
                        if (checked) field.onChange([...(field.value || []), language]);
                        else field.onChange((field.value || []).filter((value: string) => value !== language));
                      }} />
                    <FormLabel htmlFor={language}>{language}</FormLabel>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}



    </div>
  );
}
