"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetchAuth } from "@/lib/api";

interface User {
  id: number;
  name: string;
  username: string | null;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await apiFetchAuth("/users");
      setContacts(data.users);
    }
    load();
  }, []);

  const filteredContacts = contacts.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Contactos</h2>

      {/* Barra de Pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar por username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-[#13ecc8] outline-none"
        />
      </div>

      {filteredContacts.map((u) => (
        <div key={u.id} className="flex items-center justify-between mb-3 border-b pb-2">
          <Link href={`/profile-friend/${u.id}`} className="flex items-center gap-3 flex-1">
            <div
              className="h-10 w-10 rounded-full bg-gray-300 bg-cover bg-center"
              style={{ backgroundImage: `url("${(u as any).avatarUrl || "https://via.placeholder.com/150"}")` }}
            ></div>
            <div>
              <p className="font-semibold text-[#0d1b19]">{u.name}</p>
              <p className="text-sm text-gray-500">@{u.username}</p>
            </div>
          </Link>

          <Link
            href={`/chat?userId=${u.id}`}
            className="px-3 py-1 bg-[#13ecc8] text-[#0d1b19] font-bold rounded-md text-sm hover:bg-[#0ddcb0] transition-colors"
          >
            Conversar
          </Link>
        </div>
      ))}

      {filteredContacts.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Nenhum contato encontrado.</p>
      )}
    </div>
  );
}
