import { Link, Form, redirect } from 'react-router-dom';
import styles from './NewPost.module.scss';
import Modal from '../../components/Modal/Modal';

function NewPost({ onAddPost }) {

  return (
    <Modal>
      <Form method='post' className={styles.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={styles.actions}>
          <Link to="/" type='button'>
            Cancel
          </Link>
          <button type='submit'>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  await fetch('https://feedback-poster-server.onrender.com/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return redirect('/');
}