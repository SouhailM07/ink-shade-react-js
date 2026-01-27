import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function BookCard({ id, name, image, price, ratingCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full aspect-[3/4]"
    >
      <Link to={`/product/${id}`}>
        <article className=" group min-h-full relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full   h-full  object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex-1 items-center justify-center text-sm text-neutral-400  ">
              No Image
            </div>
          )}
          <div className="absolute flex flex-col justify-between z-[20] h-full inset-0">
            <div className="flexBetween w-full p-[1rem] ">
              <div className=" rounded-lg bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-neutral-900 shadow">
                {price ? `${price} DZD` : "Free"}
              </div>
              {/* Rating Badge */}
              {ratingCount !== undefined && (
                <div className="  flex items-center gap-1 rounded-lg bg-white/90 backdrop-blur px-2 py-1 text-xs text-neutral-700 shadow">
                  <Star className="w-3.5 h-3.5" />
                  {ratingCount}
                </div>
              )}
            </div>
            {/* Content */}
            <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent h-[6rem] flex items-end w-full rounded-xl  p-3">
              <h3 className="text-sm font-medium text-white leading-snug line-clamp-2">
                {name}
              </h3>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
