import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

export const config = {
  // Skip paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
