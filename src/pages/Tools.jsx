import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/tools.css';

const BASE_EDITOR_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_EDITOR_URL ?? 'http://localhost:3002')
  : '/editor/';

export default function Tools() {
  const [status, setStatus] = useState('loading');
  const { isAuthenticated } = useAuth();

  const handleLoad = useCallback(() => setStatus('ready'), []);
  const handleError = useCallback(() => setStatus('error'), []);

  const editorUrl = isAuthenticated ? `${BASE_EDITOR_URL}?auth=1` : BASE_EDITOR_URL;

  return (
    <div className="tools-page" aria-label="Pascal 3D Editor">
      {status === 'loading' && (
        <div className="tools-loader" role="status" aria-live="polite">
          <span className="tools-loader-text">Loading Editor</span>
        </div>
      )}
      {status === 'error' && (
        <div className="tools-error" role="alert">
          <p className="tools-error-title">Editor Unavailable</p>
          <p className="tools-error-msg">
            The Pascal 3D editor could not be reached.
            {import.meta.env.DEV && ' Make sure the editor dev server is running on port 3002.'}
          </p>
        </div>
      )}
      <iframe
        className={`tools-frame${status === 'ready' ? ' ready' : ''}`}
        src={editorUrl}
        title="Pascal 3D Editor"
        onLoad={handleLoad}
        onError={handleError}
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
      />
    </div>
  );
}
