'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DebugPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const localUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border border-stone-200">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Debug Page</h1>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="font-bold text-blue-900 mb-2">Auth Context</h2>
            <pre className="text-sm text-blue-800 overflow-auto">
              Loading: {loading.toString()}
              User: {user ? JSON.stringify(user, null, 2) : 'null'}
            </pre>
          </div>

          <div className="bg-purple-50 p-4 rounded border border-purple-200">
            <h2 className="font-bold text-purple-900 mb-2">LocalStorage</h2>
            <pre className="text-sm text-purple-800 overflow-auto">
              Token: {token ? token.substring(0, 20) + '...' : 'null'}
              User: {localUser ? JSON.stringify(localUser, null, 2) : 'null'}
            </pre>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                console.clear();
                router.push('/login');
              }}
              className="w-full bg-stone-900 text-white px-4 py-2 rounded font-semibold"
            >
              Go to Login
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="w-full bg-amber-700 text-white px-4 py-2 rounded font-semibold"
            >
              Go to Admin
            </button>
            <Link
              href="/"
              className="block text-center bg-stone-200 text-stone-900 px-4 py-2 rounded font-semibold"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
