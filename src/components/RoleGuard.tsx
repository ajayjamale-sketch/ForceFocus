import React, { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { GlobalRole } from "@/types";

interface RoleGuardProps {
  allowedRoles: GlobalRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children, fallback = null }) => {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};
