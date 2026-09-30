const fs = require('fs');

const path = 'src/pages/MyRequestsPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Chat state
const state_injection = `  // Chat state
  const [chatProject, setChatProject] = useState<ProjectSubmission | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
`;
content = content.replace("  const [viewingFilesForId, setViewingFilesForId] = useState<string | null>(null);", state_injection + "\n  const [viewingFilesForId, setViewingFilesForId] = useState<string | null>(null);");

// 2. Chat Modal & UI logic
const chat_ui_injection = `
      {/* =========================================================================
          CHAT MODAL
         ========================================================================= */}
      {chatProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#c4c7c7]/50 flex items-center justify-between bg-[#f9faf7]">
              <div>
                <span className="font-mono-tech text-[10px] text-[#476800] uppercase font-bold tracking-wider block">PROJECT CHAT</span>
                <h2 className="text-xl font-black text-black">{chatProject.project_name}</h2>
              </div>
              <button onClick={() => setChatProject(null)} className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-500 hover:text-black transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
              {chatLoading ? (
                <div className="text-center font-mono-tech text-xs text-neutral-500 py-10">LOADING CHAT HISTORY...</div>
              ) : messages.length === 0 ? (
                <div className="text-center font-mono-tech text-xs text-neutral-500 py-10 bg-[#f9faf7] rounded-lg border border-[#c4c7c7]/50">
                  Your project has been accepted. You can now communicate with the Cosmic Circuit admin regarding this project.
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={\`flex \${msg.sender_role === 'USER' ? 'justify-end' : 'justify-start'}\`}>
                    <div className={\`max-w-[80%] p-4 rounded-xl \${
                      msg.sender_role === 'USER' ? 'bg-[#daf396] text-[#2b4000]' : 
                      msg.sender_role === 'SYSTEM' ? 'bg-neutral-800 text-[#c8f179] font-mono-tech text-[11px]' :
                      'bg-[#f3f4f1] border border-[#c4c7c7]/60 text-black'
                    }\`}>
                      {msg.sender_role === 'SYSTEM' && <span className="block font-bold mb-1">SYSTEM MESSAGE:</span>}
                      {msg.sender_role === 'ADMIN' && <span className="block font-bold text-[10px] text-neutral-500 mb-1">COSMIC CIRCUIT ADMIN:</span>}
                      <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-[#f9faf7] border-t border-[#c4c7c7]/50 flex gap-3 items-end">
              <textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white border border-[#c4c7c7] rounded-xl p-3 text-sm focus:border-black outline-none max-h-32 min-h-[48px]"
                rows={1}
              />
              <button
                onClick={async () => {
                  if (!newMessage.trim() || !user) return;
                  const text = newMessage;
                  setNewMessage('');
                  
                  // Optimistic UI
                  const tempId = Math.random().toString();
                  setMessages(prev => [...prev, { id: tempId, message: text, sender_role: 'USER', created_at: new Date().toISOString() }]);

                  const { error } = await supabase.from('project_messages').insert({
                    project_id: chatProject.id,
                    sender_id: user.id,
                    sender_role: 'USER',
                    message: text
                  });

                  if (!error && messages.length === 0) {
                    // System auto-response for first message
                    await supabase.from('project_messages').insert({
                      project_id: chatProject.id,
                      sender_role: 'SYSTEM',
                      message: 'When our admin is available, we will get back to you soon.'
                    });
                  }
                  
                  // Reload chat
                  openChatModal(chatProject);
                }}
                className="bg-black text-[#c8f179] px-6 py-3 rounded-xl font-bold font-mono-tech text-xs hover:bg-neutral-800"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace("  return (\n    <div className=\"min-h-screen bg-[#f9faf7] text-[#191c1b] pb-24\">", "  const openChatModal = async (project: ProjectSubmission) => {\n    setChatProject(project);\n    setChatLoading(true);\n    const { data } = await supabase.from('project_messages').select('*').eq('project_id', project.id).order('created_at', { ascending: true });\n    setMessages(data || []);\n    setChatLoading(false);\n  };\n\n  return (\n    <div className=\"min-h-screen bg-[#f9faf7] text-[#191c1b] pb-24\">");

content = content.replace("    </div>\n  );\n};\n", chat_ui_injection + "\n    </div>\n  );\n};\n");

// 3. Inject Chat Action Buttons into Project Cards
const user_card_action = `                            {sub.status === 'accepted' ? (
                              <button onClick={() => openChatModal(sub)} className="mt-4 w-full bg-black text-[#c8f179] font-mono-tech text-xs font-bold py-3 rounded-lg shadow-xs hover:bg-neutral-800">
                                CHAT WITH ADMIN
                              </button>
                            ) : sub.status === 'rejected' ? (
                              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
                                <span className="font-bold block mb-1">Your project was not accepted.</span>
                                {sub.rejection_reason && <span className="opacity-80 block mt-1">Reason: {sub.rejection_reason}</span>}
                              </div>
                            ) : (
                              <div className="mt-4 p-3 bg-[#f9faf7] border border-[#c4c7c7]/50 rounded-lg text-neutral-500 font-mono-tech text-[10px] text-center">
                                Chat will be available after your project is accepted.
                              </div>
                            )}`;

content = content.replace("                          </div>\n                        </div>\n                      ))", "                          </div>\n" + user_card_action + "\n                        </div>\n                      ))");

fs.writeFileSync(path, content, 'utf8');
console.log('MyRequestsPage.tsx patched successfully.');
