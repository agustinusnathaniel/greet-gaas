export const occasions = ['new-year', 'chinese-new-year', 'christmas'] as const;

export type OccasionsKeyType = (typeof occasions)[number];

export type OccasionTemplateType = {
  type: OccasionsKeyType;
  title: string;
  imageSrc: Array<string>;
  subTitle?: string;
  assetSource?: {
    name: string;
    url?: string;
  };
  customFont?: string;
};

/**
 * transformed occasions key into text
 */
export const occasionsText: Array<string> = occasions.map(
  (occasion: OccasionsKeyType) => occasion.replace(/-/g, ' '),
);

export type GreetingsTemplateProps = {
  occasion?: OccasionsKeyType;
  name?: string | null;
  message?: string | null;
  from?: string | null;
  imageSrc?: string;
};
