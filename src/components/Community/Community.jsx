import React, { useState, useEffect } from "react";
import axios from "axios";
import ChannelList from "./ChannelList";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import MediaViewerModal from "./MediaViewerModal";
import { useAuth } from "../Authentication/components/firebase/firebase";
import NavToHomeBlack from "../NavBar/NavToHomeBlack";
import { HiMiniUserGroup } from "react-icons/hi2";
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
                        <div className="h-24 px-8 flex items-center justify-between border-b border-slate-200 
                  bg-gradient-to-r from-blue-600/80 to-blue-400/70 
                  backdrop-blur-md shadow-md z-10">

                            {/* Left side: Icon + channel info */}
                            <div className="flex items-center gap-4">
                                <div className="bg-white/90 p-2 rounded-xl shadow">
                                    <HiMiniUserGroup className="text-blue-600 text-3xl" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold text-white drop-shadow-sm">
                                        {selectedChannel.name}
                                    </h2>
                                    <span className="text-sm text-blue-100 italic truncate max-w-[300px]">
                                        {selectedChannel.description || "No description available"}
                                    </span>
                                </div>
                            </div>

                            {/* Right side: Placeholder for members */}
                            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-white text-sm font-medium">24 members online</span>
                            </div>
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
