import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./components/ProductCard";

export default function App() {

  // 🧠 ESTADOS
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [catActiva, setCatActiva] = useState("Todas");
  const [noti, setNoti] = useState(false);

  // 📦 CATEGORÍAS
  const categorias = ["Todas", "Herramientas", "Electricidad", "Construcción"];

  // 🛒 PRODUCTOS (demo)
  const [productos, setProductos] = useState([]);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/productos/")
    .then(res => res.json())
    .then(data => setProductos(data))
    .catch(err => console.log(err));
}, []);

  // 🔍 FILTRO
  const filtrados = productos.filter(p =>
    (catActiva === "Todas" || p.categoria === catActiva) &&
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ➕ AGREGAR AL CARRITO
  const agregar = (producto) => {
    setCarrito([...carrito, producto]);
    setNoti(true);
    setTimeout(() => setNoti(false), 1500);
  };

  // ❌ ELIMINAR
  const eliminar = (index) => {
    const nuevo = [...carrito];
    nuevo.splice(index, 1);
    setCarrito(nuevo);
  };

  // 💰 TOTAL
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  // 📲 WHATSAPP
  const enviarWhatsApp = () => {
    let mensaje = "Hola, quiero pedir:%0A";
    carrito.forEach(p => {
      mensaje += `- ${p.nombre} ($${p.precio})%0A`;
    });
    mensaje += `%0ATotal: $${total}`;

    window.open(`https://wa.me/549XXXXXXXXXX?text=${mensaje}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* NAVBAR */}
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">

  <h1 className="text-2xl font-bold tracking-tight">
    🔧 Ferretería Pro
  </h1>

  <div className="flex gap-3">
    <button className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
      Categorías
    </button>

    <button
      onClick={enviarWhatsApp}
      className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition shadow"
    >
      WhatsApp
    </button>
  </div>

</header>

      {/* BUSCADOR */}
      <div className="p-6">
       <div className="p-6 flex justify-center">
  <input
    placeholder="🔍 Buscar productos..."
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
    className="w-full max-w-xl p-4 rounded-2xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
  />
</div>
      </div>

      {/* CONTENIDO */}
      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-64 bg-white p-6 shadow-sm hidden md:block border-r">

  <h2 className="font-semibold text-lg mb-4">Categorías</h2>

  {categorias.map(cat => (
    <div
      key={cat}
      onClick={() => setCatActiva(cat)}
      className={`p-3 rounded-xl cursor-pointer mb-2 transition ${
        catActiva === cat
          ? "bg-black text-white shadow"
          : "hover:bg-gray-100"
      }`}
    >
      {cat}
    </div>
  ))}

</aside>

        {/* PRODUCTOS */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filtrados.map((p) => (
            <ProductCard key={p.id} producto={p} agregar={agregar} />
          ))}
        </motion.main>

      </div>

      {/* CARRITO */}
      <div className="fixed bottom-5 right-5 bg-white shadow-2xl rounded-2xl p-5 w-72 border">

  <h4 className="font-semibold mb-3 text-lg">🛒 Tu pedido</h4>

  <div className="max-h-40 overflow-auto text-sm space-y-2">
    {carrito.map((item, i) => (
      <div key={i} className="flex justify-between items-center">
        <span>{item.nombre}</span>
        <button
          onClick={() => eliminar(i)}
          className="text-red-500 hover:scale-110 transition"
        >
          ✕
        </button>
      </div>
    ))}
  </div>

  <div className="border-t mt-3 pt-3">
    <p className="font-bold text-lg">Total: ${total}</p>

    <button
      onClick={enviarWhatsApp}
      className="mt-3 w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition shadow"
    >
      Finalizar compra
    </button>
  </div>

</div>

      {/* NOTIFICACIÓN */}
      {noti && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-xl shadow-lg">
          Producto agregado 🛒
        </div>
      )}

    </div>
  );
}