import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./components/ProductCard";

export default function App() {
  // 🧠 ESTADOS
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [catActiva, setCatActiva] = useState("Todas");
  const [noti, setNoti] = useState(false);
  const [productos, setProductos] = useState([]);

  // 📦 CATEGORÍAS
  const categorias = ["Todas", "Herramientas", "Electricidad", "Construcción"];

  // 🌍 API
  useEffect(() => {
    fetch("https://ferreteria-backend-hu9g.onrender.com/api/productos/")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // 🔍 FILTRO
  const filtrados = productos.filter((p) =>
      (catActiva === "Todas" || p.categoria === catActiva) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🛒 LÓGICA CARRITO
  const agregar = (producto) => {
    setCarrito([...carrito, producto]);
    setNoti(true);
    setTimeout(() => setNoti(false), 1500);
  };

  const eliminar = (index) => {
    const nuevo = [...carrito];
    nuevo.splice(index, 1);
    setCarrito(nuevo);
  };

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  // 📲 WHATSAPP
  const enviarWhatsApp = () => {
    if (carrito.length === 0) {
      alert("¡Tu carrito está vacío!");
      return;
    }
    let mensaje = "Hola! 👋 Quiero realizar el siguiente pedido:%0A%0A";
    carrito.forEach((p) => { mensaje += `✅ ${p.nombre} - $${p.precio}%0A`; });
    mensaje += `%0A*Total a pagar: $${total}*`;
    const numeroTelefono = "5493402658058"; 
    window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, "_blank");
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans selection:bg-yellow-200">
      
      {/* 1. NAVBAR (Limpio y pegado arriba) */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🔧</span>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent">
            Ferretería Pro
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-gray-600 hover:text-black">Sobre Nosotros</button>
          <button onClick={enviarWhatsApp} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md shadow-green-200">
            💬 Pedir por WhatsApp
          </button>
        </div>
      </header>

      {/* 2. SECCIÓN HERO (Impacto visual) */}
      <div className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=2000" 
          alt="Ferretería" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div> 
        <div className="relative z-10 text-center px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white mb-4">
            TODO LO QUE NECESITAS, <br/> <span className="text-yellow-400">EN UN SOLO LUGAR.</span>
          </motion.h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">Calidad profesional en herramientas y materiales.</p>
        </div>
      </div>

      {/* 3. BANNERS DE CONFIANZA */}
      <div className="bg-white border-b py-10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🚚</span>
            <h3 className="font-bold">Envíos a Domicilio</h3>
            <p className="text-sm text-gray-500">Recibí tu pedido en la puerta.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">💳</span>
            <h3 className="font-bold">Pagos Seguros</h3>
            <p className="text-sm text-gray-500">Efectivo, Transferencia o Tarjeta.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">⭐</span>
            <h3 className="font-bold">Atención VIP</h3>
            <p className="text-sm text-gray-500">Asesoramiento para tu obra.</p>
          </div>
        </div>
      </div>

      {/* 4. BUSCADOR */}
      <div className="py-10 flex justify-center bg-gray-50">
        <input
          placeholder="🔍 ¿Qué estás buscando hoy?"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-2xl p-5 rounded-3xl border-none shadow-xl focus:ring-2 focus:ring-blue-500 text-lg outline-none"
        />
      </div>

      {/* 5. CUERPO PRINCIPAL */}
      <div className="flex max-w-[1600px] mx-auto">
        {/* SIDEBAR */}
        <aside className="w-72 p-8 hidden md:block sticky top-24 h-fit">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Categorías</h2>
          <div className="space-y-2">
            {categorias.map(cat => (
              <button key={cat} onClick={() => setCatActiva(cat)}
                className={`w-full text-left px-5 py-3 rounded-2xl font-medium transition-all ${
                  catActiva === cat ? "bg-black text-white shadow-lg" : "text-gray-500 hover:bg-gray-200"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* LISTADO DE PRODUCTOS */}
        <motion.main layout className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtrados.map((p) => (
            <ProductCard key={p.id} producto={p} agregar={agregar} />
          ))}
        </motion.main>
      </div>

      {/* 6. CARRITO FLOTANTE MODERNO */}
      <div className="fixed bottom-6 right-6 bg-white shadow-2xl rounded-3xl p-6 w-80 border border-gray-100 z-50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-xl text-gray-800">🛒 Tu pedido</h4>
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">{carrito.length}</span>
        </div>
        <div className="max-h-52 overflow-y-auto pr-2">
          {carrito.length === 0 ? (
            <p className="text-gray-400 text-center py-4 text-sm italic">Carrito vacío</p>
          ) : (
            carrito.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                <span className="text-gray-700 text-sm truncate w-32 font-medium">{item.nombre}</span>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-sm">${item.precio}</span>
                  <button onClick={() => eliminar(i)} className="text-gray-300 hover:text-red-500">✕</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end mb-4">
            <span className="text-gray-500 text-sm">Total</span>
            <span className="text-2xl font-black text-gray-900">${total}</span>
          </div>
          <button onClick={enviarWhatsApp} disabled={carrito.length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
              carrito.length > 0 ? "bg-black hover:bg-gray-800 shadow-gray-200" : "bg-gray-300 cursor-not-allowed"
            }`}>
            Confirmar Pedido
          </button>
        </div>
      </div>

      {/* NOTIFICACIÓN */}
      {noti && (
        <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="fixed top-24 right-5 bg-black text-white px-6 py-3 rounded-2xl shadow-2xl z-[60]">
          ¡Agregado al carrito! 🛒
        </motion.div>
      )}
    </div>
  );
}