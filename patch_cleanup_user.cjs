const fs = require('fs');

const path = 'src/pages/MyRequestsPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove Message Box button
const msgBoxRegex = /{\s*project\.status === 'accepted' && \(\s*<button[\s\S]*?onClick={\(\) => openChatModal\(project\)}[\s\S]*?<\/button>\s*\)\s*}/g;
content = content.replace(msgBoxRegex, '');

// 2. Remove openChatModal definition
const openChatModalRegex = /const openChatModal = async \(project: ProjectSubmission\) => {[\s\S]*?setChatLoading\(false\);\n\s*};\n/g;
content = content.replace(openChatModalRegex, '');

// 3. Remove chat states
content = content.replace(/const \[chatProject, setChatProject\] = useState<ProjectSubmission \| null>\(null\);\n/g, '');
content = content.replace(/const \[messages, setMessages\] = useState<any\[\]>\(\[\]\);\n/g, '');
content = content.replace(/const \[newMessage, setNewMessage\] = useState\(''\);\n/g, '');
content = content.replace(/const \[chatLoading, setChatLoading\] = useState\(false\);\n/g, '');

// 4. Remove Chat Modal JSX
const chatModalRegex = /{\/\*\s*={69}\s*CHAT MODAL\s*={69}\s*\*\/}\s*{chatProject && \([\s\S]*?}\)\s*}/g;
content = content.replace(chatModalRegex, '');

// 5. Remove MessageSquare import
content = content.replace(/MessageSquare,\s*/g, '');
content = content.replace(/,\s*MessageSquare/g, '');

fs.writeFileSync(path, content, 'utf8');
console.log('MyRequestsPage.tsx cleaned up successfully.');
