import { useState, FormEvent } from 'react';
import { PostProps } from '../../api/types';
import styles from './styles.module.css';

interface PostFormProps {
  initialValues?: Partial<PostProps>;
  onSubmit: (title: string, body: string) => void;
  submitButtonText: string;
}

const PostForm = ({ initialValues, onSubmit, submitButtonText }: PostFormProps) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [body, setBody] = useState(initialValues?.body || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(title, body);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="body">Content</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={styles.textarea}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        {submitButtonText}
      </button>
    </form>
  );
};

export default PostForm;
