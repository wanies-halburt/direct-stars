"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useAdminAuthStore } from "../store/AdminAuthStore";
import { AdminUser } from "@/types/Admin";

export const useAuth = () => {
  const pathname = usePathname();
  const { loading, getAdminUserProfile, getAllAdmins } = useAdminAuthStore();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const endUserSession = useAdminAuthStore((state) => state.logout);

  useEffect(() => {
    const checkUserprofile = async () => {
      const res = await getAdminUserProfile();
      if (!loading) {
        setIsAuthenticating(false);
        if (res) {
        await getAllAdmins();
          setUser(res);
        } else {
          endUserSession();
        }
      } else {
        setIsAuthenticating(true);
      }
    };
    checkUserprofile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return {
    isAuthenticated: !!user,
    userData: user,
    isAuthenticating,
  };
};
