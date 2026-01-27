import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MyAside from "../../organisms/MyAside/MyAside";
import Navbar from "../../organisms/Navbar/Navbar";
import { getAllProducts, getAllCategories } from "../HomePage/Api";
import BookCard from "../../atoms/BookCard/BookCard";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Local UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productsRes);
        setCategories(categoriesRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sync local state from URL (title + category)
  useEffect(() => {
    const term = searchParams.get("title") || ""; // from /search?title=...
    const cat = searchParams.get("category") || ""; // from /search?...&category=ID

    setSearchTerm(term);
    setSelectedCategory(cat ? parseInt(cat) : ""); // "" means "All Categories"
  }, [searchParams]);

  // Filter products based on search term + category
  const filteredProducts = products.filter((p) => {
    const matchesTitle = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      p.categories.some((c) => c.id === selectedCategory);

    return matchesTitle && matchesCategory;
  });

  // Update URL when user searches (button or Enter)
  const handleSearch = () => {
    const params = {};

    if (searchTerm.trim()) {
      params.title = searchTerm.trim();
    }
    if (selectedCategory) {
      params.category = selectedCategory.toString();
    }

    // If both are empty, clear params -> default: all products
    setSearchParams(params);
  };

  if (loading) {
    return <div className="p-10 text-center">Loading products...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MyAside />

      <div className="flex-1 overflow-auto min-h-screen">
        <Navbar />

        <main className="p-8 max-w-6xl mx-auto">
          {/* Search Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <input
              type="text"
              placeholder="Search by title..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value ? parseInt(e.target.value) : ""
                )
              }
            >
              {/* Default: All Categories (no filter) */}
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Results */}
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No products found ❌
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <BookCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.images?.[0]?.src}
                  price={product.regular_price}
                  ratingCount={product.rating_count}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
