import Image from "next/image";
import Link from "next/link";

export default function ProfileFriend() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fcfb] font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f8fcfb] border-b border-[#e7f3f1] shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Botão de voltar */}
          <Link
            href="/chat-privado"
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
          </Link>

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
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsPROY_3q1GG14cKFLFKfCRZwSxzqJjh82aAjbjIj8lrTvvfN3YsR519NBC8H75zRYgTn3R52OZcWE0ahDu30ySVeCylANEHs8BzM6y5IurHMbDxozyDP-OazT3S0d953oSdt8QLxY1Sv9K0kxwOJvtXsGAhkzPVXq0kQUQEs1_uEreXwd3fbLNi4FRKJcWaMmU1jzAgEUvxvjENwgoR_fuZzGJwxIHLpCq0OypGQr8oyY50WzS-PcguipF7CqhlzBJ6znte0saMG3")`,
            }}
            role="img"
            aria-label="Foto de perfil de Lucas"
          ></div>
          <div className="mt-4 text-center">
            <p className="text-[22px] font-bold text-[#0d1b19]">Lucas Silva</p>
            <p className="text-base text-[#4c9a8d]">@lucas_silva</p>
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
            Lucas é apaixonado por tecnologia, esportes e fotografia. Compartilha
            suas experiências e hobbies com seus amigos na rede.
          </p>
        </section>

        {/* ESTATÍSTICAS */}
        <section className="px-4 mt-4">
          <div className="flex justify-around bg-white rounded-xl p-4 shadow-sm">
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#0d1b19]">250</span>
              <span className="text-[#4c9a8d] text-sm">Estralas</span>
            </div>
          </div>
        </section>

        {/* AÇÕES */}
        <section className="flex justify-center gap-4 mt-6 px-4">
          <button className="flex items-center gap-3 px-6 py-2 bg-[#13ecc8] text-[#0d1b19] rounded-full font-medium hover:bg-[#0ddcb0] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
            </svg>
            Ligar
          </button>
          <Link href="/chat">
            <button className="flex-1 px-6 py-2 border border-[#13ecc8] text-[#0d1b19] rounded-full font-medium hover:bg-[#e7f3f1] transition-all">
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
