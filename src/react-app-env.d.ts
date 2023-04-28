/// <reference types="react-scripts" />

type RefType = MutableRefObject<unknown> | ((instance: unknown) => void);
type CommonObjectType<T = any> = Record<string, T>;
