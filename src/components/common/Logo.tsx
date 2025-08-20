import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">O</span>
      </div>
      <span className="text-xl font-bold gradient-text">Oaza Software</span>
    </Link>
  );
}
