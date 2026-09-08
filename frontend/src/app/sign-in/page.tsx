import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated";
import SignIn from "@/components/auth/sign-in";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

function SignInPage() {
  return (
    <main className="app-shell-bg items-center justify-center flex min-h-svh px-6 py-10">
      <Card className="w-full max-w-md border-border/70 bg-card/90 shadow-none ring-1 ring-border/50 ">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary ">
            <Sparkles className="size-5" />
          </div>
          <CardTitle className="font-heading text-3xl font-semibold tracking-tight ">
            Meeting Assistant
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Sign in to connect calendar and start scheduling with your agent
          </CardDescription>
        </CardHeader>

        <RedirectIfAuthenticated>
          <SignIn />
        </RedirectIfAuthenticated>
      </Card>
    </main>
  );
}

export default SignInPage;
