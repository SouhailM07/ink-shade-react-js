import { FiHome } from "react-icons/fi";
import { BsBook, BsBookHalf } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";

export default function MyAside() {
  const navLinks = [
    {
      icon: FiHome,
      label: "Discover",
      link: "/",
    },
    {
      icon: BsBook,
      label: "Category",
      link: "/categories",
    },
    {
      icon: BsBookHalf,
      label: "My Library",
      link: "http://localhost/ink-shade-react/my-account/orders/",
    },
  ];
  const currentUrl = useLocation().pathname;
  return (
    <aside className="hidden lg:flex justify-between flex-col w-[14.8rem] h-screen  top-0 sticky p-[1rem] bg-gray-50 border-r border-gray-200">
      <div>
        <div className="mb-8 pb-4 border-b border-gray-300 font-bold text-xl">
          Inkshade Library
        </div>
        <ul className="space-y-2">
          {navLinks.map((item) => (
            <li key={item.link}>
              <Link
                to={item.link}
                className={cn(
                  { "bg-black text-white!": item.link == currentUrl },
                  ` flex items-center space-x-3 p-3 text-gray-600 hover:text-black!  rounded-lg hover:bg-gray-200 transition-colors w-full`
                )}
              >
                <item.icon className="w-5 h-5 " />
                <span className="font-medium ">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <img
        src="/logo.jpg"
        alt="logo"
        className="rounded-md inset-0 w-full"
        height={120}
        width={120}
      />
    </aside>
  );
}
