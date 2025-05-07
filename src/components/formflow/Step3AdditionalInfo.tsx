"use client";

import type { UseFormReturn } from 'react-hook-form';
import { CheckSquare, AlertTriangle, Circle } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import type { FormData } from '@/lib/schemas/formSchema';
import { MOTIVATION_LEVELS, INTEREST_ITEMS } from '@/lib/schemas/formSchema';

interface Step3Props {
  form: UseFormReturn<FormData>;
}

export function Step3AdditionalInfo({ form }: Step3Props) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="motivation_level"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-primary" />Quel est votre niveau de motivation pour ce programme ?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
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
    </div>
  );
}
