'use client';
import { useEffect } from 'react';
import { test } from './actions/authAction';
import Link from 'next/link';

export default function Home() {
  async function home() {
    const response = await test();
    //   const data = await response.json();
    console.log(response, 'data');
  }
  useEffect(() => {
    home();
  }, []);
  return (
    <main>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign.up</Link>
      <h1>Feeds</h1>
    </main>
  );
}
