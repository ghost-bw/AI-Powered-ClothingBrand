import { useState,useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import API from "../../api/axios";
import { Send } from "lucide-react";

export default function WhatsAppAutomation(){

 const [enabled,setEnabled]=useState(true);
 const [message,setMessage]=useState("");
 const [logs,setLogs]=useState([]);

 useEffect(()=>{
  API.get("/admin/whatsapp/logs").then(res=>setLogs(res.data || []));
 },[]);

 const send = async()=>{

  try{
   await API.post("/admin/whatsapp/send",{message});
   alert("Broadcast sent");
   setMessage("");
  }catch(err){
   console.log(err);
   alert("Failed — check console");
  }

 };

//  const toggle = async()=>{
//   setEnabled(!enabled);
//   await API.post("/admin/whatsapp/toggle",{enabled:!enabled});
//  };

 return(
<div className="flex min-h-screen bg-gray-50">

<Sidebar/>

<div className="flex-1">
<Header/>

<main className="p-8 space-y-8">

<h1 className="text-3xl font-black">WhatsApp Broadcast</h1>

{/* TOGGLE */}

{/* <div className="bg-white border rounded-2xl p-6 flex justify-between items-center shadow-sm">

<span className="font-semibold">Automation Enabled</span>

<label className="relative inline-flex items-center cursor-pointer">

<input type="checkbox" checked={enabled} onChange={toggle} className="sr-only"/>

<div className={`w-11 h-6 rounded-full transition ${enabled?"bg-black":"bg-gray-300"}`}>
<div className={`w-5 h-5 bg-white rounded-full shadow transform transition
${enabled?"translate-x-5":"translate-x-1"}`}/>
</div>

</label>

</div> */}

{/* MESSAGE */}

<div className="bg-white border rounded-2xl p-6 shadow-sm">

<textarea
 rows={6}
 value={message}
 onChange={e=>setMessage(e.target.value)}
 placeholder="Enter sale / coupon / product message..."
 className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none"
/>

<button
 onClick={send}
 className="mt-4 bg-black text-white px-6 py-3 rounded-xl flex gap-2 items-center hover:bg-gray-900 transition"
>
<Send size={16}/> Send to All Customers
</button>

</div>

{/* LOGS */}

<div className="bg-white border rounded-2xl p-6 shadow-sm">

<h2 className="font-bold mb-4">Broadcast Logs</h2>

<div className="max-h-[420px] overflow-y-auto pr-2">

<table className="w-full text-sm">

<thead className="text-gray-500 border-b">
<tr>
  <th className="text-left pb-2">Phone</th>
  <th className="text-center pb-2">Status</th>
  <th className="text-center pb-2">Date</th>
</tr>
</thead>

<tbody>

{logs.slice(0,14).map(l=>(
<tr key={l._id} className="hover:bg-gray-50 transition">

<td className="py-3 font-medium text-blue-600 text-left">
 {l.phone}
</td>

<td className="text-green-600 font-semibold text-center">
 {l.status}
</td>

<td className="text-center">
 {new Date(l.createdAt).toLocaleString()}
</td>

</tr>
))}

</tbody>


</table>

</div>

</div>

</main>

</div>
</div>
 );
}
