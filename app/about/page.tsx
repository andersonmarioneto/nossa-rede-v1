"use client";
import React from "react";

export default function About() {
  const teamMembers = [
    { name: "Anderson Neto", role: "Frontend & UI Design" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fcfb] font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f8fcfb] border-b border-[#e7f3f1] shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <img src="/img/private-chat.png" alt="logo" className="h-8" />
          <h2 className="flex-1 text-center text-xl font-bold text-[#0d1b19]">
            Sobre
          </h2>
          <button
            type="button"
            title="Editar perfil"
            aria-label="Editar perfil"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-[#0d1b19] hover:bg-[#13ecc8]/10 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {/* DESCRIÇÃO */}
        <h2 className="my-4 text-center text-zinc-500 text-lg">
          <strong>Nossa<span className="text-zinc-800">.Rede</span></strong>
        </h2>
        <p className="mb-6 text-center text-base text-[#4c9a8d]">É o espaço onde você e seus amigos se conectam. Troque mensagens, compartilhe ideias e colabore de forma intuitiva, segura e divertida.
        </p>

        {/* EQUIPE */}
        <section className="border-t border-[#e7f3f1]">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-4 py-3 min-h-[72px] hover:bg-[#eefaf8] transition-colors"
            >
              <div className="h-14 w-14 rounded-full bg-[#d1f0eb] flex items-center justify-center font-bold text-[#0d1b19]">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-[#0d1b19]">{member.name}</p>
                <p className="text-sm font-normal text-[#4c9a8d]">{member.role}</p>
              </div>
            </div>
          ))}
        </section>

        {/* INFO ADICIONAL */}
        <section className="mt-6 border-t border-[#e7f3f1]">
          <div className="flex justify-between gap-4 px-4 py-3 min-h-[56] hover:bg-[#eefaf8] transition-colors">
            <p className="text-base font-medium text-[#0d1b19]">Ano de Lançamento</p>
            <p className="text-base text-[#4c9a8d] font-normal text-end">2025</p>
          </div>
          <div className="flex justify-between gap-4 px-4 py-3 min-h-[56] hover:bg-[#eefaf8] transition-colors">
            <p className="text-base font-medium text-[#0d1b19]">Tecnologias Utilizadas</p>
            <p className="text-base text-[#4c9a8d] font-normal text-end">
              Next.js, React, TypeScript, Tailwind CSS, Cordova
            </p>
          </div>
          <div className="flex justify-between gap-4 px-4 py-3 min-h-[56] hover:bg-[#eefaf8] transition-colors">
            <p className="text-base font-medium text-[#0d1b19]">Missão</p>
            <p className="text-base text-[#4c9a8d] font-normal text-end">
              Conectar pessoas de forma a tornar a comunicação mais simples e divertida :) 
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
