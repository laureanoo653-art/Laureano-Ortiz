import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./components/ProductCard";

export default function App() {
  // 🧠 ESTADOS
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [catActiva, setCatActiva] = useState("Todas");
  const [noti, setNoti] = useState(false);
  const [productos, setProductos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // 📦 CATEGORÍAS
  const categorias = ["Todas", "Herramientas", "Electricidad", "Construcción"];

  // 🌍 CARGAR PRODUCTOS DESDE LA API
  useEffect(() => {
    fetch("https://ferreteria-backend-hu9g.onrender.com/api/productos/")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // 🔍 LÓGICA DE FILTRO
  const filtrados = productos.filter((p) =>
    (catActiva === "Todas" || p.categoria === catActiva) &&
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🛒 FUNCIONES DEL CARRITO
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

  // 📲 ENVIAR A WHATSAPP
  const enviarWhatsApp = () => {
    if (carrito.length === 0) {
      alert("¡Tu carrito está vacío!");
      return;
    }
    let mensaje = "Hola! 👋 Quiero realizar el siguiente pedido:%0A%0A";
    carrito.forEach((p) => {
      mensaje += `✅ ${p.nombre} - $${p.precio}%0A`;
    });
    mensaje += `%0A*Total a pagar: $${total}*`;
    const numeroTelefono = "5493402658058";
    window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, "_blank");
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans selection:bg-yellow-200">
      
      {/* 1. NAVBAR PROFESIONAL */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm px-8 py-3 flex items-center sticky top-0 z-50 border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 w-1/4">
          <span className="text-2xl cursor-pointer" onClick={() => window.scrollTo(0,0)}>🔧</span>
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent hidden lg:block">
            Ferretería Pro
          </h1>
        </div>

        {/* Buscador Centrado */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">🔍</span>
            <input
              placeholder="¿Qué herramienta buscás?"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm shadow-inner"
            />
          </div>
        </div>

        {/* Acciones Derecha */}
        <div className="flex items-center justify-end gap-3 flex-shrink-0 w-1/4">
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className={`text-xs font-bold uppercase px-3 py-2 rounded-xl transition ${isLoggedIn ? "text-red-500 hover:bg-red-50" : "text-blue-600 hover:bg-blue-50"}`}
          >
            {isLoggedIn ? "Logout 🚪" : "Login 👤"}
          </button>

          <button 
            onClick={() => setCarritoAbierto(true)}
            className="relative p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition active:scale-90"
          >
            <span className="text-xl">🛒</span>
            {carrito.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {carrito.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=2000" 
          alt="Ferretería" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div> 
        <div className="relative z-10 text-center px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            TODO LO QUE NECESITAS, <br/> <span className="text-yellow-400 font-black">EN UN SOLO LUGAR.</span>
          </motion.h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto font-light">Calidad profesional en herramientas y materiales de construcción.</p>
        </div>
      </div>

      {/* 3. BANNERS DE CONFIANZA */}
      <div className="bg-white border-b py-10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm">
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🚚</span>
            <h3 className="font-bold">Envíos a Domicilio</h3>
            <p className="text-gray-500">Recibí tu pedido en la puerta de tu obra.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">💳</span>
            <h3 className="font-bold">Pagos Seguros</h3>
            <p className="text-gray-500">Efectivo, Transferencia o Tarjeta.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">⭐</span>
            <h3 className="font-bold">Asesoramiento Experto</h3>
            <p className="text-gray-500">Te ayudamos a elegir lo mejor para vos.</p>
          </div>
        </div>
      </div>

      {/* 4. CUERPO PRINCIPAL (Sidebar + Main) */}
      <div className="flex max-w-[1600px] mx-auto mt-6">
        {/* Sidebar de Categorías */}
        <aside className="w-72 p-8 hidden md:block sticky top-24 h-fit">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Categorías</h2>
          <div className="space-y-2">
            {categorias.map(cat => (
              <button key={cat} onClick={() => setCatActiva(cat)}
                className={`w-full text-left px-5 py-3 rounded-2xl font-medium transition-all ${
                  catActiva === cat ? "bg-black text-white shadow-lg scale-105" : "text-gray-500 hover:bg-gray-200"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Listado de Productos */}
        <motion.main layout className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtrados.map((p) => (
            <div key={p.id} onClick={() => setProductoSeleccionado(p)} className="cursor-pointer">
              <ProductCard producto={p} agregar={agregar} />
            </div>
          ))}
        </motion.main>
      </div>

      {/* 5. MODAL DE DETALLE (Se abre al tocar un producto) */}
      <AnimatePresence>
        {productoSeleccionado && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
              <button onClick={() => setProductoSeleccionado(null)} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white z-10 text-xl shadow-md">✕</button>
              <div className="md:w-1/2 h-72 md:h-auto bg-gray-100">
                <img src={productoSeleccionado.imagen || "https://via.placeholder.com/600"} className="w-full h-full object-cover" alt={productoSeleccionado.nombre} />
              </div>
              <div className="p-10 md:w-1/2 flex flex-col justify-center">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">{productoSeleccionado.categoria}</span>
                <h2 className="text-3xl font-black mt-2 leading-tight">{productoSeleccionado.nombre}</h2>
                <p className="text-gray-500 mt-5 text-sm leading-relaxed">Alta durabilidad y rendimiento profesional. Ideal para trabajos exigentes en obra o el hogar.</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-4xl font-black text-gray-900">${productoSeleccionado.precio}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); agregar(productoSeleccionado); setProductoSeleccionado(null); }}
                    className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg"
                  >
                    Agregar 🛒
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. CARRITO LATERAL (DRAWER) */}
      <AnimatePresence>
        {carritoAbierto && (
          <div className="fixed inset-0 z-[110] overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCarritoAbierto(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b">
                <h2 className="text-2xl font-black flex items-center gap-2">🛒 Tu pedido <span className="text-gray-300">({carrito.length})</span></h2>
                <button onClick={() => setCarritoAbierto(false)} className="text-2xl hover:rotate-90 transition-transform">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {carrito.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 italic font-light">Tu carrito está esperando ser llenado...</div>
                ) : (
                  carrito.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition">
                      <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <img src={item.imagen} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-800">{item.nombre}</h4>
                        <p className="text-blue-600 font-bold">${item.precio}</p>
                      </div>
                      <button onClick={() => eliminar(i)} className="text-gray-300 hover:text-red-500 p-2">✕</button>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-500 font-medium">Total a pagar</span>
                  <span className="text-3xl font-black text-gray-900">${total}</span>
                </div>
                <button 
                  onClick={enviarWhatsApp}
                  disabled={carrito.length === 0}
                  className={`w-full py-5 rounded-3xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl ${
                    carrito.length > 0 ? "bg-green-600 text-white hover:bg-green-700 shadow-green-100" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Finalizar por WhatsApp 💬
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. NOTIFICACIÓN FLOTANTE */}
      <AnimatePresence>
        {noti && (
          <motion.div initial={{opacity:0, x:50}} animate={{opacity:1, x:0}} exit={{opacity:0, x:50}}
            className="fixed top-24 right-5 bg-black text-white px-6 py-3 rounded-2xl shadow-2xl z-[120] flex items-center gap-2"
          >
            <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">✓</span>
            ¡Agregado al carrito!
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}