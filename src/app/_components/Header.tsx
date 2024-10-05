import Link from "next/link";

function Header() {
  return (
    <header className="bg-[#e3e8ec] shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <HeaderLogo />
        <HeaderRightCta />
      </div>
    </header>
  );
}

export default Header;

const HeaderLogo = () => {
  return (
   <div className="flex items-center space-x-4">
     <Link href="/">
      <h1 className="text-2xl font-bold text-gray-900">MOVIECRITIC</h1>
    </Link>
    <Link href="/all-reviews">
      <button className="px-4 py-2 border border-[#6559f5] text-[#6559f5] rounded-md hover:bg-purple-50 transition-colors">
        All Reviews
      </button>
    </Link>
   </div>
  );
};
const HeaderRightCta = () => {
  return (
    <div className="space-x-4">
      <Link href="/add-movie">
        <button className="px-4 py-2 border border-[#6559f5] text-[#6559f5] rounded-md hover:bg-purple-50 transition-colors">
          Add new movie
        </button>
      </Link>
      <Link href="/add-review">
        <button className="px-4 py-2 bg-[#6559f5] text-white rounded-md hover:bg-[#6559f5] transition-colors">
          Add new review
        </button>
      </Link>
    </div>
  );
};
