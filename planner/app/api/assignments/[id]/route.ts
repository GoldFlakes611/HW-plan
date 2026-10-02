import { getChatGPTUser } from '@/app/chatgpt-auth';
import { getRawDb } from '@/db/raw';
import { assignmentInput } from '@/lib/assignments';
export const dynamic = 'force-dynamic';
type Context={params:Promise<{id:string}>};
export async function PATCH(request:Request,context:Context){
 const user=await getChatGPTUser();if(!user)return Response.json({error:'Sign in to edit your assignments.'},{status:401});
 const {id}=await context.params;
 const input=assignmentInput.safeParse(await request.json().catch(()=>null));
 if(!input.success)return Response.json({error:input.error.issues[0]?.message||'Invalid assignment.'},{status:400});
 try{
  const a=input.data;
  const result=await getRawDb().prepare('UPDATE assignments SET title=?, description=?, course=?, due=? WHERE id=? AND user_id=?').bind(a.title,a.description,a.course,a.due,id,user.userId).run();
  if(!result.meta.changes)return Response.json({error:'Assignment was not found.'},{status:404});
  return Response.json({id,...a});
 }catch(error){console.error('Updating assignment failed',error);return Response.json({error:'Your changes could not be saved. Please try again.'},{status:503});}
}
export async function DELETE(_request:Request,context:Context){
 const user=await getChatGPTUser();if(!user)return Response.json({error:'Sign in to delete your assignments.'},{status:401});
 const {id}=await context.params;
 try{
  const result=await getRawDb().prepare('DELETE FROM assignments WHERE id=? AND user_id=?').bind(id,user.userId).run();
  if(!result.meta.changes)return Response.json({error:'Assignment was not found.'},{status:404});
  return new Response(null,{status:204});
 }catch(error){console.error('Deleting assignment failed',error);return Response.json({error:'Your assignment could not be deleted. Please try again.'},{status:503});}
}
