import type { Assignment } from './assignments';
export const dayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export const palettes=[{bg:'#e6effd',border:'#6689c8',text:'#385985'},{bg:'#f1eafa',border:'#a27cc1',text:'#71578b'},{bg:'#e5f2ec',border:'#62a58c',text:'#35634f'},{bg:'#fff1df',border:'#d1a05e',text:'#89683d'},{bg:'#fbe7e7',border:'#ca8282',text:'#924e4e'}];
export function courseColor(course:string){let hash=0;for(const ch of course)hash=(hash*31+ch.charCodeAt(0))>>>0;return palettes[hash%palettes.length];}
export function dateKey(date:Date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function shiftDay(date:Date,delta:number){const d=new Date(date);d.setDate(d.getDate()+delta);return d;}
export function weekDays(date:Date){const start=shiftDay(date,-date.getDay());return Array.from({length:7},(_,i)=>shiftDay(start,i));}
export function monthDays(date:Date){const start=new Date(date.getFullYear(),date.getMonth(),1);const count=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();const offset=start.getDay();return Array.from({length:Math.ceil((count+offset)/7)*7},(_,i)=>shiftDay(start,i-offset));}
export function timeLabel(value:string|Date){return new Date(value).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});}
export function hourLabel(hour:number){return `${hour%12||12} ${hour<12?'AM':'PM'}`;}
export function sameDay(a:Date,b:Date){return dateKey(a)===dateKey(b);}
export function calendarPositions(items:Assignment[]){
 const sorted=items.map(a=>({a,start:(new Date(a.due).getHours()*60+new Date(a.due).getMinutes())*64/60})).sort((a,b)=>a.start-b.start);
 const result:{assignment:Assignment;top:number;lane:number;lanes:number}[]=[];
 let group:typeof sorted=[];let end=-1;
 const flush=()=>{const occupied:number[]=[];const placed=group.map(item=>{let lane=occupied.findIndex(e=>e<=item.start);if(lane<0)lane=occupied.length;occupied[lane]=item.start+56;return {assignment:item.a,top:item.start,lane};});result.push(...placed.map(p=>({...p,lanes:occupied.length})));group=[];};
 for(const item of sorted){if(item.start>=end&&group.length)flush();group.push(item);end=Math.max(item.start+56,group.length===1?item.start+56:end);}if(group.length)flush();return result;
}
export function exampleAssignments(today:Date):Assignment[]{const week=weekDays(today);return [
 {id:'example-1',title:'Problem set 04',course:'MATH 201',description:'Complete the integration problems in sections 4.1–4.3. Include your working for each question.',day:1,hour:10,minute:0},
 {id:'example-2',title:'Reading response',course:'ENG 102',description:'Write a 500-word response to this week’s reading. Bring one discussion question to class.',day:2,hour:13,minute:0},
 {id:'example-3',title:'Lab report: cell structure',course:'BIO 110',description:'Include observations, annotated diagrams, and a short conclusion from the microscopy lab.',day:3,hour:15,minute:30},
 {id:'example-4',title:'Research proposal',course:'ENG 102',description:'Submit your topic, research question, and three preliminary sources.',day:4,hour:11,minute:0},
 {id:'example-5',title:'Programming assignment',course:'CS 150',description:'Implement and document the sorting algorithms. Submit your source files and a brief explanation of complexity.',day:5,hour:14,minute:0},
 {id:'example-6',title:'Chapter 5 exercises',course:'MATH 201',description:'Complete exercises 1–12 and 16–20. Show each step.',day:5,hour:17,minute:0},
 ].map(({day,hour,minute,...a})=>{const due=new Date(week[day]);due.setHours(hour,minute,0,0);return {...a,due:due.toISOString()};});}
