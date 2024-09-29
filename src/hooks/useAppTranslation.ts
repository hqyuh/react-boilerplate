import type english from '@/translation/locales/en.json';
import type { InterpolationMap, TOptionsBase } from 'i18next';
import { useTranslation } from 'react-i18next';

/* eslint-disable */

export type NestedKeyOf<ObjectType extends Object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

/* eslint-enable */

const useAppTranslate = () => {
  const translation = useTranslation();

  const translate = (key: NestedKeyOf<typeof english>, options?: TOptionsBase & InterpolationMap<any>) =>
    translation.t(key as unknown as string, options);

  return {
    ...translation,
    translate
  };
};

export default useAppTranslate;
