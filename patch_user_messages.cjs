const fs = require('fs');

const path = 'src/pages/MyRequestsPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update User Chat Interface
const chat_ui_old = `              {chatLoading ? (
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
              )}`;

const chat_ui_new = `              {chatLoading ? (
                <div className="text-center font-mono-tech text-xs text-neutral-500 py-10">LOADING CHAT HISTORY...</div>
              ) : (
                <>
                  <div className="text-center font-mono-tech text-[10px] text-neutral-400 mb-4 pb-2 border-b border-neutral-100">
                    Your message history will be automatically deleted within 48 hours.
                  </div>
                  {messages.length === 0 ? (
                    <div className="text-center font-mono-tech text-xs text-neutral-500 py-10 bg-[#f9faf7] rounded-lg border border-[#c4c7c7]/50">
                      Your project has been accepted. You can now communicate with the Cosmic Circuit admin regarding this project.
                    </div>
                  ) : (
                    messages.filter(msg => new Date(msg.expires_at) > new Date()).map(msg => (
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
                </>
              )}`;

if (content.includes(chat_ui_old)) {
  content = content.replace(chat_ui_old, chat_ui_new);
}

// Ensure "NEW" and "REJECTED" states correctly hide delete logic (if any existed on user side, it didn't but let's just make sure chat is disabled for NEW).
const new_state_old = `                            ) : (
                              <div className="mt-4 p-3 bg-[#f9faf7] border border-[#c4c7c7]/50 rounded-lg text-neutral-500 font-mono-tech text-[10px] text-center">
                                Chat will be available after your project is accepted.
                              </div>
                            )}`;

const new_state_new = `                            ) : (
                              <div className="mt-4 p-3 bg-[#f9faf7] border border-[#c4c7c7]/50 rounded-lg text-neutral-500 font-mono-tech text-[10px] text-center">
                                CHAT NOT AVAILABLE YET<br/>
                                <span className="text-neutral-400 mt-1 block">Messaging will become available after your project is accepted by the admin.</span>
                              </div>
                            )}`;

if (content.includes(new_state_old)) {
  content = content.replace(new_state_old, new_state_new);
}


fs.writeFileSync(path, content, 'utf8');
console.log('MyRequestsPage.tsx patched successfully for 48h UI rules and messaging states.');
