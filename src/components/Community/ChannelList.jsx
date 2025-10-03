import React, { useState } from "react";
import axios from "axios";

// --- Helper Icon Components ---
const PlusIcon = ({ className = "w-4 h-4" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

// --- Channel Avatar ---
const ChannelAvatar = ({ name }) => {
    const getHash = (input) => {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return Math.abs(hash);
    };

    const colors = [
        "bg-red-500", "bg-green-500", "bg-blue-500",
        "bg-indigo-500", "bg-purple-500", "bg-pink-500",
        "bg-yellow-500", "bg-teal-500"
    ];

    const colorIndex = getHash(name) % colors.length;
    const bgColor = colors[colorIndex];
    const initial = name.charAt(0).toUpperCase();

    return (
        <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center mr-3 flex-shrink-0`}>
            <span className="text-white font-bold text-sm">{initial}</span>
        </div>
    );
};

// --- Create Channel Modal ---
const CreateChannelModal = ({ isOpen, onClose, onCreateChannel }) => {
    const [channelName, setChannelName] = useState("");

    const handleCreate = async () => {
        if (!channelName.trim()) return;
        await onCreateChannel(channelName);
        setChannelName("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") handleCreate();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white text-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-md animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold mb-4">Create a New Channel</h3>
                <p className="text-gray-500 text-sm mb-6">
                    Channels are where your community communicates. They’re best when organized around a topic.
                </p>
                <div>
                    <label
                        htmlFor="channel-name"
                        className="text-sm font-semibold text-gray-700 mb-2 block"
                    >
                        Channel Name
                    </label>
                    <input
                        id="channel-name"
                        type="text"
                        placeholder="e.g., product-feedback"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                    />
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={!channelName.trim()}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        Create Channel
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main ChannelList ---
export default function ChannelList({ channels, selected, onSelect }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateChannel = async (newChannelName) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/community/channels",
                new URLSearchParams({ name: newChannelName }),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            const channel = res.data;
            onSelect(channel); // auto-select new channel
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to create channel", err);
        }
    };

    return (
        <>
            <aside className="w-80 bg-white text-gray-800 h-screen flex flex-col border-r border-slate-200">
                {/* Header */}
                <header className="p-4 border-b border-slate-200 flex items-center shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800">Community Channels</h2>
                </header>

                {/* Channel List */}
                <div className="flex-1 overflow-y-auto p-3">
                    <ul className="space-y-1">
                        {channels.map((channel) => (
                            <li
                                key={channel.id}
                                onClick={() => onSelect(channel)}
                                className={`flex items-center cursor-pointer p-2 rounded-lg font-medium transition-all duration-200 group ${selected?.id === channel.id
                                    ? "bg-blue-100 text-blue-800 font-semibold"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                                    }`}
                            >
                                <ChannelAvatar name={channel.name} />
                                <span className="truncate">{channel.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Create New Channel Button */}
                <div className="p-4 border-t border-slate-200 bg-white shadow-inner">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full flex items-center justify-center border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="mr-2 text-slate-500 h-5" />
                        Create Channel
                    </button>
                </div>
            </aside>

            {/* Modal */}
            <CreateChannelModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateChannel={handleCreateChannel}
            />

            {/* Animation styles */}
            <style>{`
                @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.2s ease-out forwards;
                }
            `}</style>
        </>
    );
}
