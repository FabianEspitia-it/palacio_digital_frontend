"use client";

import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { FormEvent, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

import { toast } from "react-toastify";

export default function UpdateHome() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<null | string>(null);

  async function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const data = {
      email: email,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETFLIX}/home_code/${data.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.link);
        toast.success("Gracias por preferirnos :D");
      } else {
        toast.error("Algo salio mal, por favor verifica el correo");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-blue-800 to-blue-600 h-screen w-full">
        <div className="text-center">
          <div className="flex justify-center">
            <ScaleLoader color="#FFFFFF" height={80} width={6} />
          </div>
          <p className="pt-4 font-semibold text-white">
            El Pala está trayendo el link para actualizar hogar, por favor
            espera unos segundos
          </p>
        </div>
      </div>
    );
  }

  return (
    <Fade triggerOnce cascade>
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-blue-600">
        <div className="text-center rounded-lg px-8 pb-10 max-w-lg w-full">
          <Image
            src="/images/logo_palacio.png"
            alt="Palacio Digital Logo"
            width={180}
            height={180}
            className="mx-auto"
          />
          <p className="text-white text-xl mb-2 mt-2">
            Por favor digita el correo electrónico de la cuenta
          </p>

          {responseMessage && (
            <p className="text-white text-xl mb-5">
              Link para actualizar hogar:
              <a
                className="text-secondary_blue underline block"
                rel="noopener noreferrer"
                target="_blank"
                href={responseMessage}
              >
                Palalink
              </a>
            </p>
          )}

          <form className="space-y-4" onSubmit={sendData}>
            <input
              className="border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800 rounded-lg px-4 py-3 w-full transition duration-200"
              type="email"
              placeholder="palacio@digital.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300 w-full"
              type="submit"
            >
              Enviar
            </button>

            <a
              href="/"
              className="block bg-transparent border-2 border-blue-500 text-blue-300 rounded-lg px-6 py-3 font-semibold text-center hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300 w-full"
            >
              Inicio
            </a>
          </form>
        </div>
      </section>
    </Fade>
  );
}
