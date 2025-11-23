"use client";
import { useEffect, useState } from "react";
import { apiFetchAuth } from "@/lib/api";

interface User {
  id: number;
  name: string;
  username: string | null;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<User[]>([]);

  useEffect(() => {
    async function load() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await apiFetchAuth("/users");
      setContacts(data.users);
    }
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Contactos</h2>

      {contacts.map((u) => (
        <div key={u.id} className="flex items-center justify-between mb-3 border-b pb-2">
          <div>
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-500">@{u.username}</p>
          </div>

          <a
            href={`/chat/new/${u.id}`}
            className="px-3 py-1 bg-teal-500 text-white rounded-md"
          >
            Conversar
          </a>
        </div>
      ))}
    </div>
  );
}
