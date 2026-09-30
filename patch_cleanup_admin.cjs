const fs = require('fs');

const path = 'src/pages/AdminDashboardPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove Messages Tab from Sidebar
const sidebarMessagesRegex = /{id:\s*'messages',\s*label:\s*'Messages \/ Inquiries',\s*icon:\s*MessageSquare\s*},?/g;
content = content.replace(sidebarMessagesRegex, '');

// 2. Remove the actual Messages Tab View (which currently renders <AdminMessagesInbox />)
// Let's find it.
const messagesViewRegex = /{\/\*\s*={69}\s*VIEW 3: MESSAGES \/ INQUIRIES \(REAL INBOX\)\s*={69}\s*\*\/}\s*{activeTab === 'messages' && \(\s*<AdminMessagesInbox[\s\S]*?\/>\s*\)}/g;
content = content.replace(messagesViewRegex, '');

// 3. Remove AdminMessagesInbox component definition
const adminMessagesInboxRegex = /const AdminMessagesInbox: React\.FC<[\s\S]*?};\n/g;
content = content.replace(adminMessagesInboxRegex, '');

// 4. Remove MessageSquare from lucide-react imports if it's there
content = content.replace(/MessageSquare,\s*/g, '');
content = content.replace(/,\s*MessageSquare/g, '');

fs.writeFileSync(path, content, 'utf8');
console.log('AdminDashboardPage.tsx cleaned up successfully.');
