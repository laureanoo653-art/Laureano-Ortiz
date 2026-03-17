import { motion } from "framer-motion";

export default function ProductCard({ producto, agregar }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300"
    >
      <div className="overflow-hidden">
        src={producto.imagen}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">
          {producto.nombre}
        </h3>

        <p className="text-xl font-bold text-green-600 mb-3">
          ${producto.precio}
        </p>

        <button
          onClick={() => agregar(producto)}
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  );
}