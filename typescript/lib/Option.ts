
interface Maybe<T> {
    map <U>( fn: (a:T) => U): Maybe<U>;
    isDefined: boolean;
    get() :T;
}

class Just<T> implements Maybe<T>{
    private value: T;

    constructor(v:T) {
        this.value = v;
    }
    map <U>( fn: (a:T) => U): Maybe<U> { return new Just(fn(this.value))}

    isDefined: boolean = true;

    get(): T {return this.value}

    toString(): string {
        return "Just " + this.value;
    }
}

class Nothing<T> implements Maybe<T>{
    constructor() {
    }
    map <U>( fn: (a:T) => U): Maybe<U> {
        return <Maybe<U>>Nothing._instance;
    }

    isDefined: boolean = false;

    get(): T {throw "Nothing.get"}

    private static _instance: Maybe<any> = new Nothing();

    public static instance<X>(): Maybe<X> {
        return <Maybe<X>> Nothing._instance;
    }

    public toString(): string {
        return "Nothing";
    }
}

