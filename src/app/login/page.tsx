import DevSetupLogo from '@/components/devsetup-logo';
import GithubButton from '@/components/github-button';
import GoogleButton from '@/components/google-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Messages from './messages';

const Login = () => {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex flex-col w-full justify-center gap-6 text-foreground">
        <div className="flex items-center justify-center flex-col space-y-1">
          <DevSetupLogo />
          <span className="font-medium text-lg">DevSetup</span>
        </div>

        <div className="flex flex-row space-x-4 justify-between  ">
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
          className="flex-1 flex flex-col w-full justify-center gap-3 text-foreground"
          action="/api/auth/sign-in"
          method="post"
        >
          <Label>Email</Label>
          <Input required name="email" placeholder="you@example.com"></Input>
          <Button type="submit" variant="secondary">
            Sign in
          </Button>
          <Messages />
        </form>
      </div>
    </div>
  );
};

export default Login;
