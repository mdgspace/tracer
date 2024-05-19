import { ChangeEvent, FormEvent } from 'react';

export type _WORKSPACE_FORM_ERROR = {
  workspace: string | null;
  description: string | null;
  image: string | null;
  member: string | null;
};
export type _WORKSPACE_FORM = {
  workspace: string;
  description: string;
  image: File | undefined;
  members: string[];
  member: string;
};
export type _WORKSPACE_FORM_CHANGE = (
  event: ChangeEvent<HTMLInputElement>,
  index?: number
) => void;

export type _FORM_SUBMIT = (event: FormEvent<HTMLFormElement>) => void;

export type _VALIDATE_PROPS = (name: string, value: string) => string;
