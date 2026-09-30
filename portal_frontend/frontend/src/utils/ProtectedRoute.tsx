import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const FullscreenSpinner = () => (
  <div style={{ display: "flex", minHeight: "60vh", alignItems: "center", justifyContent: "center" }}>
    Loading…
  </div>
);

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, loading, refresh } = useAuth();
  const location = useLocation();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        await refresh(); // récupère l'utilisateur si nécessaire
      } finally {
        if (mounted) setLocalLoading(false);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [refresh]);

  if (loading || localLoading) return <FullscreenSpinner />;

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <>{children}</>;
};

export default ProtectedRoute;
