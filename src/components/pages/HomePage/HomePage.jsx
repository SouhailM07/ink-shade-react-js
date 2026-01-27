import { useBooksContext } from "../../../contexts/BooksContext/BooksContext";
import BookCard from "../../atoms/BookCard/BookCard";
import MyAside from "../../organisms/MyAside/MyAside";
import Navbar from "../../organisms/Navbar/Navbar";

export default function HomePage() {
  const { books } = useBooksContext();
  return (
    <div className="flex">
      <MyAside />
      <div className="w-full">
        <Navbar />
        <main className="p-6">
          <h1 className="text-xl font-bold mb-6">Books Store</h1>
          <BooksGrid products={books} />
        </main>
      </div>
    </div>
  );
}

function BooksGrid({ products }) {
  if (!products.length) {
    return (
      <div className="text-center py-10 text-gray-500">No books found 📚</div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
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
  );
}
