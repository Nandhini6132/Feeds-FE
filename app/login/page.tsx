'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../actions/authAction';
import {useRouter} from 'next/navigation'

export type LoginBody = {
  email: string;
  password: string;
};


export default function Login() {
  const router=useRouter()
  const [loginFields, setLoginFields] = useState({
    email: '',
    password: '',
  });

  const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  async function handleSubmit(values:LoginBody) {
    console.log(values, 'login');
    try {
      const response = await loginUser(values);
      localStorage.setItem('accessToken',response.accessToken)
      console.log(response);
      router.push('/')
    } catch (error) {
      console.log(error, 'error');
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-[var(--bg-secondary)] p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Login to your account
        </h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="email"
                  placeholder="Email"
                  //  value={loginFields.email}
                  //  onChange={(e) =>
                  //    setLoginFields({ ...loginFields, email: e.target.value })
                  //  }
                  className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-indigo-700"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-300 text-sm"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  //  value={loginFields.password}
                  //  onChange={(e) =>
                  //    setLoginFields({ ...loginFields, password: e.target.value })
                  //  }
                  className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-300 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Login
              </button>

              <p className="text-sm text-gray-400 mt-2 text-center">
                Don’t have an account?{' '}
                <Link
                  href="/signup"
                  className="text-indigo-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


