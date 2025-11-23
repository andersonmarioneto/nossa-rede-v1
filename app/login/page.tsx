"use client";
import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    try {
      const result = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password: pwd }),
      });

      localStorage.setItem("token", result.data.token);
      window.location.href = "/profile";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErr(error?.error || error?.message || "Erro no login");
    }
  }

  return (
    <div className="relative flex h-screen w-full flex-col bg-[#f8fcfb] justify-between group/design-root overflow-hidden">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md -mt-16">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-[#0d1b19] text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
              Nossa<span className="text-[#4c9a8d]">.Rede</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="w-full">
                <label className="flex flex-col w-full">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="form-input w-full rounded-xl text-[#0d1b19] focus:outline-none focus:ring-2 focus:ring-[#13ecc8] border border-[#cfe7e3] bg-[#f8fcfb] h-14 placeholder:text-[#4c9a8d] p-[15px] text-base font-normal leading-normal transition-all duration-200"
                  />
                </label>
              </div>

              <div className="w-full">
                <label className="flex flex-col w-full">
                  <input
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="Senha"
                    type="password"
                    className="form-input w-full rounded-xl text-[#0d1b19] focus:outline-none focus:ring-2 focus:ring-[#13ecc8] border border-[#cfe7e3] bg-[#f8fcfb] h-14 placeholder:text-[#4c9a8d] p-[15px] text-base font-normal leading-normal transition-all duration-200"
                  />
                </label>
              </div>

              {err && <p className="text-red-600 text-sm font-medium">{err}</p>}

              <div className="w-full mt-6">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#13ecc8] hover:bg-[#0fd1b1] text-[#0d1b19] text-base font-bold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#13ecc8] focus:ring-offset-2"
                >
                  Entrar
                </button>
              </div>

              <div className="text-center mt-4">
                <Link
                  href="/register"
                  className="text-[#4c9a8d] hover:text-[#000011] text-sm font-medium transition-colors duration-200"
                >
                  Não tem uma conta? Cadastre-se
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
