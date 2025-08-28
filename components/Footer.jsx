export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Descripción */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">RifaFeliz</h2>
          <p className="text-sm leading-relaxed">
            Tu destino para ganar increíbles premios.  
            Rifas transparentes, premios reales, ganadores felices.
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">Rifas Activas</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Términos y Condiciones</a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:info@rifafeliz.com" className="hover:text-white transition">
                info@rifafeliz.com
              </a>
            </li>
            <li>
              <a href="tel:+584141234567" className="hover:text-white transition">
                +58 414-123-4567
              </a>
            </li>
            <li>Caracas, Venezuela</li>
          </ul>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
        © 2025 RifaFeliz. Todos los derechos reservados.
      </div>
    </footer>
  );
}
