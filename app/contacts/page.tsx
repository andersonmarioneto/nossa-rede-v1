"use client";
import { useState } from "react";
import Link from "next/link";

interface Contact {
  name: string;
  role: string;
  mutuals: number;
  image: string;
  link: string;
}

const contacts: Contact[] = [
  { name: "Sofia Mendes", role: "Designer", mutuals: 2, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Grupo de Trabalho", role: "Product Team", mutuals: 5, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Ricardo Silva", role: "Marketing", mutuals: 1, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Sofia Mendes", role: "Designer", mutuals: 2, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Grupo de Trabalho", role: "Product Team", mutuals: 5, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Ricardo Silva", role: "Marketing", mutuals: 1, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Sofia Mendes", role: "Designer", mutuals: 2, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Grupo de Trabalho", role: "Product Team", mutuals: 5, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Ricardo Silva", role: "Marketing", mutuals: 1, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Sofia Mendes", role: "Designer", mutuals: 2, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Grupo de Trabalho", role: "Product Team", mutuals: 5, image: "https://via.placeholder.com/150", link: "/profile-friend" },
  { name: "Ricardo Silva", role: "Marketing", mutuals: 1, image: "https://via.placeholder.com/150", link: "/profile-friend" },
];

export default function ContactsPage() {
  const [query, setQuery] = useState("");

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-[#f8fcfb] pb-19">
      <header className="sticky top-0 bg-[#f8fcfb] z-50 border-b border-[#e7f3f1] shadow-sm">
        <div className="container mx-auto flex items-center p-4 justify-between">
          <img src="/img/private-chat.png" alt="Logo" className="h-8" />
          <h2 className="text-[#0d1b19] text-xl font-bold flex-1 text-center">Contatos</h2>
          <button
            type="button"
            title="Editar profile-friend"
            aria-label="Editar profile-friend"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-[#0d1b19] hover:bg-[#13ecc8]/10 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-3">
        <div className="max-w-xl mx-auto relative">
          <input
            type="search"
            placeholder="Pesquisar contactos..."
            aria-label="Pesquisar contactos"
            className="w-full rounded-lg px-4 py-2 bg-[#e7f3f1] placeholder:text-[#4c9a8d] focus:outline-none focus:ring-2 focus:ring-[#13ecc8]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4c9a8d] p-1.5 rounded-full hover:bg-[#eefaf8]"
            aria-label="Limpar pesquisa"
          >
            ×
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto divide-y divide-[#e7f3f1]">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <Link key={index} href={contact.link} className="flex items-center gap-4 px-4 py-3 min-h-[72px] hover:bg-[#eefaf8] transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-cover bg-center rounded-full h-14 w-14" style={{ backgroundImage: `url(${contact.image})` }}></div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#0d1b19] text-base font-medium">{contact.name}</p>
                  <p className="text-[#4c9a8d] text-sm">{contact.role} • {contact.mutuals} mutual{contact.mutuals !== 1 ? "s" : ""}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-sm text-[#4c9a8d] py-4">Nenhum contacto encontrado</p>
        )}
      </main>
    </div>
  );
}
