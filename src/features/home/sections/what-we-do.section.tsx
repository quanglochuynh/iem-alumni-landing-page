import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function WhatWeDoSection({ ...props }: Props) {
  return <section {...props}>WhatWeDoSection</section>;
}
