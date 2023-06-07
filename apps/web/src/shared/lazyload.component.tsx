import * as React from 'react';

export interface ILazyloadProps {
  fallback?: React.ReactNode;
  children?: React.ReactElement;
}

export default function Lazyload(props: ILazyloadProps) {
  return <React.Suspense fallback={props.fallback || <>...</>}>{props.children}</React.Suspense>;
}
