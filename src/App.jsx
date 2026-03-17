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

// El nuevo código conectado a la nube:
useEffect(() => {
  fetch("https://ferreteria-backend-hu9g.onrender.com/api/productos/")
    .then(res => res.json())
    .then(data => setProductos(data))
    .catch(err => console.error("Error cargando productos:", err));
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

  // 📲 WHATSAPP}
  const enviarWhatsApp = () => {
  if (carrito.length === 0) {
    alert("¡Tu carrito está vacío! Agrega algunos productos primero.");
    return;
  }

  let mensaje = "Hola! 👋 Quiero realizar el siguiente pedido:%0A%0A";
  
  carrito.forEach((p) => {
    mensaje += `✅ ${p.nombre} - $${p.precio}%0A`;
  });

  mensaje += `%0A*Total a pagar: $${total}*`;

  const numeroTelefono = "5493402658058"; 
  const url = `https://wa.me/${numeroTelefono}?text=${mensaje}`;
  window.open(url, "_blank");
};
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* NAVBAR */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
  <div className="flex items-center gap-2">
    <span className="text-3xl">🔧</span>
    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent">
      Ferretería Pro
    </h1>
  </div>

  <div className="flex items-center gap-4">
    <button className="hidden sm:block text-sm font-medium text-gray-600 hover:text-black transition">
      Sobre Nosotros
    </button>
    <button 
      onClick={enviarWhatsApp}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md shadow-green-200"
    >
      <span className="text-lg">💬</span> Pedir por WhatsApp
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
        <aside className="w-72 bg-gray-50/50 p-8 hidden md:block border-r border-gray-200 h-[calc(100vh-80px)] sticky top-20">
  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Categorías</h2>
  <div className="space-y-1">
    {categorias.map(cat => (
      <button
        key={cat}
        onClick={() => setCatActiva(cat)}
        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
          catActiva === cat
            ? "bg-white text-blue-600 shadow-sm border border-gray-200"
            : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-900"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
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
      <div className="fixed bottom-6 right-6 bg-white shadow-2xl rounded-3xl p-6 w-80 border border-gray-100 ring-1 ring-black/5 transition-all hover:shadow-blue-100">
  <div className="flex items-center justify-between mb-4">
    <h4 className="font-bold text-xl text-gray-800 flex items-center gap-2">
      <span>🛒</span> Tu pedido
    </h4>
    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
      {carrito.length} ítems
    </span>
  </div>

  <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
    {carrito.length === 0 ? (
      <p className="text-gray-400 text-center py-4 text-sm italic">El carrito está vacío</p>
    ) : (
      carrito.map((item, i) => (
        <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 group">
          <span className="text-gray-700 font-medium truncate w-40">{item.nombre}</span>
          <div className="flex items-center gap-3">
            <span className="text-blue-600 font-bold text-sm">${item.precio}</span>
            <button
              onClick={() => eliminar(i)}
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))
    )}
  </div>

  <div className="mt-4 pt-4 border-t border-gray-100">
    <div className="flex justify-between items-end mb-4">
      <span className="text-gray-500 text-sm">Subtotal</span>
      <span className="text-2xl font-black text-gray-900">${total}</span>
    </div>

    <button
      onClick={enviarWhatsApp}
      disabled={carrito.length === 0}
      className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
        carrito.length > 0 
        ? "bg-black hover:bg-gray-800 shadow-gray-200" 
        : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      Finalizar Compra
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