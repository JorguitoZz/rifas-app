import { CreditCard, Gift, Ticket, Trophy } from "lucide-react";

export default function Instrucciones() {
  const steps = [
    {
      icon: <Ticket className="h-10 w-10 text-primary text-[#e9b30e]" />,
      title: "Elige tu Rifa",
      description:
        "Explora nuestras rifas disponibles y selecciona la que más te guste. Cada una tiene premios increíbles.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary text-[#e9b30e]" />,
      title: "Compra tu Boleto",
      description:
        "Completa el formulario con tus datos y realiza el pago mediante Pago Móvil, Zelle o Binance.",
    },
    {
      icon: <Gift className="h-10 w-10 text-primary text-[#e9b30e]" />,
      title: "Espera el Sorteo",
      description:
        "Te confirmamos tu participación y te notificaremos sobre la fecha del sorteo oficial.",
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary text-[#e9b30e]" />,
      title: "¡Gana el Premio!",
      description:
        "Si eres el ganador, te contactaremos inmediatamente para coordinar la entrega de tu premio.",
    },
  ];

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Cómo participar</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-6 py-8  rounded-[10px] shadow-md border-2 border-[rgba(80,80,80,0.5)] bg-[#1e1e24]"
          >
            <div className="mb-3 bg-[#e7b00833] rounded-full p-5">{step.icon}</div>
            <h3 className="text-[25px] font-semibold mb-2">{step.title}</h3>
            <p className="text-[18px] text-[#94a3b8] text-sm">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div
            className="max-w-2xl mx-auto border p-8 rounded-[10px] shadow-lg"
            style={{
            background: "linear-gradient(to right, #064e3b, #111827, #78350f)", // verde → gris → dorado
            borderColor: "#047857"
            }}
        >
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#34d399" }}>
            🎉 ¡Garantía de Transparencia!
            </h3>
            <p className="text-lg" style={{ color: "#94a3b8" }}>
            Todos nuestros sorteos son 100% transparentes y verificables. 
            Los ganadores son seleccionados mediante sorteo aleatorio en vivo, 
            transmitido en nuestras redes sociales para total transparencia.
            </p>
        </div>
      </div>


    </section>
  );
}
