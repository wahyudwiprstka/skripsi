import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const ProductCard = (props: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "10%" }}
      whileInView={{ opacity: 1, y: "0" }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="product-card w-[300px] h-[400px] flex overflow-hidden justify-center flex-col mb-2 outline outline-1 outline-slate-200 shadow-lg rounded-md p-5 text-black bg-white"
    >
      <Image
        src={props.imglink}
        alt={props.imgalt}
        width={500}
        height={500}
        className="product-card-img rounded w-[200px] m-auto object-cover object-center"
      />
      <a href="#">
        <h5 className="overflow-hidden text-ellipsis line-clamp-2 text-lg">
          {props.title}
        </h5>
      </a>
      <div className="mb-2 mt-2.5 flex items-center">
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>

        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {props.rating}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Rp {props.price}</span>
        <Link
          href="/product"
          className="rounded-lg bg-cyan-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          View Product
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
