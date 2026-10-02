import Planner from './planner';
import { redirect } from 'next/navigation';
import { getChatGPTUser } from './chatgpt-auth';
import { getProfile } from '@/db/profiles';
import AuthFrame from './auth-frame';

export const dynamic = 'force-dynamic';

export default async function Home() {
 const user = await getChatGPTUser();
 if (!user) redirect('/login');
 let profile;
 try {
  profile = await getProfile(user.userId);
 } catch (error) {
  console.error('Loading account failed', error);
  return <AuthFrame><div className="auth-eyebrow">TRY AGAIN IN A MOMENT</div><h1>We couldn’t open your account</h1><p className="auth-intro">Your planner is temporarily unavailable. Please try again.</p><a href="/" className="primary auth-primary">Try again</a></AuthFrame>;
 }
 if (!profile) redirect('/signup');
 return <Planner account={{displayName:profile.displayName,email:user.email}} />;
}
