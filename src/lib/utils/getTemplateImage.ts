import crypto from 'node:crypto';
import { occasionTemplates } from 'lib/components/GreetingsTemplates/templates';
import type {
  OccasionsKeyType,
  OccasionTemplateType,
} from 'lib/components/GreetingsTemplates/types';

export const getTemplateImage = (occasion: OccasionsKeyType) => {
  const selectedOccasionTemplate: OccasionTemplateType = occasionTemplates.find(
    ({ type }) => type === occasion,
  );
  const randomImageNum = crypto.randomInt(
    selectedOccasionTemplate.imageSrc.length,
  );

  return selectedOccasionTemplate.imageSrc[randomImageNum];
};
