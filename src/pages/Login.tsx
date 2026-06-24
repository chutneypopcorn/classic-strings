import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, LogIn, UserPlus, KeyRound } from "lucide-react";

function getOAuthUrl() {
  const clientId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const authBase = import.meta.env.VITE_KIMI_AUTH_URL;

  const url = new URL(`${authBase}/oauth/authorize`);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", crypto.randomUUID());

  return url.toString();
}

export default function Login() {
  const { isAuthenticated } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  if (isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      loginMutation.mutate({ username, password });
    } else {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      registerMutation.mutate({
        username,
        password,
        displayName: displayName || undefined,
      });
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen bg-[#343a3f] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-sans hover:text-[#e3fe3b] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-white mb-2">
            Classic Strings
          </h1>
          <p className="text-white/40 text-sm font-sans">
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        {/* OAuth Login */}
        <a
          href={getOAuthUrl()}
          className="w-full flex items-center justify-center gap-3 bg-white text-[#343a3f] py-3.5 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors mb-6"
        >
          <KeyRound className="w-4 h-4" />
          Continue with Kimi OAuth
        </a>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs uppercase tracking-wider font-sans">
            or
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Local Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider font-sans mb-1.5 block">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider font-sans mb-1.5 block">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider font-sans mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "register" ? "Min 6 characters" : "Enter password"}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs font-sans bg-red-400/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#e3fe3b] text-[#343a3f] py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold hover:bg-[#e3fe3b]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {mode === "login" ? (
              <>
                <LogIn className="w-4 h-4" />
                {isPending ? "Signing in..." : "Sign In"}
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                {isPending ? "Creating account..." : "Create Account"}
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
            className="text-white/40 text-xs font-sans hover:text-white transition-colors"
          >
            {mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
