const fs = require('fs');
const files = [
  'src/components/Footer.tsx',
  'src/pages/WorksPage.tsx',
  'src/pages/SignupPage.tsx',
  'src/pages/ServicesPage.tsx',
  'src/pages/LoginPage.tsx',
  'src/pages/ForgotPasswordPage.tsx',
  'src/pages/AuthCallbackPage.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add import if not present
  if (!content.includes('CursorGrid')) {
    const importPath = file.includes('pages/') ? '../components/CursorGrid' : './CursorGrid';
    content = content.replace(/(import React.*?;\n)/, `$1import { CursorGrid } from '${importPath}';\n`);
  }

  // Replace tech-grid
  content = content.replace(/<div className="tech-grid absolute inset-0 ([^"]*)" \/>/g, 
    `<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="tech-grid absolute inset-0 $1" />
        <CursorGrid color="0, 0, 0" maxOpacity={0.25} />
      </div>`);
    
  // Replace tech-grid-dark
  content = content.replace(/<div className="tech-grid-dark absolute inset-0 ([^"]*)" \/>/g, 
    `<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="tech-grid-dark absolute inset-0 $1" />
        <CursorGrid color="185, 232, 106" maxOpacity={0.25} />
      </div>`);

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
