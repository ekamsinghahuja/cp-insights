import { redis } from "./redis";

const SIX_HOURS = 60 * 60 * 6;

export async function getCache<T>(key: string): Promise<T | null> {
    return await redis.get<T>(key);
}

export async function setCache<T>(key: string, value: T): Promise<void> {
    await redis.set(key, value, { ex: SIX_HOURS });
}

export const CacheKey = {
    user: (handle: string) => `cf:user:${handle}`,
    submissions: (handle: string) => `cf:submissions:${handle}`,
};