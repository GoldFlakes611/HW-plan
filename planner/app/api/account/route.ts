import { z } from 'zod';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { getRawDb } from '@/db/raw';
import { getProfile } from '@/db/profiles';

export const dynamic = 'force-dynamic';
const accountInput = z.object({displayName:z.string().trim().min(1,'Enter your name.').max(80,'Your name can be up to 80 characters.')}).strict();

export async function GET() {
 const user = await getChatGPTUser();
 if (!user) return Response.json({error:'Sign in to access your account.'},{status:401});
 try { return Response.json({profile:await getProfile(user.userId),email:user.email},{headers:{'Cache-Control':'no-store'}}); }
 catch(error) { console.error('Loading account failed',error);return Response.json({error:'Your account could not be loaded. Please try again.'},{status:503}); }
}

export async function POST(request:Request) {
 const user = await getChatGPTUser();
 if (!user) return Response.json({error:'Sign in before creating your account.'},{status:401});
 const input = accountInput.safeParse(await request.json().catch(()=>null));
 if (!input.success) return Response.json({error:input.error.issues[0]?.message||'Enter a valid name.'},{status:400});
 try {
  const result = await getRawDb().prepare('INSERT INTO profiles (user_id,display_name,created_at) VALUES (?,?,?) ON CONFLICT(user_id) DO NOTHING').bind(user.userId,input.data.displayName,new Date().toISOString()).run();
  return Response.json({profile:await getProfile(user.userId),email:user.email},{status:result.meta.changes?201:200,headers:{'Cache-Control':'no-store'}});
 } catch(error) { console.error('Creating account failed',error);return Response.json({error:'Your account could not be created. Your name is still here; please try again.'},{status:503}); }
}
