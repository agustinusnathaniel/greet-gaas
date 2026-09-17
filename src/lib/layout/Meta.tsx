import Head from 'next/head';

export type MetaProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonical?: string;
};

const SITE_URL = 'https://gaas.sznm.dev';
const DEFAULT_TITLE = 'GaaS';
const DEFAULT_DESCRIPTION = 'Greetings as a Service';
const DEFAULT_OG_IMAGE =
  'https://og.sznm.dev/api/generate?heading=GaaS&text=Greetings%20as%20a%20Service%20|%20https://gaas.sznm.dev&template=color&center=true';
const DEFAULT_OG_IMAGE_ALT = 'gaas.sznm.dev og-image';

const Meta = ({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  canonical = SITE_URL,
}: MetaProps) => {
  const fullTitle = title ? `${title} | Greetings as a Service` : DEFAULT_TITLE;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="GaaS" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@sozonome" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
};

export default Meta;
