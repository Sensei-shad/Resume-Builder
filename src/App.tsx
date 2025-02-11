import React from 'react';
import { FileText, Layout, Settings, Moon, Sun } from 'lucide-react';
import { ResumeForm } from './components/ResumeForm';
import { TemplateSelector } from './components/TemplateSelector';
import { Preview } from './components/Preview';
import { useDarkMode } from './hooks/useDarkMode';
import { WelcomeScreen } from './components/WelcomeScreen';

function App() {
  const [activeTab, setActiveTab] = React.useState<'form' | 'template' | 'preview'>('form');
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showWelcome, setShowWelcome] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FileText className={`h-8 w-8 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h1 className={`ml-2 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ATS Resume Builder
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-yellow-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'form'
                ? isDarkMode 
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-600 text-white'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="h-5 w-5 mr-2" />
            Details
          </button>
          <button
            onClick={() => setActiveTab('template')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'template'
                ? isDarkMode 
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-600 text-white'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Layout className="h-5 w-5 mr-2" />
            Templates
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'preview'
                ? isDarkMode 
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-600 text-white'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="h-5 w-5 mr-2" />
            Preview
          </button>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          {activeTab === 'form' && <ResumeForm />}
          {activeTab === 'template' && <TemplateSelector />}
          {activeTab === 'preview' && <Preview />}
        </div>
      </main>
    </div>
  );
}

export default App;