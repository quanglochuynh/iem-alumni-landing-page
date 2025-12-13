import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function AboutUsSection({ ...props }: Props) {
  return <section {...props}>AboutUsSection</section>;
}
