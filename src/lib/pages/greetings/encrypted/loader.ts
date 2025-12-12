import { occasionTemplates } from 'lib/components/GreetingsTemplates/templates';
import type { OccasionsKeyType } from 'lib/components/GreetingsTemplates/types';
import { decryptText } from 'lib/utils/decryptText';
import { getTemplateImage } from 'lib/utils/getTemplateImage';
import type { GetServerSideProps } from 'next';

import type {
  EncryptedGreetingPageParams,
  EncryptedGreetingPageProps,
} from './types';

export const getServerSideProps: GetServerSideProps<
  EncryptedGreetingPageProps,
  EncryptedGreetingPageParams
  // biome-ignore lint/suspicious/useAwait: gssp
> = async (ctx) => {
  const { query, params } = ctx;

  const occasion = params.occasion as string;

  const isValidOccassion = occasionTemplates
    .map((template) => template.type as string)
    .includes(occasion);

  if (!isValidOccassion) {
    return {
      notFound: true,
    };
  }

  const decryptedName = query.name ? decryptText(query.name as string) : null;
  const decryptedMessage = query.message
    ? decryptText(query.message as string)
    : null;
  const decryptedFrom = query.from ? decryptText(query.from as string) : null;
  const imageSrc = getTemplateImage(occasion as OccasionsKeyType);

  return {
    props: {
      name: decryptedName,
      message: decryptedMessage,
      from: decryptedFrom,
      occasion: occasion as OccasionsKeyType,
      imageSrc,
    },
  };
};
