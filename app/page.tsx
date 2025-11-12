import Link from "next/link";

const chats = [
  { name: "Sofia Mendes", lastMessage: "Vou chegar em 5 minutos", time: "10:30" },
  { name: "Grupo de Trabalho", lastMessage: "Obrigado!", time: "10:20" },
  { name: "Ricardo Silva", lastMessage: "Estou a caminho", time: "10:15" },
  { name: "Ana Pereira", lastMessage: "Sim, claro", time: "10:00" },
  { name: "Pedro Costa", lastMessage: "Estou livre hoje à noite", time: "09:45" },
  { name: "Marta Rodrigues", lastMessage: "Obrigado pela ajuda", time: "09:30" },
  { name: "João Santos", lastMessage: "Estou a caminho", time: "09:15" },
  { name: "Isabel Ferreira", lastMessage: "Sim, claro", time: "09:00" },
  
  { name: "Pedro Costa", lastMessage: "Estou livre hoje à noite", time: "09:45" },
  { name: "Marta Rodrigues", lastMessage: "Obrigado pela ajuda", time: "09:30" },
  { name: "João", lastMessage: "Estou a caminho", time: "09:15" },
  { name: "Isabel Ferreira", lastMessage: "Sim, claro", time: "09:00" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fcfb]">
      <header className="sticky top-0 bg-[#f8fcfb] z-50 border-b border-[#e7f3f1] shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <img src="/img/private-chat.png" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-[#0d1b19] text-xl font-bold tracking-[-0.015em] text-center flex-1">Mensagens</h1>
          <Link href="/contacts"  title="Nova conversa" aria-label="Nova conversa" className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-[#0d1b19] hover:bg-[#13ecc8]/10 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto divide-y divide-[#e7f3f1] pb-19">
        {chats.map((chat, index) => (
          <Link key={index} href="/chat" className="flex items-center gap-4 px-4 py-2 min-h-[72px] justify-between hover:bg-[#eefaf8] transition-colors">
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14"
                style={{ backgroundImage: `url("https://via.placeholder.com/150")` }}
                role="img"
                aria-label={`Foto de perfil de ${chat.name}`}
              ></div>
              <div className="flex flex-col justify-center overflow-hidden">
                <p className="text-[#0d1b19] text-base font-medium truncate">{chat.name}</p>
                <p className="text-[#4c9a8d] text-sm line-clamp-2">{chat.lastMessage}</p>
              </div>
            </div>
            <p className="text-[#4c9a8d] text-sm">{chat.time}</p>
          </Link>
        ))}
      </main>
    </div>
  );
}
