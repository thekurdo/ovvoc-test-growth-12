export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    createdAt: Date;
}
export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    page: number;
    totalPages: number;
    totalItems: number;
}
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type CreateUser = Optional<User, 'id' | 'createdAt'>;
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly NOT_FOUND: 404;
    readonly INTERNAL_ERROR: 500;
};
export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
//# sourceMappingURL=types.d.ts.map