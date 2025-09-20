/* eslint-disable  @typescript-eslint/no-explicit-any */
export declare type ClassConstructor<T = any> = {
  new (...args: any[]): T
}

export interface unknownObj {
  [key: string]: any
}
