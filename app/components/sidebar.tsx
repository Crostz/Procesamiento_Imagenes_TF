import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-44 bg-gray-800 text-white flex flex-col p-4">
  {/* Title */}
  <h1 className="text-2xl font-bold mb-6 text-center">AI Detector</h1>

  {/* Navigation */}
  <nav className="flex flex-col flex-1 justify-around items-center">
        <Link
      href="/"
      className="w-40 h-16 mx-auto text-white 
                 bg-gradient-to-br from-purple-600 to-blue-500 
                 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                 focus:ring-blue-300 dark:focus:ring-blue-800 
                 font-medium rounded text-sm text-center leading-5
                 transition-transform transform hover:scale-105 flex items-center justify-center"
    >
      Principal
    </Link>

    <Link
      href="/aboutus"
      className="w-40 h-16 mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 
                 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                 focus:ring-blue-300 dark:focus:ring-blue-800 
                 font-medium rounded text-sm text-center leading-5
                 transition-transform transform hover:scale-105 flex items-center justify-center"
    >
      Sobre El Proyecto
    </Link>

    <Link
      href="/howtouse"
      className="w-40 h-16 mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 
                 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                 focus:ring-blue-300 dark:focus:ring-blue-800 
                 font-medium rounded text-sm text-center leading-5
                 transition-transform transform hover:scale-105 flex items-center justify-center"
    >
      Como Usarlo
    </Link>
  </nav>
</aside>

  );
}
