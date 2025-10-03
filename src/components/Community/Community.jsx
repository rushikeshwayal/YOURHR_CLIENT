import React, { useState, useEffect } from "react";
import axios from "axios";
import ChannelList from "./ChannelList";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import MediaViewerModal from "./MediaViewerModal";
import { useAuth } from "../Authentication/components/firebase/firebase";
import NavToHomeBlack from "../NavBar/NavToHomeBlack";
import { FiHash } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

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
            <div className="relative z-40">
                <NavToHomeBlack />
            </div>

            {/* Layout */}
            <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans">

                {/* Sidebar */}
                <ChannelList
                    channels={channels}
                    selected={selectedChannel}
                    onSelect={setSelectedChannel}
                />

                {/* Main Chat Area */}
                <div className="flex flex-col flex-1 relative z-30">

                    {/* Channel Header */}
                    {selectedChannel && (
                        <div className="h-20 px-8 flex items-center border-b border-slate-200 bg-white/70 backdrop-blur-lg shadow-md rounded-b-2xl z-10">
                            <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2 drop-shadow">
                                <FiHash className="text-blue-500 text-2xl" />
                                {selectedChannel.name}
                            </h2>
                            <span className="ml-4 text-gray-500 text-sm italic">
                                {selectedChannel.description}
                            </span>
                        </div>
                    )}

                    {/* Messages Area */}
                    <div className="flex-1 flex flex-col overflow-hidden bg-white/70 rounded-2xl shadow-lg m-4 border border-slate-200 backdrop-blur-sm">
                        {selectedChannel ? (
                            <>
                                <MessageList
                                    messages={messages}
                                    currentUserEmail={currentUserEmail}
                                    onViewMedia={handleViewMedia}
                                />
                                <MessageForm
                                    channelId={selectedChannel.id}
                                    onMessageSent={handleMessageSent}
                                    accessToken={ADMIN_ACCESS_TOKEN}
                                    currentUserEmail={currentUserEmail}
                                />
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
                                <BsChatDots className="text-5xl text-blue-400" />
                                <p className="text-lg font-medium">Select a channel to start chatting</p>
                                <p className="text-sm text-gray-400">Join the discussion and share your thoughts</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Media Modal */}
            {mediaToView && (
                <MediaViewerModal media={mediaToView} onClose={() => setMediaToView(null)} />
            )}
        </>
    );
}
