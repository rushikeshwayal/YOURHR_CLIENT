import React from "react";
import { HashIcon } from "./Icons";

export default function ChannelList({ channels, selected, onSelect }) {
    return (
        <aside className="w-72 bg-slate-50 border-r border-slate-200 h-screen flex flex-col">
            <header className="p-4 border-b border-slate-200 flex items-center">
                <HashIcon />
                <h2 className="ml-2 text-xl font-bold text-slate-800">Community Channels</h2>
            </header>
            <div className="flex-1 overflow-y-auto p-2">
                <ul className="space-y-1">
                    {channels.map(channel => (
                        <li
                            key={channel.id}
                            onClick={() => onSelect(channel)}
                            className={`flex items-center cursor-pointer p-2.5 rounded-lg font-medium transition-colors duration-150 ${selected?.id === channel.id
                                ? "bg-blue-100 text-blue-700 font-semibold"
                                : "text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            <span className="mr-2 text-slate-400">#</span>
                            {channel.name}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
