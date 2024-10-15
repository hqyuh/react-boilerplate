import { Helmet } from 'react-helmet-async';

type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export const Metadata = ({ title, description, image, url }: MetadataProps) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name='description' content={description} />}
      {image && <meta property='og:image' content={image} />}
      {url && <meta property='og:url' content={url} />}
      {title && <meta property='og:title' content={title} />}
    </Helmet>
  );
};
