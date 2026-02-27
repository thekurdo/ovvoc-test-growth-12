"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiResponse = createApiResponse;
exports.createPaginatedResponse = createPaginatedResponse;
exports.filterUsers = filterUsers;
exports.groupBy = groupBy;
exports.pick = pick;
exports.omit = omit;
function createApiResponse(data, status = 200, message = 'OK') {
    return { data, status, message, timestamp: new Date() };
}
function createPaginatedResponse(data, page, totalItems, pageSize = 20) {
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
function filterUsers(users, predicate) {
    return users.filter(predicate);
}
function groupBy(items, key) {
    return items.reduce((groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey])
            groups[groupKey] = [];
        groups[groupKey].push(item);
        return groups;
    }, {});
}
function pick(obj, keys) {
    const result = {};
    for (const key of keys) {
        if (key in obj)
            result[key] = obj[key];
    }
    return result;
}
function omit(obj, keys) {
    const result = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
}
//# sourceMappingURL=utils.js.map