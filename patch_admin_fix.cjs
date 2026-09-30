const fs = require('fs');

const path = 'src/pages/AdminDashboardPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const admin_messages_component = `
const AdminMessagesInbox: React.FC<{ submissions: any[], supabase: any }> = ({ submissions, supabase }) => {
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastMessages, setLastMessages] = useState<Record<string, {text: string, unread: number}>>({});

  const acceptedProjects = submissions.filter(s => s.status === 'accepted');

  useEffect(() => {
    const fetchInboxData = async () => {
      const { data } = await supabase.from('project_messages').select('*').order('created_at', { ascending: false });
      if (data) {
        const counts: Record<string, {text: string, unread: number}> = {};
        acceptedProjects.forEach(p => {
          const pMsgs = data.filter((m: any) => m.project_id === p.id);
          const unread = pMsgs.filter((m: any) => !m.is_read && m.sender_role === 'USER').length;
          counts[p.id] = {
            text: pMsgs.length > 0 ? pMsgs[0].message : 'No messages yet',
            unread
          };
        });
        setLastMessages(counts);
      }
    };
    fetchInboxData();
    const interval = setInterval(fetchInboxData, 5000); 
    return () => clearInterval(interval);
  }, [submissions, supabase]);

  const openChat = async (project: any) => {
    setActiveChat(project);
    setLoading(true);
    const { data } = await supabase.from('project_messages').select('*').eq('project_id', project.id).order('created_at', { ascending: true });
    setMessages(data?.filter((m: any) => new Date(m.expires_at) > new Date()) || []);
    await supabase.from('project_messages').update({ is_read: true }).eq('project_id', project.id).eq('sender_role', 'USER');
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat) return;
    const text = newMessage;
    setNewMessage('');
    setMessages(prev => [...prev, { id: Math.random().toString(), message: text, sender_role: 'ADMIN', created_at: new Date().toISOString() }]);
    await supabase.from('project_messages').insert({ project_id: activeChat.id, sender_role: 'ADMIN', message: text });
    openChat(activeChat); 
  };

  if (activeChat) {
    return (
      <div className="bg-white border border-[#c4c7c7] rounded-xl flex flex-col h-[600px] shadow-xs">
        <div className="p-4 border-b border-[#c4c7c7]/50 flex items-center justify-between bg-[#f9faf7] rounded-t-xl">
          <div>
            <h3 className="font-bold text-black">{activeChat.project_name}</h3>
            <p className="font-mono-tech text-[10px] text-neutral-500">{activeChat.client_name} • ACCEPTED</p>
          </div>
          <button onClick={() => setActiveChat(null)} className="px-4 py-1.5 bg-white border border-[#c4c7c7] text-xs font-mono-tech rounded hover:bg-neutral-100">BACK TO INBOX</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-center font-mono-tech text-[10px] text-neutral-400 mb-4 pb-2 border-b border-neutral-100">
            Your message history will be automatically deleted within 48 hours.
          </div>
          {loading ? (
            <div className="text-center font-mono-tech text-xs text-neutral-500">LOADING...</div>
          ) : messages.length === 0 ? (
            <div className="text-center font-mono-tech text-xs text-neutral-500">No messages found.</div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={\`flex \${msg.sender_role === 'ADMIN' ? 'justify-end' : 'justify-start'}\`}>
                <div className={\`max-w-[70%] p-3 rounded-xl \${
                  msg.sender_role === 'ADMIN' ? 'bg-[#daf396] text-[#2b4000]' : 
                  msg.sender_role === 'SYSTEM' ? 'bg-neutral-800 text-[#c8f179] font-mono-tech text-[10px]' :
                  'bg-[#f3f4f1] border border-[#c4c7c7]/60 text-black'
                }\`}>
                  {msg.sender_role === 'SYSTEM' && <span className="block font-bold mb-1">SYSTEM MESSAGE:</span>}
                  {msg.sender_role === 'USER' && <span className="block font-bold text-[10px] text-neutral-500 mb-1">USER MESSAGE:</span>}
                  <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-[#f9faf7] border-t border-[#c4c7c7]/50 flex gap-2 rounded-b-xl">
          <input 
            type="text" 
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your reply..."
            className="flex-1 bg-white border border-[#c4c7c7] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black"
          />
          <button onClick={sendMessage} className="bg-black text-[#c8f179] font-mono-tech font-bold text-xs px-6 py-2 rounded-lg hover:bg-neutral-800">SEND</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#c4c7c7] rounded-xl shadow-xs overflow-hidden">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[#f9faf7] border-b border-[#c4c7c7]/70 font-mono-tech text-[10px] text-neutral-500 uppercase tracking-wider">
            <th className="py-3.5 px-6 font-semibold">PROJECT</th>
            <th className="py-3.5 px-6 font-semibold">CLIENT</th>
            <th className="py-3.5 px-6 font-semibold">STATUS</th>
            <th className="py-3.5 px-6 font-semibold">LAST MESSAGE</th>
            <th className="py-3.5 px-6 font-semibold text-center">UNREAD</th>
            <th className="py-3.5 px-6 font-semibold text-right">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#c4c7c7]/30">
          {acceptedProjects.length === 0 ? (
            <tr><td colSpan={6} className="py-10 text-center text-neutral-500 font-mono-tech">MESSAGES & INQUIRIES<br/>No project conversations yet.</td></tr>
          ) : (
            acceptedProjects.map(p => {
              const info = lastMessages[p.id] || { text: 'Loading...', unread: 0 };
              return (
                <tr key={p.id} className="hover:bg-[#f9faf7] transition-colors group">
                  <td className="py-4 px-6 font-bold text-black">{p.project_name}</td>
                  <td className="py-4 px-6 text-neutral-700">{p.client_name}</td>
                  <td className="py-4 px-6"><span className="font-mono-tech text-[10px] uppercase px-2 py-0.5 rounded bg-[#daf396] text-[#365000] border border-[#bce866] font-bold">ACCEPTED</span></td>
                  <td className="py-4 px-6 text-neutral-500 truncate max-w-[200px]">{info.text}</td>
                  <td className="py-4 px-6 text-center">
                    {info.unread > 0 ? (
                      <span className="bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">{info.unread}</span>
                    ) : (
                      <span className="text-neutral-400 font-mono-tech text-[10px]">0</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => openChat(p)} className="font-mono-tech text-[11px] font-bold text-black border border-black px-3 py-1.5 rounded hover:bg-black hover:text-white transition-colors">OPEN CHAT</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
`;

if (!content.includes('const AdminMessagesInbox: React.FC')) {
  content = content.replace('export const AdminDashboardPage: React.FC = () => {', admin_messages_component + '\nexport const AdminDashboardPage: React.FC = () => {');
  fs.writeFileSync(path, content, 'utf8');
  console.log('AdminMessagesInbox successfully injected into AdminDashboardPage.tsx.');
} else {
  console.log('AdminMessagesInbox already exists.');
}
