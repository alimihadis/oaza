import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm sm:text-xl">O</span>
      </div>
      <span className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text break-words">Oaza Software</span>
    </Link>
  );
}
