"use client";

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { CheckSquare, AlertTriangle, Circle, Laptop } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import type { FormData } from '@/lib/schemas/formSchema';
import { MOTIVATION_LEVELS, INTEREST_ITEMS, OBJECTIVES, CURRENT_SITUATION, IT_LANGUAGES } from '@/lib/schemas/formSchema';


interface Step3Props {
  form: UseFormReturn<FormData>;
}

export function Step3AdditionalInfo({ form }: Step3Props) {
  return (
    <div className="space-y-6">
      {/* Quel est votre objectif? */}
      <FormField
        control={form.control}
        name="objective"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-primary" />Quel est votre objectif ?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
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
        name="currentSituation"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-primary" />Quelle est votre situation actuelle ?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
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
        name="hasPowerfulLaptop"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormLabel className="font-normal flex items-center space-x-2"><Laptop className="h-4 w-4 text-primary" />Avez-vous un ordinateur portable suffisamment puissant (minimum CPU i5, RAM 8 Go) ?</FormLabel>
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



      {/* previous code */}
      <FormField
        control={form.control}
        name="motivation_level"
        render={({ field }) => (
          <FormItem className="space-y-3 hidden">
                {MOTIVATION_LEVELS.map((level) => (
                   <FormItem key={level.value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={level.value} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {level.label}
                    </FormLabel>
                  </FormItem>
                ))}

              <FormLabel className="flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-primary" />Quel est votre niveau de motivation pour ce programme ?</FormLabel>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="is_available_q2"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-card">
            <div className="space-y-0.5">
              <FormLabel className="text-base flex items-center">
                <Circle className="mr-2 h-4 w-4 text-primary" />
                Êtes-vous disponible pour des sessions de formation en soirée ?
              </FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="interests"


        render={({ field }) => (
          <FormItem className="hidden">
            <div className="mb-4">
              <FormLabel className="text-base flex items-center"><CheckSquare className="mr-2 h-4 w-4 text-primary" />Quels sont vos centres d'intérêt ?</FormLabel>
              <FormDescription>
                Sélectionnez ceux qui s'appliquent.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hasITKnowledge"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormLabel className="font-normal flex items-center space-x-2"><Laptop className="h-4 w-4 text-primary" />Avez-vous des connaissances en IT ?</FormLabel>
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

      {form.watch("hasITKnowledge") === "Oui" && (
        <FormField
        control={form.control}
        name="itLanguages"

        render={({ field }) => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base flex items-center"><CheckSquare className="mr-2 h-4 w-4 text-primary" />Merci de préciser les langages de développement maîtrisés</FormLabel>
              <FormDescription>Sélectionnez les 3 meilleures compétences.</FormDescription>
            </div>

        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base flex items-center"><CheckSquare className="mr-2 h-4 w-4 text-primary" />Quels sont vos centres d'intérêt ?</FormLabel>
              <FormDescription>
                Sélectionnez ceux qui s'appliquent.
              </FormDescription>
            </div>
            {INTEREST_ITEMS.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="interests"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), item.id])
                              : field.onChange(
                                  (field.value || []).filter(
                                    (value) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    )}



    </div>
  );
}
