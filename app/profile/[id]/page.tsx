"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    name: string;
    username: string | null;
    avatarUrl: string | null;
    bio: string | null;
}

export default function PublicProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                // Fetch public profile
                const res = await apiFetch(`/users/${id}`);
                setUser(res.data.user);

                // Fetch my profile to check if it's me
                try {
                    const meRes = await apiFetch("/auth/me");
                    setCurrentUser(meRes.data.user);
                } catch {
                    // Ignore if not logged in or error
                }

                setLoading(false);
            } catch (e) {
                // If user not found or error
                router.push("/contacts");
            }
        }
        loadData();
    }, [id, router]);

    async function handleStartChat() {
        if (!user) return;
        try {
            const res = await apiFetch("/conversations", {
                method: "POST",
                body: JSON.stringify({ participantId: user.id }),
            });
            const conversationId = res.data.conversation.id;
            router.push(`/chat?id=${conversationId}`);
        } catch (e) {
            alert("Erro ao iniciar conversa");
        }
    }

    if (loading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;
    if (!user) return null;

    const isMe = currentUser?.id === user.id;

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fcfb] font-sans">
            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-[#f8fcfb] border-b border-[#e7f3f1] shadow-sm">
                <div className="container mx-auto flex items-center justify-between p-4">
                    {/* Botão de voltar */}
                    <button
                        onClick={() => router.back()}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-[#0d1b19] hover:bg-[#13ecc8]/10 transition-all"
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
                    </button>

                    <h1 className="flex-1 text-center text-xl font-bold tracking-tight text-[#0d1b19]">
                        Perfil
                    </h1>

                    {/* Espaço à direita */}
                    <div className="w-10" />
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto pb-20">
                {/* FOTO DE PERFIL */}
                <section className="flex flex-col items-center p-6">
                    <div
                        className="h-32 w-32 rounded-full bg-center bg-cover"
                        style={{
                            backgroundImage: `url("${user.avatarUrl || "https://via.placeholder.com/150"}")`,
                        }}
                        role="img"
                        aria-label={`Foto de perfil de ${user.name}`}
                    ></div>
                    <div className="mt-4 text-center">
                        <p className="text-[22px] font-bold text-[#0d1b19]">{user.name}</p>
                        <p className="text-base text-[#4c9a8d]">{user.username ? `@${user.username}` : ""}</p>
                    </div>
                </section>

                {/* SOBRE */}
                <section aria-labelledby="sobre">
                    <h2
                        id="sobre"
                        className="px-4 pt-4 pb-2 text-lg font-bold text-[#0d1b19]"
                    >
                        Sobre
                    </h2>
                    <p className="px-4 pb-3 pt-1 text-base text-[#0d1b19] leading-normal">
                        {user.bio || "Sem biografia."}
                    </p>
                </section>

                {/* AÇÕES */}
                {!isMe && (
                    <section className="flex justify-center gap-4 mt-6 px-4">
                        <button
                            onClick={handleStartChat}
                            className="flex-1 px-6 py-2 border border-[#13ecc8] bg-[#13ecc8] text-[#0d1b19] rounded-full font-medium hover:bg-[#0fd1b1] transition-all"
                        >
                            Mensagem
                        </button>
                    </section>
                )}

                {isMe && (
                    <section className="flex justify-center gap-4 mt-6 px-4">
                        <Link href="/profile" className="flex-1 text-center px-6 py-2 border border-[#13ecc8] text-[#0d1b19] rounded-full font-medium hover:bg-[#e7f3f1] transition-all">
                            Editar Meu Perfil
                        </Link>
                    </section>
                )}

                <section className="mt-8 px-4">
                    {/* ESPAÇAMENTO */}
                </section>
            </main>
        </div>
    );
}
