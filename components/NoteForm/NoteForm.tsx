import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

import { createNote } from '../../lib/api';
import type { CreateNoteDto } from '../../types/note';

import css from './NoteForm.module.css';

const TAG_OPTIONS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(100).required('Title is required'),
  content: Yup.string().min(5).required('Content is required'),
  tag: Yup.string().oneOf(TAG_OPTIONS),
});

const initialValues: CreateNoteDto = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess?.(); // close the modal if passed
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field name="content" as="textarea" className={css.textarea} rows={5} />
            <ErrorMessage name="content" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" as="select" className={css.select}>
              {TAG_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
