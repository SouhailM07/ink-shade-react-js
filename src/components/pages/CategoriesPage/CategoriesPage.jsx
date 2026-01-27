import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useCategoriesContext } from "../../../contexts/CategoriesContext/CategoriesContext";
import Navbar from "../../organisms/Navbar/Navbar";
import MyAside from "../../organisms/MyAside/MyAside";

export default function CategoriesPage() {
  const { categories } = useCategoriesContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // local state reflects URL ?search=
  const [searchTerm, setSearchTerm] = useState("");

  // Sync local searchTerm from URL on mount / URL change
  useEffect(() => {
    const term = searchParams.get("search") || "";
    setSearchTerm(term);
  }, [searchParams]);

  // Filter categories based on searchTerm
  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    const term = searchTerm.toLowerCase().trim();
    if (!term) return categories;

    return categories.filter((cat) => {
      const nameMatch = cat.name.toLowerCase().includes(term);
      const slugMatch = cat.slug.toLowerCase().includes(term);
      const descMatch = cat.description
        ? cat.description.toLowerCase().includes(term)
        : false;
      return nameMatch || slugMatch || descMatch;
    });
  }, [categories, searchTerm]);

  // Update URL when searching
  const handleSearch = () => {
    const params = {};
    if (searchTerm.trim()) {
      params.search = searchTerm.trim();
    }
    // if empty -> clear query, show all categories
    setSearchParams(params);
    // navigate is technically optional here because setSearchParams already navigates
    navigate({
      pathname: "/categories",
      search: params.search
        ? `?search=${encodeURIComponent(params.search)}`
        : "",
    });
  };

  return (
    <div className="flex">
      <MyAside />
      <div className="w-full">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Categories
          </h1>
          <p className="mt-1 text-sm text-neutral-600 max-w-xl">
            Browse books by category and discover knowledge curated by topic.
          </p>

          {/* Search input that controls URL */}
          <div className="mt-4 mb-6 max-w-md flex gap-2">
            <input
              type="text"
              placeholder="Search categories..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="min-h-screen bg-neutral-50 py-6">
            {filteredCategories.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-neutral-400">
                <p>No categories found for “{searchTerm}” 🔍</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function CategoryCard({ category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link to={`/search?category=${category.id}`}>
        <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full bg-neutral-100">
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
                <BookOpen className="w-6 h-6 mb-1" />
                <span className="text-xs">No Image</span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
              <h3 className="text-base font-semibold text-white">
                {category.name}
              </h3>
              {category.description && (
                <p className="mt-1 text-xs text-neutral-200 line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
