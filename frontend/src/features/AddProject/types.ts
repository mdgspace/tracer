import { ChangeEvent, FormEvent } from 'react';

export type _ADD_PROJECT_FORM_ERROR = {
  name: string | null;
  description: string | null;
  link: string | null;
};
export type _ADD_PROJECT_FORM = {
  name: string;
  description: string;
  link: string;
};
export type _ADD_PROJECT_FORM_CHANGE = (
  event: ChangeEvent<HTMLInputElement>,
  index?: number
) => void;

export type _FORM_SUBMIT = (event: FormEvent<HTMLFormElement>) => void;

export type _VALIDATE_PROPS = (name: string, value: string) => string;
