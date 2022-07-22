type Args = {_: string[]; __?: string[];};

export default function parser<T = {[key: string]: any}>(args: string[]): Args & T;
