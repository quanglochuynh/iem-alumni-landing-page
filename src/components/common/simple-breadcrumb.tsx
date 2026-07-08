import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ComponentProps, Fragment } from 'react';

type Props = {
  paths: {
    name: string;
    href: string;
  }[];
} & ComponentProps<'nav'>;

export default function SimpleBreadcrumb({ paths, ...props }: Props) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <Fragment key={index}>
            <BreadcrumbItem key={index}>
              {index < paths.length - 1 ? (
                <BreadcrumbLink href={path.href}>{path.name}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{path.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
