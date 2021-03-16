export type WrapperResultSync<T> = (...args: any[]) => Promise<T>

export type WrapperResult<T> = (...args: any[]) => T
