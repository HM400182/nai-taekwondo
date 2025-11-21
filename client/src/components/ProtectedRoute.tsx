// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        setChecking(false);
        return;
      }

      // Check if user has admin access
      const adminDoc = await getDoc(doc(db, "admins", user.email!));
      
      if (!adminDoc.exists()) {
        await auth.signOut();
        navigate("/login");
      }
      
      setChecking(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (checking) {
    return <div className="p-8 text-center">Checking access…</div>;
  }

  return <>{children}</>;
}
