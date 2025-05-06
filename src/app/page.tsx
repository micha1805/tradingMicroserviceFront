import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <span className="text-blue-600">
            Trading Platform
          </span>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by{' '}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            logging in
          </Link>
          {' '}or{' '}
          <Link
            href="/auth/signup"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            signing up
          </Link>
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Link
            href="/auth/login"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Login &rarr;</h3>
            <p className="mt-4 text-xl">
              Access your account and start trading
            </p>
          </Link>

          <Link
            href="/auth/signup"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Sign Up &rarr;</h3>
            <p className="mt-4 text-xl">
              Create a new account and join our platform
            </p>
          </Link>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://github.com/yourusername/trading-platform"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Trading Platform
        </a>
      </footer>
    </div>
  );
} 