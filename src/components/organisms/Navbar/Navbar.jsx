import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";

import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { useBooksContext } from "../../../contexts/BooksContext/BooksContext";

export default function Navbar() {
  const { books } = useBooksContext();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredBooks =
    search.length === 0
      ? []
      : books.filter((book) =>
          book.name.toLowerCase().includes(search.toLowerCase())
        );

  const open = search.length > 0 && filteredBooks.length > 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search?title=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };
  const currentUrl = useLocation().pathname;
  return (
    <header className="z-[22] p-4 w-full sticky top-0 bg-white border-b">
      <nav className="flexBetween">
        {/* Search */}
        <Popover open={open}>
          <PopoverTrigger asChild>
            {currentUrl !== "/search" ? (
              <div className="relative flex items-center gap-3 w-[24rem] border border-gray-400 rounded-md px-4 ">
                <CiSearch className="text-xl text-gray-500" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search books..."
                  className="border-0 focus-visible:ring-0 p-0"
                />
              </div>
            ) : (
              <div></div>
            )}
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={4}
            className="w-[24rem] p-2 shadow-lg"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <ul className="flex flex-col">
              {filteredBooks.slice(0, 6).map((book) => (
                <Link
                  key={book.id}
                  to={`/product/${book.id}`}
                  onClick={() => setSearch("")}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  {book.image && (
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-10 h-14 object-cover rounded"
                    />
                  )}

                  <div>
                    <p className="font-medium text-sm line-clamp-1">
                      {book.name}
                    </p>
                    {book.price && (
                      <p className="text-xs text-gray-500">${book.price}</p>
                    )}
                  </div>
                </Link>
              ))}
            </ul>

            {filteredBooks.length === 0 && (
              <p className="text-sm text-gray-500 px-3 py-2">
                No results found
              </p>
            )}
          </PopoverContent>
        </Popover>

        <ul>
          <li>
            <Link
              to="/contact"
              className="flex gap-4 items-center bg-black text-white  py-2 px-4 rounded-md font-medium"
            >
              <FaHeadphones />
              <p>Contact Us</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
