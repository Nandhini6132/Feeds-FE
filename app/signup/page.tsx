'use client';
import Link from 'next/link';
import { useReducer } from 'react';
import { registerUser } from '../actions/authAction';

export default function Signup() {
  const initialstate = {
    name: '',
    email: '',
    password: '',
  };

  const [state, dispatch] = useReducer(reducerFn, initialstate);
  function reducerFn(
    state: typeof initialstate,
    action: { type: string; payload: string }
  ) {
    switch (action.type) {
      case 'name':
        return { ...state, name: action.payload };

      case 'email':
        return { ...state, email: action.payload };

      case 'password':
        return { ...state, password: action.payload };

      case 'reset':
        return initialstate;

      default:
        return state;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state, 'signup');
    dispatch({ type: 'reset', payload: '' });
    try {
      const response = await registerUser(state);
      console.log(response);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-[var(--bg-secondary)] p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-[var(--text-primary)]">
          Sign up to create an account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'name', payload: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-indigo-500 text-[var(--text-primary)]"
          />

          <input
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: 'email', payload: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-indigo-500 text-[var(--text-primary)]"
          />

          <input
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: 'password', payload: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-indigo-500 text-[var(--text-primary)]"
          />

          {/* <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-indigo-500 text-[var(--text-primary)]"
          /> */}

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700  text-white"
          >
            Sign Up
          </button>

          <p className="text-sm text-gray-400 mt-2 text-center">
            Already have an account?{' '}
            <Link href="/signup" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
