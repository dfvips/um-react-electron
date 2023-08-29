import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppRoot } from './components/AppRoot';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import hljsSyntaxPowerShell from 'react-syntax-highlighter/dist/esm/languages/hljs/powershell';
import hljsSyntaxBash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';

SyntaxHighlighter.registerLanguage('ps1', hljsSyntaxPowerShell);
SyntaxHighlighter.registerLanguage('bash', hljsSyntaxBash);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
