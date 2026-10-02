import type { Metadata } from 'next';
import { LogIn, ShieldCheck } from 'lucide-react';
import { getChatGPTUser, chatGPTSignInPath, chatGPTSignOutPath } from '../chatgpt-auth';
import { getProfile } from '@/db/profiles';
import AuthFrame from '../auth-frame';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {title:'Log in · Due'};

export default async function Login() {
 const user = await getChatGPTUser();
 let profile = null;
 let unavailable = false;
 if (user) {
  try { profile = await getProfile(user.userId); }
  catch (error) { console.error('Loading account on login failed', error); unavailable = true; }
 }
 return <AuthFrame>
  <div className="auth-icon"><LogIn size={23}/></div>
  <div className="auth-eyebrow">WELCOME BACK</div>
  <h1>Log in to your planner</h1>
  <p className="auth-intro">Pick up where you left off. Your deadlines are waiting for you.</p>
  {unavailable ? <div className="auth-unavailable" role="alert"><p>Your account could not be loaded. Please try again.</p><a href="/login" className="outline">Retry</a></div> : user ? <>
   <div className="auth-identity"><span className="auth-avatar">{(profile?.displayName||user.displayName).slice(0,1).toUpperCase()}</span><div><strong>{profile?.displayName||user.fullName||'Signed in with ChatGPT'}</strong><span>{user.email}</span></div></div>
   <a className="primary auth-primary" href={profile?'/':'/signup'}>{profile?'Open my planner':'Create my planner account'}</a>
   <a className="auth-secondary-link" href={chatGPTSignOutPath('/login')} target="_top">Use a different account</a>
  </> : <a className="primary auth-primary" href={chatGPTSignInPath('/')} target="_top"><LogIn size={18}/> Log in with ChatGPT</a>}
  <div className="auth-security"><ShieldCheck size={17}/><p>Sign in securely with your ChatGPT account. No extra password to remember.</p></div>
  {!user && <><div className="auth-divider"><span>New to Due?</span></div><a className="outline auth-create-link" href="/signup">Create an account</a></>}
 </AuthFrame>;
}
