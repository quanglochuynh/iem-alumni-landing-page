import { LocaleCode, LocaleList } from "@/constants";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: LocaleList as string[],
  defaultLocale: LocaleCode.vi,
  localePrefix: "always",
});
