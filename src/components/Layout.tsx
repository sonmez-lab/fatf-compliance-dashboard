import { Link, useLocation } from 'react-router-dom'
import { Globe, BarChart3, GitCompare, Clock } from 'lucide-react'
import { clsx } from 'clsx'

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: Globe },
  { path: '/compare', label: 'Compare', icon: GitCompare },
  { path: '/timeline', label: 'Timeline', icon: Clock },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  FATF Dashboard
                </span>
              </Link>
            </div>

            <nav className="flex space-x-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2',
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            Data sources: FATF Publications, Basel AML Index, National Regulators
            <span className="mx-2">•</span>
            <a 
              href="https://www.fatf-gafi.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              FATF Official Site
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
