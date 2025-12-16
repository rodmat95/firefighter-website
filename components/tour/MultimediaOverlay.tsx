"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import Image from "next/image";

interface MultimediaOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        title: string;
        description: string;
        url?: string;
        type: "image" | "video";
    } | null;
}

export function MultimediaOverlay({ isOpen, onClose, data }: MultimediaOverlayProps) {
    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[80vh] md:max-h-[70vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors border border-white/10"
                        >
                            <X size={20} />
                        </button>

                        {/* Media Section */}
                        <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center h-64 md:h-auto">
                            {data.type === "image" && data.url ? (
                                <div className="relative w-full h-full min-h-[300px]">
                                    <Image
                                        src={data.url}
                                        alt={data.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 66vw"
                                    />
                                </div>
                            ) : data.type === "video" && data.url ? (
                                // Check if it's a YouTube URL
                                (data.url.includes("youtube.com") || data.url.includes("youtu.be")) ? (
                                    <div className="w-full h-full relative">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${data.url.includes("v=")
                                                    ? data.url.split("v=")[1].split("&")[0]
                                                    : data.url.split("/").pop()
                                                }?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=1&showinfo=0`}
                                            title={data.title}
                                            className="absolute inset-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                        <video
                                            src={data.url}
                                            controls
                                            autoPlay
                                            className="w-full h-full max-h-full object-contain"
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="text-gray-500 flex flex-col items-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                        <Play className="text-white/20" />
                                    </div>
                                    <span>No media available</span>
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-zinc-900/50">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                                {data.title}
                            </h2>
                            <div className="w-12 h-1 bg-primary mb-6 rounded-full" />
                            <div className="prose prose-invert prose-sm max-w-none overflow-y-auto pr-2 custom-scrollbar">
                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {data.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-6">
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-white/5"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}