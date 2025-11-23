"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getSocket } from "@/lib/socket";

interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
  sender: {
    name: string;
    avatarUrl: string | null;
  };
}

interface Conversation {
  title: string | null;
  participants: {
    user: {
      id: number;
      name: string;
    };
  }[];
}

function ChatContent() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("id");
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<{ id: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const userIdParam = searchParams.get("userId");

  useEffect(() => {
    async function loadData() {
      try {
        const meData = await apiFetch("/auth/me");
        const myId = meData.data.user.id;
        setCurrentUser(meData.data.user);

        let targetConversationId = conversationId;

        // Se veio userId, tenta achar conversa existente
        if (!targetConversationId && userIdParam) {
          const allConvs = await apiFetch("/conversations");
          const existing = allConvs.data.conversations.find((c: any) =>
            c.participants.some((p: any) => p.user.id === Number(userIdParam))
          );

          if (existing) {
            targetConversationId = existing.id.toString();
            // Atualiza URL sem reload
            window.history.replaceState(null, "", `/chat?id=${existing.id}`);
          } else {
            // Caso não exista conversa, vamos buscar dados do usuário alvo para mostrar no header
            // e preparar para criar a conversa na primeira mensagem
            const userRes = await apiFetch(`/users/${userIdParam}`);
            setConversation({
              title: userRes.user.name,
              participants: [{ user: userRes.user }]
            } as any);
            setLoading(false);
            return; // Sai, pois não tem mensagens para carregar ainda
          }
        }

        if (targetConversationId) {
          const [msgData, convoData] = await Promise.all([
            apiFetch(`/messages/${targetConversationId}`),
            apiFetch(`/conversations/${targetConversationId}`)
          ]);

          setMessages(msgData.data.messages);
          setConversation(convoData.data.conversation);
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
        // router.push("/"); // Evitar redirect forçado em erro para debug
        setLoading(false);
      }
    }
    loadData();
  }, [conversationId, userIdParam, router]);

  useEffect(() => {
    if (!conversationId) return;

    const socket = getSocket();
    socket.connect();
    socket.emit("join_conversation", conversationId);

    const handleNewMessage = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.disconnect();
    };
  }, [conversationId]);

  const otherParticipant = conversation?.participants.find(p => p.user.id !== currentUser?.id)?.user;
  const chatName = conversation?.title || otherParticipant?.name || "Chat";

  async function handleSendMessage() {
    if (!newMessage.trim()) return;

    try {
      let finalConversationId = conversationId;

      // Se não tem ID de conversa mas tem userIdParam, cria a conversa primeiro
      if (!finalConversationId && userIdParam) {
        const res = await apiFetch("/conversations", {
          method: "POST",
          body: JSON.stringify({ participantId: Number(userIdParam) })
        });
        finalConversationId = res.data.conversation.id;
        // Atualiza URL
        router.replace(`/chat?id=${finalConversationId}`);
      }

      if (!finalConversationId) return;

      await apiFetch("/messages", {
        method: "POST",
        body: JSON.stringify({
          conversationId: finalConversationId,
          content: newMessage,
          type: "text"
        })
      });

      setNewMessage("");
      // Refresh messages
      const msgData = await apiFetch(`/messages/${finalConversationId}`);
      setMessages(msgData.data.messages);
    } catch (e) {
      alert("Erro ao enviar mensagem");
    }
  }

  if (loading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;

  return (
    <div
      className="relative flex h-screen w-full flex-col bg-[#f8fcfb] justify-between overflow-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f8fcfb] p-4 pb-2 border-b border-[#e7f3f1]">
        <div className="flex items-center justify-between">
          <Link
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
          </Link>
          {otherParticipant ? (
            <Link href={`/profile-friend/${otherParticipant.id}`} className="flex-1 text-center hover:opacity-80">
              <h2 className="text-[#0d1b19] text-lg font-bold leading-tight tracking-[-0.015em]">
                {chatName}
              </h2>
            </Link>
          ) : (
            <h2 className="text-[#0d1b19] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
              {chatName}
            </h2>
          )}
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser?.id;
          return (
            <div key={msg.id} className={`flex items-end gap-3 ${isMe ? "justify-end" : ""}`}>
              {!isMe && (
                <Link href={`/profile-friend/${msg.senderId}`}>
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundImage: `url("${msg.sender.avatarUrl || "https://via.placeholder.com/150"}")` }}
                  ></div>
                </Link>
              )}
              <div className={`flex flex-1 flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
                <p className={`text-[#4c9a8d] text-[13px] font-normal ${isMe ? "text-right" : ""}`}>
                  {isMe ? "Você" : (
                    <Link href={`/profile-friend/${msg.senderId}`} className="hover:underline">
                      {msg.sender.name}
                    </Link>
                  )}
                </p>
                <p className={`text-base font-normal rounded-xl px-4 py-3 text-[#0d1b19] ${isMe ? "bg-[#13ecc8]" : "bg-[#e7f3f1]"}`}>
                  {msg.content}
                </p>
              </div>
              {isMe && (
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                  style={{ backgroundImage: `url("${currentUser?.id ? "https://via.placeholder.com/150" : ""}")` }} // TODO: Usar avatar real do currentUser se disponível no contexto
                ></div>
              )}
            </div>
          );
        })}
      </main>

      {/* Footer / input */}
      <div className="p-4 bg-[#f8fcfb]">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Escrever mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 rounded-xl px-4 py-2 text-[#0d1b19] bg-[#e7f3f1] focus:outline-none focus:ring-0 text-base"
          />
          <button
            onClick={handleSendMessage}
            className="rounded-full bg-[#13ecc8] px-4 py-2 text-[#0d1b19] font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Carregando chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}
