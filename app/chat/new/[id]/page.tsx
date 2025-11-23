"use client";
import { useEffect, use } from "react";
import { apiFetchAuth } from "@/lib/api";

export default function NewChat({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    useEffect(() => {
        async function startChat() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const me: any = await apiFetchAuth("/auth/me");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await apiFetchAuth("/conversations/private", {
                method: "POST",
                body: JSON.stringify({
                    userId1: me.data.user.id, // Adjusted to match API response structure
                    userId2: Number(id)
                }),
            });

            // redirecionar para chat existente ou recém criado
            window.location.href = `/chat?id=${response.conversation.id}`; // Adjusted to match existing chat route
        }

        startChat();
    }, [id]);

    return (
        <p className="p-4">A iniciar conversa…</p>
    );
}
