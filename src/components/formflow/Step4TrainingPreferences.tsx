import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const trainingOptions = {
  "Développement Web": ["Frontend", "Backend", "Fullstack"],
  "Data & IA": ["Data Science", "Machine Learning", "Analyse de données"],
};

const howHearOptions = [
  "Réseaux sociaux",
  "Site web",
  "Ami/Collègue",
  "École/Université",
  "Autre",
];

export function Step4TrainingPreferences() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="formationSouhaitee"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Sélectionnez la formation souhaitée *</FormLabel>
            {Object.keys(trainingOptions).map((category) => (
              <div key={category} className="space-y-2">
                <FormLabel className="block text-sm font-medium text-gray-700">{category}</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {(trainingOptions as any)[category].map((option: string) => (
                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="commentEntendu"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Comment avez-vous entendu parler du programme Jobintech? *</FormLabel>
              <FormDescription>
                Select all that apply.
              </FormDescription>
            </div>
            {howHearOptions.map((item) => (
              <FormField
                key={item}
                control={control}
                name="commentEntendu"
                render={({ field }) => {
                  return (
                    <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item}
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

      <FormField
        control={control}
        name="engagement"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Je confirme avoir pris connaissance des modalités de candidature et de sélection, certifie l&apos;exactitude des renseignements contenus dans ma candidatures, et m’engage à présenter toutes les pièces justificatives, y compris les relevés des notes de mon cursus universitaire le jour des entretiens en cas de convocation à ces derniers. *
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}