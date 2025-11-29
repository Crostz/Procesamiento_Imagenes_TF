import Link from "next/link";

export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-44 bg-gray-800 text-white z-50 flex flex-col p-4 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header with title and close button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">AI Detector</h1>
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-300"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 justify-around items-center">
        <Link
          href="/"
          className="w-40 h-16 mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm text-center leading-5 transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          Principal
        </Link>

        <Link
          href="/aboutus"
          className="w-40 h-16 mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm text-center leading-5 transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          Sobre El Proyecto
        </Link>

        <Link
          href="/howtouse"
          className="w-40 h-16 mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm text-center leading-5 transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          Como Usarlo
        </Link>
      </nav>
    </aside>
  );
}
