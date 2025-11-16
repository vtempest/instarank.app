import { GoogleSignInButton } from "@/components/auth/google-signin-button"
import { GoogleOneTap } from "@/components/auth/google-onetap"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <GoogleOneTap />
        
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-white">IR</span>
            </div>
            <span className="text-2xl font-bold text-foreground">InstaRank</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
        </div>

        <div className="rounded-lg border border-border bg-background p-8 shadow-sm">
          <GoogleSignInButton />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
