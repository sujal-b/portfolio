import { type ReactNode, type ElementType } from 'react';

interface TextGradientProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export default function TextGradient({
  children,
  className = '',
  as: Tag = 'span',
}: TextGradientProps) {
  return <Tag className={`text-gradient ${className}`}>{children}</Tag>;
}
