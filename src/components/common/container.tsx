import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerSizes;
}

export const containerSizes = {
  md: "mx-auto w-full px-4 sm:w-11/12 md:w-5/6 lg:w-4/6 xl:w-1/2",
  lg: "mx-auto w-full px-4 sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-2/3",
  xl: "mx-auto w-full px-4 lg:w-4/5 xl:w-2/3",
  max: "mx-auto w-full px-4 md:px-8",
};

export default function Container({
  className,
  children,
  size = "md",
  ...rest
}: Props) {
  return (
    <div className={cn(containerSizes[size], className)} {...rest}>
      {children}
    </div>
  );
}
