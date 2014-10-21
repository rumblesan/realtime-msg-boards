
declare class Pusher {
    constructor(applicationKey: string, options?: PusherOptions);
    disconnect(): void;
    subscribe(channelName: string): PusherChannel
    connection: PusherConnection;
}

interface PusherConnection {
    bind(eventName: string, callback: Function): void
}

interface PusherOptions {
    encrypted?: boolean;
    authEndpoint?: string;
    authTransport?: string;
    auth?: PusherAuth;
    cluster?: string;
    disableFlash?: boolean;
    disableStats?: boolean;
}

interface PusherAuth {
    params?: Object;
    headers?: Object;
}

interface PusherChannel {
    bind(eventName: string, callback: Function): void
    unbind(eventName: string, callback: Function): void
}

declare class PublicChannel implements PusherChannel {
    bind(eventName: string, callback: Function): void
    unbind(eventName: string, callback: Function): void
}

declare class PrivateChannel implements PusherChannel {
    bind(eventName: string, callback: Function): void
    unbind(eventName: string, callback: Function): void
}

declare class PresenceChannel implements PusherChannel {
    bind(eventName: string, callback: Function): void
    unbind(eventName: string, callback: Function): void
}

