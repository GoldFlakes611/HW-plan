import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { UserPlus, ShieldCheck } from 'lucide-react';
import { getChatGPTUser, chatGPTSignInPath } from '../chatgpt-auth';
import { getProfile } from '@/db/profiles';
import AuthFrame from '../auth-frame';
import CreateAccountForm from './create-account-form';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {title:'Create an account · Due'};

export default async function Signup() {
 const user = await getChatGPTUser();
 let profile = null;
 let unavailable = false;
 if (user) {
  try { profile = await getProfile(user.userId); }
  catch (error) { console.error('Loading account on signup failed', error); unavailable = true; }
 }
 if (profile) redirect('/');
 return <AuthFrame>
  <div className="auth-icon"><UserPlus size={23}/></div>
  <div className="auth-eyebrow">A FRESH START</div>
  <h1>Create your account</h1>
  <p className="auth-intro">Make a home for your assignments. Your planner stays with your account.</p>
  {unavailable ? <div className="auth-unavailable" role="alert"><p>Your account could not be loaded. Please try again.</p><a href="/signup" className="outline">Retry</a></div> : user ? <CreateAccountForm email={user.email} defaultName={user.fullName||user.email.split('@')[0]}/> : <>
   <a className="primary auth-primary" href={chatGPTSignInPath('/signup')} target="_top"><UserPlus size={18}/> Continue with ChatGPT</a>
   <div className="auth-security"><ShieldCheck size={17}/><p>Use your ChatGPT account to sign in, then create your personal planner profile.</p></div>
  </>}
  <p className="auth-bottom-link">Already have an account? <a href="/login">Log in</a></p>
 </AuthFrame>;
}
