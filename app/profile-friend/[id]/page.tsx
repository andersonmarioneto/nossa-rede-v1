"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface User {
  id: number;
  name: string;
  username: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  bio: string | null;
  status: string | null;
  socialLinks: string | null;
}

export default function ProfileFriend() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      apiFetch(`/users/${params.id}`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((data: any) => {
          setUser(data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao carregar perfil:", err);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  if (!user) return <div className="flex h-screen items-center justify-center">Usuário não encontrado.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fcfb] font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f8fcfb]/80 backdrop-blur-md border-b border-[#e7f3f1] shadow-sm">
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
        {/* CAPA E FOTO */}
        <section className="relative mb-16">
          <div
            className="h-48 w-full bg-cover bg-center bg-gray-200"
            style={{
              backgroundImage: user.coverUrl ? `url("${user.coverUrl}")` : undefined,
              backgroundColor: user.coverUrl ? undefined : '#e7f3f1'
            }}
          ></div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div
              className="h-32 w-32 rounded-full bg-center bg-cover border-4 border-white shadow-md"
              style={{
                backgroundImage: `url("${user.avatarUrl || "https://via.placeholder.com/150"}")`,
              }}
              role="img"
              aria-label={`Foto de perfil de ${user.name}`}
            ></div>
          </div>
        </section>

        {/* INFO PESSOAL */}
        <section className="flex flex-col items-center px-6 text-center">
          <h2 className="text-[22px] font-bold text-[#0d1b19]">{user.name}</h2>
          <p className="text-base text-[#4c9a8d]">@{user.username || "sem_usuario"}</p>
          {user.status && (
            <div className="mt-2 px-3 py-1 bg-[#eefaf7] rounded-full">
              <p className="text-sm text-[#0d1b19] font-medium">
                {user.status}
              </p>
            </div>
          )}
        </section>

        {/* SOBRE */}
        <section aria-labelledby="sobre" className="mt-6">
          <h2
            id="sobre"
            className="px-6 pb-2 text-lg font-bold text-[#0d1b19]"
          >
            Sobre
          </h2>
          <p className="px-6 text-base text-[#0d1b19] leading-relaxed opacity-80">
            {user.bio || "Sem biografia."}
          </p>
        </section>

        {/* AÇÕES */}
        <section className="flex justify-center gap-4 mt-8 px-6">
          <button className="flex items-center gap-3 px-6 py-3 bg-[#13ecc8] text-[#0d1b19] rounded-full font-bold hover:bg-[#0ddcb0] transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
            </svg>
            Ligar
          </button>
          <Link href={`/chat?userId=${user.id}`}> {/* aqui, o href deve levar ao chat privado de modo a mandar uma sms para a pessoa do perfil em questão */}
            <button className="flex items-center gap-3 px-6 py-3 border-2 border-[#13ecc8] text-[#0d1b19] rounded-full font-bold hover:bg-[#e7f3f1] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
              Mensagem
            </button>
          </Link>
        </section>

        <section className="mt-8 px-4">
          {/* ESPAÇAMENTO */}
        </section>
      </main>
    </div>
  );
}
