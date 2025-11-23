"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import EditProfileModal from "@/app/components/EditProfileModal";

interface User {
  id: number;
  name: string;
  email: string;
  username: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  bio: string | null;
  status: string | null;
  socialLinks: string | null;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    apiFetch("/auth/me")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        setUser(data.data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  }

  function handleUpdateUser(updatedUser: User) {
    setUser(updatedUser);
  }

  if (loading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fcfb] font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f8fcfb]/80 backdrop-blur-md border-b border-[#e7f3f1] shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Image
            src="/img/private-chat.png"
            alt="Logotipo do aplicativo"
            width={32}
            height={32}
          />
          <h1 className="text-center flex-1 text-xl font-bold tracking-tight text-[#0d1b19]">
            Meu Perfil
          </h1>
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            title="Editar perfil"
            aria-label="Editar perfil"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-[#0d1b19] hover:bg-[#13ecc8]/10 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
          </button>
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

        {/* BIO */}
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

          <h2
            id="sobre"
            className="px-6 pb-2 text-lg font-bold text-[#0d1b19]"
          >
            Estado
          </h2>
          <p className="px-6 text-base text-[#0d1b19] leading-relaxed opacity-80">
            {user.status || "Sem estado."}
          </p>
        </section>

        {/* SAIR */}
        <section className="mt-8 mb-8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-6 min-h-[56] hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="text-red-600 size-6">
                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
              <span className="text-base font-medium text-red-600">
                Terminar Sessão
              </span>
            </div>
          </button>
        </section>

        <button className="w-full flex items-center justify-between px-6 min-h-[56] hover:bg-red-50 transition-colors group"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
        </svg>
          Deletar a minha conta
        </button>
      </main>

      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
}
