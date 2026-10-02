import { env } from 'cloudflare:workers';
export function getRawDb() {
 if (!env.DB) throw new Error('Assignment database is unavailable.');
 return env.DB;
}
