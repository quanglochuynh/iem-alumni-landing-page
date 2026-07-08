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

function shortenLabel(label: string, maxLength: number): string {
  if (label.length <= maxLength) {
    return label;
  }
  return label.slice(0, maxLength) + '...';
}

export default function SimpleBreadcrumb({ paths, ...props }: Props) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <Fragment key={index}>
            <BreadcrumbItem key={index}>
              {index < paths.length - 1 ? (
                <BreadcrumbLink href={path.href}>
                  {shortenLabel(path.name, 20)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{shortenLabel(path.name, 20)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
