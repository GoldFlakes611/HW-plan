"use client";
import { useState, type FormEvent } from 'react';
import { LoaderCircle, Mail, ShieldCheck } from 'lucide-react';

export default function CreateAccountForm({email, defaultName}: {email:string;defaultName:string}) {
 const [name,setName] = useState(defaultName.slice(0,80));
 const [saving,setSaving] = useState(false);
 const [error,setError] = useState('');

 async function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setError(''); setSaving(true);
  try {
   const response = await fetch('/api/account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({displayName:name.trim()})});
   const result = await response.json() as {error?:string};
   if (!response.ok) throw new Error(result.error||'Your account could not be created. Please try again.');
   window.location.assign('/');
  } catch (failure) { setError((failure as Error).message);setSaving(false); }
 }

 return <form className="account-form" onSubmit={submit}>
  <div className="account-email"><Mail size={18}/><div><span>Signed in with ChatGPT</span><strong>{email}</strong></div></div>
  <label htmlFor="display-name">What should we call you?</label>
  <input id="display-name" name="displayName" autoComplete="nickname" required maxLength={80} value={name} disabled={saving} onChange={event=>setName(event.target.value)} placeholder="Your name"/>
  {error&&<p role="alert" className="form-error">{error}{error.includes('Sign in')&&<> <a href="/signin-with-chatgpt?return_to=/signup" target="_top">Sign in again</a></>}</p>}
  <button className="primary auth-primary" type="submit" disabled={saving||!name.trim()}>{saving?<><LoaderCircle size={18} className="spin"/> Creating account…</>:'Create account'}</button>
  <div className="auth-security"><ShieldCheck size={17}/><p>Your assignments belong to your account. Existing deadlines are kept when you set up your profile.</p></div>
 </form>;
}
