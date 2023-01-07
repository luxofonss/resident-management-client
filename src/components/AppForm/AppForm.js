import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function AppForm({ children, onSubmit, ...props }) {
    const methods = useForm();
    return (
        <FormProvider {...methods}>
            <form id={props.id} onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
}
