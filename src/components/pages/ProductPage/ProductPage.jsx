import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyAside from "../../organisms/MyAside/MyAside";
import Navbar from "../../organisms/Navbar/Navbar";
import { getSingleProductData } from "../HomePage/Api";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getSingleProductData(id)
      .then(setProduct)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found ❌</div>;
  }

  return (
    <div className="flex h-[70vh] bg-gray-50">
      <MyAside />

      <div className="flex-1 overflow-auto min-h-screen">
        <Navbar />

        <main className="p-8 max-w-6xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Images */}
            <div className=" ">
              <div className="aspect-[3/4] h-[70vh]  bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src={product.images?.[0]?.src}
                  alt={product.images?.[0]?.alt || product.name}
                  className="w-full h-full "
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.src}
                      alt={img.alt}
                      className="w-16 h-20 object-cover rounded-lg border cursor-pointer hover:border-primary"
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Product Info */}
            <div className="flex flex-col justify-between ">
              <div className="">
                <h1 className="text-2xl font-bold">{product.name}</h1>

                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <span>⭐ {product.rating_count} reviews</span>
                  <span>•</span>
                  <span>
                    {product.stock_quantity
                      ? `${product.stock_quantity} in stock`
                      : "Available"}
                  </span>
                </div>

                <div className="mt-4 text-3xl font-bold text-primary">
                  {product.price} DZD
                </div>

                <div
                  className="mt-6 text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />

                {/* Categories */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="px-3 py-1 bg-gray-200 rounded-full text-xs"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
              {/* Actions */}
              <div className="grid">
                <a
                  target="_blank"
                  href={`http://localhost/ink-shade-react/?add-to-cart=${id}`}
                  className="px-6 py-3 bg-primary text-white rounded-xl text-center hover:opacity-90"
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mt-14">
            <h2 className="text-xl font-semibold mb-4">Description</h2>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
