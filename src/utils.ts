import { User, ApiResponse, PaginatedResponse } from './types';

export function createApiResponse<T>(data: T, status: number = 200, message: string = 'OK'): ApiResponse<T> {
  return { data, status, message, timestamp: new Date() };
}

export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  totalItems: number,
  pageSize: number = 20
): PaginatedResponse<T> {
  return {
    data,
    status: 200,
    message: 'OK',
    timestamp: new Date(),
    page,
    totalPages: Math.ceil(totalItems / pageSize),
    totalItems,
  };
}

export function filterUsers(users: User[], predicate: (user: User) => boolean): User[] {
  return users.filter(predicate);
}

export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}
