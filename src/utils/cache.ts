// const cache = () => {
//     const cacheMap = new Map();

//     function get(key: string) {
//         return cacheMap.get(key);
//     }

//     function set(key: string, value: string) {
//         cacheMap.set(key, value);
//     }

//     function del(key: string) {
//         cacheMap.delete(key);
//     }

//     function clear() {
//         cacheMap.clear();
//     }

//     function has(key: string) {
//         return cacheMap.has(key);
//     }

//     function size() {
//         return cacheMap.size;
//     }

//     function values() {
//         return cacheMap.values();
//     }

//     function keys() {
//         return cacheMap.keys();
//     }

//     function entries() {
//         return cacheMap.entries();
//     }

//     return {
//         get,
//         set,
//         del,
//         clear,
//         has,
//         size,
//         values,
//         keys,
//         entries,
//     };
// }
interface Cache {
    [key: string]: {
        value: any;
        timeout?: NodeJS.Timeout;
    };
}

// Initialize in-memory cache object
const cache: Cache = {};

// Set a key-value pair in the cache with an optional timeout in seconds
function setCache(key: string, value: any, timeoutSeconds?: number) {
    cache[key] = { value };
    if (timeoutSeconds) {
        cache[key].timeout = setTimeout(() => {
            delete cache[key];
        }, timeoutSeconds * 1000);
    }
}

// Get the value associated with a key from the cache
function getCache(key: string, timeoutSeconds?: number): any | null {
    if (cache[key] && !cache[key].timeout) {
        return cache[key].value;
    } else if (cache[key] && cache[key].timeout) {
        // Clear timeout and reset it
        clearTimeout(cache[key].timeout);
        cache[key].timeout = setTimeout(() => {
            delete cache[key];
        }, timeoutSeconds ? timeoutSeconds : 1 * 1000);
        return cache[key].value;
    }
    return null;

}

// Delete the value associated with a key from the cache
function deleteCache(key: string) {
    if (cache[key]) {
        clearTimeout(cache[key].timeout);
        delete cache[key];
    }
}

export const memCache = { set: setCache, get: getCache, del: deleteCache }

// export default cache