import Link from 'next/link';

import DevSetupLogo from '@/components/devsetup-logo';
import GithubButton from '@/components/github-button';
import GoogleButton from '@/components/google-button';
import ChevronLeft from '@/components/icons/chevron-left';

import Messages from './messages';

const Login = () => {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded  no-underline text-foreground bg-secondary/50 hover:bg-secondary/80 flex items-center group text-sm duration-300"
      >
        <ChevronLeft /> Back
      </Link>

      <div className="flex flex-col w-full justify-center gap-6 text-foreground">
        <div className="flex items-center justify-center flex-col space-y-1">
          <DevSetupLogo />
          <span className="text-xl">devsetup</span>
        </div>

        <div className="flex flex-row space-x-4 justify-between">
          <GithubButton />
          <GoogleButton />
        </div>
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-background px-6 text-white">
              or continue with
            </span>
          </div>
        </div>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />

          <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
            Sign In
          </button>
          <Messages />
        </form>
      </div>
    </div>
  );
};

export default Login;
