import { Fade } from "react-awesome-reveal";
import Image from "next/image";

export default function Hero() {
  const links = [
    { label: "Actualiza Hogar", href: "/update_home", id: 1 },
    { label: "Código acceso temporal", href: "/temporal_access", id: 2 },
    { label: "Código de inicio de sesión", href: "/session_code", id: 5 },
  ];

  return (
    <section className="relative flex items-center pt-8 pb-20">
      <div className="mx-auto text-center px-4 md:px-0">
        <Fade triggerOnce>
          <Image
            src="/images/logo_palacio.png"
            alt="Palacio Digital Logo"
            width={200}
            height={200}
            className="mx-auto"
          />

          <p className="text-lg md:text-xl text-white mt-6">
            Selecciona el servicio que deseas utilizar
          </p>

          <section className="flex flex-col items-center md:flex-row md:space-x-10 space-y-8 md:space-y-0 mt-9">
            {links.map((link, index) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative w-48 h-48 flex items-center justify-center rounded-xl shadow-lg transition-transform transform hover:scale-110 hover:rotate-3 duration-300
        ${
          index <= 1 ? "bg-netflix" : "bg-disney"
        } bg-cover bg-center bg-no-repeat
        border-2 border-gray-400 hover:border-white focus:border-white focus:outline-none`}
                aria-label={link.label}
              >
                <span className="bg-black bg-opacity-70 px-4 py-2 rounded-lg text-lg font-semibold tracking-wide text-white shadow-lg">
                  {link.label}
                </span>
              </a>
            ))}
          </section>
        </Fade>
      </div>
    </section>
  );
}
