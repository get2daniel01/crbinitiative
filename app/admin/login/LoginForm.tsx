'use client';

import { useActionState } from 'react';
import { login, type LoginState } from '../actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="adm-form" style={{ maxWidth: 420 }}>
      <label className="fld">
        <span>Email</span>
        <input type="email" name="email" autoComplete="username" required />
      </label>
      <label className="fld">
        <span>Password</span>
        <input type="password" name="password" autoComplete="current-password" required />
      </label>
      {state.error && (
        <p className="adm-error" role="alert">
          {state.error}
        </p>
      )}
      <button className="btn" type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
