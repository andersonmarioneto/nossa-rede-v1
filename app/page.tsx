"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  avatarUrl: string | null;
}

interface Message {
  content: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  title: string | null;
  participants: { user: User }[];
  messages: Message[];
}

export default function Home() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Get current user to know who "I" am
        const meData = await apiFetch("/auth/me");
        setCurrentUser(meData.data.user);

        // 2. Get conversations
        const convData = await apiFetch("/conversations");
        setConversations(convData.data.conversations);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        router.push("/login");
      }
    }
    loadData();
  }, [router]);

  if (loading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fcfb]">
      <header className="sticky top-0 bg-[#f8fcfb] z-50 border-b border-[#e7f3f1] shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <img src="/img/private-chat.png" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-[#0d1b19] text-xl font-bold tracking-[-0.015em] text-center flex-1">Mensagens</h1>
          <Link href="/contacts" title="Nova conversa" aria-label="Nova conversa" className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-[#0d1b19] hover:bg-[#13ecc8]/10 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto divide-y divide-[#e7f3f1] pb-19">
        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center h-full">
            <div className="bg-[#e7f3f1] p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#4c9a8d]">
                <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.678 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-[#0d1b19] font-bold text-lg mb-2">Sem conversas</h3>
            <p className="text-[#4c9a8d] mb-6 max-w-xs">
              Você ainda não iniciou nenhuma conversa. Encontre pessoas para conversar!
            </p>
            <Link
              href="/contacts"
              className="bg-[#13ecc8] hover:bg-[#0fd1b1] text-[#0d1b19] px-6 py-3 rounded-full font-bold transition-colors shadow-sm"
            >
              Encontrar Contactos
            </Link>
          </div>
        )}
        {conversations.map((chat) => {
          // Find the other participant
          const other = chat.participants.find((p) => p.user.id !== currentUser?.id)?.user;
          // If no other (e.g. self chat?) or title exists, use title or fallback
          const name = chat.title || other?.name || "Desconhecido";
          const avatar = other?.avatarUrl || "https://via.placeholder.com/150";
          const lastMsg = chat.messages[0];
          const time = lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";

          return (
            <Link key={chat.id} href={`/chat?id=${chat.id}`} className="flex items-center gap-4 px-4 py-2 min-h-[72px] justify-between hover:bg-[#eefaf8] transition-colors">
              <div className="flex items-center gap-4">
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14"
                  style={{ backgroundImage: `url("${avatar}")` }}
                  role="img"
                  aria-label={`Foto de perfil de ${name}`}
                ></div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <p className="text-[#0d1b19] text-base font-medium truncate">{name}</p>
                  <p className="text-[#4c9a8d] text-sm line-clamp-2">{lastMsg?.content || "Sem mensagens"}</p>
                </div>
              </div>
              <p className="text-[#4c9a8d] text-sm">{time}</p>
            </Link>
          );
        })}
      </main>
    </div>
  );
}
