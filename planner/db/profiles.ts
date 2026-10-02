import { getRawDb } from './raw';

export type Profile = {
 userId: string;
 displayName: string;
 createdAt: string;
};

export async function getProfile(userId: string): Promise<Profile | null> {
 return getRawDb().prepare(
  'SELECT user_id AS userId, display_name AS displayName, created_at AS createdAt FROM profiles WHERE user_id = ?'
 ).bind(userId).first<Profile>();
}
