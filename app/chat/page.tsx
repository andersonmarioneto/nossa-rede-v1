"use client";

import Link from "next/link";
import { useState } from "react";

export default function ChatPrivace() {
  const [message, setMessage] = useState("");

  return (
    <div
      className="relative flex h-screen w-full flex-col bg-[#f8fcfb] justify-between overflow-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f8fcfb] p-4 pb-2 border-b border-[#e7f3f1]">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-[#0d1b19] flex shrink-0 items-center justify-center rounded-full h-10 w-10 bg-transparent transition-all duration-200 hover:bg-[#13ecc8] hover:shadow-md"
            aria-label="Voltar para conversas"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </a>
          <Link href="/profile-friend">
            <h2 className="text-[#0d1b19] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
              Lucas
            </h2>
          </Link> 
          <div className="flex w-12 items-center justify-end">
            <button
              className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-[#0d1b19] p-0 transition-all duration-200 hover:bg-yellow-100"
              aria-label="Classificar positivamente"
              title="Classificar positivamente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Exemplo de mensagem recebida */}
        <div className="flex items-end gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsPROY_3q1GG14cKFLFKfCRZwSxzqJjh82aAjbjIj8lrTvvfN3YsR519NBC8H75zRYgTn3R52OZcWE0ahDu30ySVeCylANEHs8BzM6y5IurHMbDxozyDP-OazT3S0d953oSdt8QLxY1Sv9K0kxwOJvtXsGAhkzPVXq0kQUQEs1_uEreXwd3fbLNi4FRKJcWaMmU1jzAgEUvxvjENwgoR_fuZzGJwxIHLpCq0OypGQr8oyY50WzS-PcguipF7CqhlzBJ6znte0saMG3")',
            }}
          ></div>
          <div className="flex flex-1 flex-col gap-1 items-start">
            <p className="text-[#4c9a8d] text-[13px] font-normal">Lucas</p>
            <p className="text-base font-normal rounded-xl px-4 py-3 bg-[#e7f3f1] text-[#0d1b19]">
              Ei, tudo bem? Como foi o seu dia?
            </p>
          </div>
        </div>

        {/* Exemplo de mensagem enviada */}
        <div className="flex items-end gap-3 justify-end">
          <div className="flex flex-1 flex-col gap-1 items-end">
            <p className="text-[#4c9a8d] text-[13px] font-normal text-right">Você</p>
            <p className="text-base font-normal rounded-xl px-4 py-3 bg-[#13ecc8] text-[#0d1b19]">
              Oi! Foi ótimo, obrigado por perguntar. E o seu?
            </p>
          </div>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARr6DIm7bFTLJ7oVNkvbgAkUKftgbWtIIqxn3Aeb0DrEg1J0ieVdFvcqEw9G1zeIEAPm2Kn6yeoCUGpqgI6RgNw9To0-nsMI3j_5iloyJQbpra0KbPsijnTlhHOuWV8vvAEAL2z6tSddVZarU9yuOEtVWZQ6bFBKKUDkh1EtbsBIVwzgF5VUXc-nk0TyCFZlueKkep5qK3ebtVuj_3nZh1foopnVoTYnMlce0NRuA92jrRhzXDoKyKlsdjiKNxiKcubssdHJTiFwpE")',
            }}
          ></div>
        </div>

        {/* Exemplo de mensagem recebida */}
        <div className="flex items-end gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsPROY_3q1GG14cKFLFKfCRZwSxzqJjh82aAjbjIj8lrTvvfN3YsR519NBC8H75zRYgTn3R52OZcWE0ahDu30ySVeCylANEHs8BzM6y5IurHMbDxozyDP-OazT3S0d953oSdt8QLxY1Sv9K0kxwOJvtXsGAhkzPVXq0kQUQEs1_uEreXwd3fbLNi4FRKJcWaMmU1jzAgEUvxvjENwgoR_fuZzGJwxIHLpCq0OypGQr8oyY50WzS-PcguipF7CqhlzBJ6znte0saMG3")',
            }}
          ></div>
          <div className="flex flex-1 flex-col gap-1 items-start">
            <p className="text-[#4c9a8d] text-[13px] font-normal">Lucas</p>
            <p className="text-base font-normal rounded-xl px-4 py-3 bg-[#e7f3f1] text-[#0d1b19]">
              Também foi bom. Estou a trabalhar, falamos depois :)
            </p>
          </div>
        </div>

        {/* Exemplo de mensagem enviada */}
        <div className="flex items-end gap-3 justify-end">
          <div className="flex flex-1 flex-col gap-1 items-end">
            <p className="text-[#4c9a8d] text-[13px] font-normal text-right">Você</p>
            <p className="text-base font-normal rounded-xl px-4 py-3 bg-[#13ecc8] text-[#0d1b19]">
              Ok, então depois nos falamos.
            </p>
          </div>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARr6DIm7bFTLJ7oVNkvbgAkUKftgbWtIIqxn3Aeb0DrEg1J0ieVdFvcqEw9G1zeIEAPm2Kn6yeoCUGpqgI6RgNw9To0-nsMI3j_5iloyJQbpra0KbPsijnTlhHOuWV8vvAEAL2z6tSddVZarU9yuOEtVWZQ6bFBKKUDkh1EtbsBIVwzgF5VUXc-nk0TyCFZlueKkep5qK3ebtVuj_3nZh1foopnVoTYnMlce0NRuA92jrRhzXDoKyKlsdjiKNxiKcubssdHJTiFwpE")',
            }}
          ></div>
        </div>

      </main>

      {/* Footer / input */}
      <div className="p-4 bg-[#f8fcfb]">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Escrever mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-xl px-4 py-2 text-[#0d1b19] bg-[#e7f3f1] focus:outline-none focus:ring-0 text-base"
          />
          <button className="rounded-full bg-[#13ecc8] px-4 py-2 text-[#0d1b19] font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
