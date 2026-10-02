import type { ReactNode } from 'react';
import { BookOpen, CalendarDays, List, LockKeyhole } from 'lucide-react';

export default function AuthFrame({children}: {children: ReactNode}) {
 return (
  <div className="auth-shell">
   <aside className="auth-brand-panel">
    <a className="brand auth-brand" href="/login" aria-label="Due login"><span className="brand-mark"><BookOpen size={24}/></span>due<span className="brand-dot">.</span></a>
    <div className="auth-brand-copy">
     <span className="auth-brand-eyebrow">YOUR COLLEGE COMPANION</span>
     <h2>Your semester,<br/>in one place.</h2>
     <p>A little space to plan, so you can focus on what’s next.</p>
     <div className="auth-features">
      <div><CalendarDays size={20}/><span>See every deadline in your calendar</span></div>
      <div><List size={20}/><span>Keep assignment details together</span></div>
      <div><LockKeyhole size={20}/><span>A personal planner for your account</span></div>
     </div>
    </div>
    <span className="auth-brand-footer">One assignment at a time.</span>
   </aside>
   <main className="auth-main">
    <a className="brand mobile-auth-brand" href="/login"><span className="brand-mark"><BookOpen size={21}/></span>due<span className="brand-dot">.</span></a>
    <div className="auth-card">{children}</div>
    <footer className="auth-footer">Made for college. Built around your deadlines.</footer>
   </main>
  </div>
 );
}
