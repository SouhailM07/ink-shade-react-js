import { useEffect } from "react";
import { useCategoriesContext } from "../../../contexts/CategoriesContext/CategoriesContext";
import { getAllCategories, getAllProducts } from "../HomePage/Api";
import { useLoadingContext } from "../../../contexts/LoadingContext/LoadingContext";
import { useBooksContext } from "../../../contexts/BooksContext/BooksContext";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function AppDataLoader({ children }) {
  let { categories, setCategories } = useCategoriesContext();
  let { loading, setLoading } = useLoadingContext();
  let { books, setBooks } = useBooksContext();

  let handle_get_data = async () => {
    try {
      setLoading(true);
      let books_res = await getAllProducts();
      let categories_res = await getAllCategories();
      setBooks(books_res);
      setCategories(categories_res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (categories.length == 0 && books.length == 0) handle_get_data();
  }, []);
  if (loading) return <LoadingPage />;
  if (!loading && !categories.length && !books.length) return null;
  return children;
}
