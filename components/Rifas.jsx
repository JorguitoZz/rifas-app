import CardRifa from "./CardRifa";

export default function Rifas() {
  // Simulando los datos de la base de datos
  const rifas = [
    {
      id: 1,
      nombre: "Toyota Cross",
      descripcion: "Descripcion de la rifa",
      precio: 15,
      premio: "auto",
      vendidos: 700,
      total: 1000,
      disponibles: 300,
      fechaSorteo: "30 de diciembre del 2025",
      img: "/woman-holding-keys-from-her-new-car.webp",
    },
  ];

  const isSingle = rifas.length === 1;

  return (
    <div className="w-[90%] max-w-[1600px] mx-auto py-7">
      <h2 className="text-[30px] font-semibold text-center mb-5">
        Rifas Disponibles
      </h2>

      <div
        className={
          isSingle
            ? "flex flex-col sm:flex-row gap-5 justify-center"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        }
      >
        {rifas.map((rifa) => (
  <CardRifa key={rifa.id} {...rifa} horizontal={isSingle} />
))}

      </div>
    </div>
  );
}
