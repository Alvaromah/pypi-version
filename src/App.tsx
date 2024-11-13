import React, { useState } from 'react';
import { Search, Package, ExternalLink, ArrowRight } from 'lucide-react';

function App() {
  const [package_name, setPackageName] = useState('');
  const [version, setVersion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const fetchPackageVersion = async () => {
    if (!package_name.trim()) {
      setError('Please enter a package name');
      return;
    }

    setLoading(true);
    setError('');
    setVersion('');

    try {
      const response = await fetch(
        `https://pypi.org/pypi/${package_name}/json`
      );
      if (!response.ok) {
        throw new Error('Package not found');
      }
      const data = await response.json();
      setVersion(data.info.version);
    } catch (err) {
      setError('Package not found or network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a
            href="https://didthis.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-indigo-100 transition-colors duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="font-semibold text-lg">DidThis</span>
            <ExternalLink
              className={`w-4 h-4 transform transition-transform duration-300 ${
                isHovered ? 'translate-x-1 -translate-y-1' : ''
              }`}
            />
          </a>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 transform transition-all duration-300 hover:shadow-indigo-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-600 rounded-2xl p-3 shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              PyPI Version Checker
            </h1>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={package_name}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="Enter package name (e.g., requests)"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 pl-12 bg-white/70 backdrop-blur-sm shadow-sm group-hover:shadow-md"
                onKeyDown={(e) => e.key === 'Enter' && fetchPackageVersion()}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 group-hover:text-indigo-500" />
            </div>

            <button
              onClick={fetchPackageVersion}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              {loading ? (
                'Checking...'
              ) : (
                <>
                  Check Version
                  <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-50 text-red-600 p-6 rounded-xl text-sm border border-red-100 shadow-sm animate-fadeIn">
                {error}
              </div>
            )}

            {version && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 shadow-sm animate-fadeIn">
                <h2 className="text-sm font-medium text-green-800 mb-2">
                  Latest Version
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-green-600">
                    {version}
                  </span>
                  <a
                    href={`https://pypi.org/project/${package_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300 group"
                  >
                    View on PyPI
                    <ExternalLink className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Enter a Python package name to check its latest version on PyPI
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
