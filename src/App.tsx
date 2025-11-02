import { useEffect, useState } from 'react';
import AppBar from './AppBar';

function App() {
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  return (
    <div className="flex flex-col">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}

      <div className="flex-auto">
        <div className="flex flex-col justify-center items-center h-full pt-32 space-y-4">
          <h1 className="text-2xl dark:text-gray-200">Hello, Electron!</h1>
          <button
            className="bg-yellow-400 py-2 px-4 rounded focus:outline-none shadow hover:bg-yellow-200 dark:text-black"
            onClick={handleToggle}
          >
            {isOpen ? 'Collapse' : 'Expand'}
          </button>

          {isOpen && (
            <div className="text-center px-20">
              The easiest way to build crossplatform desktop apps with Electron. Get React & Tailwind pre-configured and
              ready to go. Write with TypeScript & build with Vite.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
