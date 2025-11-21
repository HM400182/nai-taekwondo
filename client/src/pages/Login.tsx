// src/pages/Login.tsx
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if user is admin
      const adminDoc = await getDoc(doc(db, "admins", email));
      
      if (!adminDoc.exists()) {
        await auth.signOut();
        toast.error("You don't have admin access!");
        return;
      }

      toast.success("Welcome back!");
      navigate("/admin");
    } catch (error: any) {
      toast.error("Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.warning("Please enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      toast.error("Failed to send reset email");
      console.error("Reset error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card shadow-lg rounded-2xl border p-8 space-y-6"
      >
        {/* Logo / Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Taekwondo Admin Login</h1>
          <p className="text-muted-foreground mt-2">
            Manage events, gallery, and registrations
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        {/* Forgot Password */}
        <div className="text-center">
          <button
            type="button"
            onClick={handlePasswordReset}
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </motion.div>
    </div>
  );
}
