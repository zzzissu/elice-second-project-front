import React from "react";
import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { Form } from "./FormContainer.styled";

interface FormContainerProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
}

function FormContainer<T extends FieldValues>({
  children,
  onSubmit,
  methods,
}: FormContainerProps<T>) {
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>{children}</Form>
    </FormProvider>
  );
}

export default FormContainer;
