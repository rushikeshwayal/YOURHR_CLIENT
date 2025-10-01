import React, { useState, useEffect } from "react";
import axios from "axios";
import ChannelList from "./ChannelList";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import MediaViewerModal from "./MediaViewerModal";
import { useAuth } from "../Authentication/components/firebase/firebase";

export default function Community() {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [mediaToView, setMediaToView] = useState(null);
    const { currentUser } = useAuth();

    // Hardcoded admin token (Rushikesh's account)
    const ADMIN_ACCESS_TOKEN = ""; // Replace with real token

    const currentUserEmail = currentUser?.email || "user@example.com";

    // Fetch channels
    useEffect(() => {
        axios.get("http://localhost:8000/community/channels")
            .then(res => {
                setChannels(res.data);
                if (res.data.length > 0) setSelectedChannel(res.data[0]);
            });
    }, []);

    // Fetch messages when channel changes
    useEffect(() => {
        if (selectedChannel) {
            axios.get(`http://localhost:8000/community/channels/${selectedChannel.id}/messages`)
                .then(res => setMessages(res.data));
        }
    }, [selectedChannel]);

    const handleMessageSent = newMessage => setMessages(prev => [...prev, newMessage]);
    const handleViewMedia = (url, type) => setMediaToView({ url, type });

    return (
        <>
            {/* Top Navigation Bar */}
            <header className="w-full h-16 bg-gradient-to-r from-blue-700 to-blue-500 flex items-center px-8 shadow-md z-10">
                <div className="flex items-center gap-3">
                    <img src="/logo192.png" alt="YourHR Logo" className="h-10 w-10 rounded-full shadow" />
                    <span className="text-2xl font-bold text-white tracking-wide">YourHR Community</span>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <span className="text-white/80 text-sm">Welcome, <span className="font-semibold">{currentUserEmail}</span></span>
                </div>
            </header>

            <div className="flex h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
                {/* Sidebar */}
                <ChannelList channels={channels} selected={selectedChannel} onSelect={setSelectedChannel} />

                {/* Main Chat Area */}
                <div className="flex flex-col flex-1 relative">
                    {/* Channel Header */}
                    {selectedChannel && (
                        <div className="h-20 px-8 flex items-center border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm z-10">
                            <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
                                <span className="text-blue-400">#</span>{selectedChannel.name}
                            </h2>
                            <span className="ml-4 text-gray-400 text-sm">{selectedChannel.description}</span>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {selectedChannel ? (
                            <>
                                <MessageList messages={messages} currentUserEmail={currentUserEmail} onViewMedia={handleViewMedia} />
                                <MessageForm
                                    channelId={selectedChannel.id}
                                    onMessageSent={handleMessageSent}
                                    accessToken={ADMIN_ACCESS_TOKEN} // pass admin token here
                                    currentUserEmail={currentUserEmail}
                                />
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                                Select a channel to start chatting.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Media Modal */}
            <MediaViewerModal media={mediaToView} onClose={() => setMediaToView(null)} />
        </>
    );
}
