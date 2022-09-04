import { FormEventHandler, memo, useCallback, PropsWithChildren } from "react";

import { useThrottledCallback } from "../hooks/useThrottledCallback";

type OnPrepareOptions<FORM, OPTIONS> = (form: FORM) => OPTIONS;
type OnLoad<OPTIONS> = (options: OPTIONS) => Promise<unknown>;

export type FormProps<FORM, OPTIONS> = {
  onPrepareOptions: OnPrepareOptions<FORM, OPTIONS>;
  onLoad: OnLoad<OPTIONS>;
};

const FormComponent = <FORM extends HTMLFormElement, OPTIONS>({
  children,
  onPrepareOptions,
  onLoad
}: PropsWithChildren<FormProps<FORM, OPTIONS>>) => {

  const handleLoad = useThrottledCallback(onLoad, 500);

  const handleSubmitForm = useCallback<FormEventHandler<FORM>>(
    (e) => {
      e.preventDefault();

      const options = onPrepareOptions(e.currentTarget);

      handleLoad(options);
    },
    [onLoad, onPrepareOptions]
  );

  return <form onSubmit={handleSubmitForm}>{children}</form>;
};

export const Form = memo(FormComponent) as typeof FormComponent;
