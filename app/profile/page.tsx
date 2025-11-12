import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fcfb] font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f8fcfb] border-b border-[#e7f3f1] shadow-sm">
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
        {/* PERFIL */}
        <section className="flex flex-col items-center p-6">
          <div
            className="h-30 w-30 rounded-full bg-center bg-cover"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJWLvXzvU5Q71FuImT7KOyziWYu_am2BrJQQFSWLLhmPyAEyM7o0LhmzDpN3Tk2XjI-vjdfLCnVObZPbw4GbhCQ1Zbx9SfuJ-wHhfeid4TcU3eyofr_f11HZOUIiSaBncyzMJvAsAhLe1Sa9j2sOUuHMk3__voKi-4EtdWkp3H1ksPVjDEJeUJksXr1Y7YUA7TOmHG9z5VSZyhYejcGwI9ykbvB6SmE9-KqrZrXydn7YhZDy1yLt3lFpr59KWBHJ5JIczCj__trZNG")`,
            }}
            role="img"
            aria-label="Foto de perfil de Mário"
          ></div>
          <div className="mt-4 text-center">
            <p className="text-[22px] font-bold text-[#0d1b19]">Mário</p>
            <p className="text-base text-[#4c9a8d]">mario@gmail.com</p>
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
            Um entusiasta da tecnologia e amante da natureza. Sempre em busca de
            novas aventuras e aprendizados.
          </p>
        </section>

        {/* CONFIGURAÇÕES */}
        <section aria-labelledby="configuracoes">
          <h2
            id="configuracoes"
            className="px-4 pt-4 pb-2 text-lg font-bold text-[#0d1b19]"
          >
            Configurações
          </h2>
          <ul className="divide-y divide-[#e7f3f1]">
            {["Notificações", "Privacidade", "Ajuda"].map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 min-h-[56] hover:bg-[#eefaf7] transition-colors"
              >
                <span className="text-base text-[#0d1b19]">{item}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                </svg>
              </li>
            ))}
          </ul>
        </section>

        {/* SAIR */}
        <section className="mt-8">
          <Link
            href="/login"
            className="flex items-center justify-between px-4 min-h-[56] hover:bg-red-50 transition-colors group"
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
          </Link>
        </section>
      </main>
    </div>
  );
}
