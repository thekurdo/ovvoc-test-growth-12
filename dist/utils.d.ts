import { User, ApiResponse, PaginatedResponse } from './types';
export declare function createApiResponse<T>(data: T, status?: number, message?: string): ApiResponse<T>;
export declare function createPaginatedResponse<T>(data: T[], page: number, totalItems: number, pageSize?: number): PaginatedResponse<T>;
export declare function filterUsers(users: User[], predicate: (user: User) => boolean): User[];
export declare function groupBy<T>(items: T[], key: keyof T): Record<string, T[]>;
export declare function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
export declare function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
//# sourceMappingURL=utils.d.ts.map