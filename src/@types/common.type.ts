import type { FC, PropsWithChildren } from 'react';

export type TNullable<T> = T | null;

export type TFCC<P = unknown> = FC<PropsWithChildren<P>>;
