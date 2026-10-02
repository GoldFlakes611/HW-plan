import { getChatGPTUser } from '@/app/chatgpt-auth';
import { getRawDb } from '@/db/raw';
import { assignmentInput } from '@/lib/assignments';
export const dynamic = 'force-dynamic';
export async function GET() {
 const user = await getChatGPTUser();
 if (!user) return Response.json({error:'Sign in to load your assignments.'},{status:401});
 try {
  const result = await getRawDb().prepare('SELECT id, title, description, course, due FROM assignments WHERE user_id = ? ORDER BY due ASC, id ASC').bind(user.userId).all();
  return Response.json(result.results,{headers:{'Cache-Control':'no-store'}});
 } catch(error) { console.error('Loading assignments failed',error); return Response.json({error:'Your assignments could not be loaded. Please try again.'},{status:503}); }
}
export async function POST(request: Request) {
 const user = await getChatGPTUser();
 if (!user) return Response.json({error:'Sign in to save your assignments.'},{status:401});
 const input=assignmentInput.safeParse(await request.json().catch(()=>null));
 if (!input.success) return Response.json({error:input.error.issues[0]?.message || 'Invalid assignment.'},{status:400});
 try {
  const assignment={id:crypto.randomUUID(),...input.data};
  await getRawDb().prepare('INSERT INTO assignments (id,user_id,title,description,course,due) VALUES (?,?,?,?,?,?)').bind(assignment.id,user.userId,assignment.title,assignment.description,assignment.course,assignment.due).run();
  return Response.json(assignment,{status:201});
 } catch(error) {console.error('Saving assignment failed',error);return Response.json({error:'Your assignment could not be saved. Your draft is still here; please try again.'},{status:503});}
}
