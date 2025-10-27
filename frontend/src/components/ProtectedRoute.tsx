import { useUserContext } from "@/contexts/UserContext";
import { PageType } from "@/types/pages.types";
import type { USER_ROLE } from "@/types/user.types";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
  allowedRoles: USER_ROLE[];
  redirectTo: string;
  pageType: PageType;
};

export default function ProtectedRoute({
  allowedRoles,
  children,
  redirectTo,
  pageType,
}: Props) {
  const { data, loading } = useUserContext();

  if (loading) {
    return (
      <div className="h-[600px] flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }
  if (pageType == PageType.PUBLIC) return children;
  if (pageType == PageType.AUTH) {
    if (data.user) return <Navigate to={redirectTo} />;
    return children;
  }
  if (pageType == PageType.PROTECTED) {
    if (!data.user || !allowedRoles.includes(data.user.role))
      return <Navigate to={redirectTo} />;
  }
  return <div>{children}</div>;
}
