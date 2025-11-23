"use client";
import { useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    username: string | null;
    bio: string | null;
    avatarUrl: string | null;
    coverUrl: string | null;
    status: string | null;
    socialLinks: string | null; // Mantido na interface por compatibilidade, mas não usado no form
}

interface EditProfileModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (updatedUser: User) => void;
}

export default function EditProfileModal({ user, isOpen, onClose, onUpdate }: EditProfileModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        bio: "",
        status: "",
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                username: user.username || "",
                bio: user.bio || "",
                status: user.status || "",
            });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
        if (e.target.files && e.target.files[0]) {
            if (type === 'avatar') setAvatarFile(e.target.files[0]);
            if (type === 'cover') setCoverFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("username", formData.username);
        data.append("bio", formData.bio);
        data.append("status", formData.status);

        if (avatarFile) {
            data.append("avatar", avatarFile);
        }
        if (coverFile) {
            data.append("cover", coverFile);
        }

        try {
            const token = localStorage.getItem("token");
            // Nota: Para FormData, usamos fetch direto pois apiFetch configura Content-Type: application/json automaticamente
            const res = await fetch("http://localhost:4000/auth/me", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                    // Não definir Content-Type, o browser define com boundary para FormData
                },
                body: data,
            });

            const json = await res.json();

            if (res.ok && json.user) {
                onUpdate(json.user);
                onClose();
            } else {
                alert(json.error || "Erro ao atualizar");
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            alert("Erro ao atualizar perfil.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-[#0d1b19]">Editar Perfil</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Avatar e Capa */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'avatar')}
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#eefaf7] file:text-[#0d1b19] hover:file:bg-[#dcf5ef]"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Foto de Capa</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'cover')}
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#eefaf7] file:text-[#0d1b19] hover:file:bg-[#dcf5ef]"
                        />
                    </div>

                    {/* Informações Básicas */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#13ecc8] focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#13ecc8] focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#13ecc8] focus:border-transparent outline-none transition-all"
                            placeholder="Ex: Disponível, Ocupado..."
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#13ecc8] focus:border-transparent outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2.5 bg-[#13ecc8] text-[#0d1b19] rounded-xl font-bold hover:bg-[#0ddcb0] transition-all disabled:opacity-50"
                        >
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
