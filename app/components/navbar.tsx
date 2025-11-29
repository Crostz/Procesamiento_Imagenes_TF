import Image from 'next/image';

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <nav className="bg-gray-400 text-white px-6 py-4 flex items-center justify-between">
      <button onClick={toggleSidebar} className="text-white hover:text-gray-300 p-1">
        <Image src="/Menu.png" alt="Menu" width={24} height={24} priority />
      </button>
      <h1 className="text-xl font-bold">AI Detector</h1>
    </nav>
  );
}
