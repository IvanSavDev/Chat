import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const getModalValidationSchema = (channels) => {
  const { t } = useTranslation();

  return yup.object().shape({
    channelName: yup
      .string()
      .trim()
      .required(t('modal.requiredField'))
      .notOneOf(channels, t('modal.channelExist')),
  });
};

export const getChannelsNames = (channels) => Object.values(channels).map(({ name }) => name);
