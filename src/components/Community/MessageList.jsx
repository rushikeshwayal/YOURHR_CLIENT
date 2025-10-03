import React, { useEffect, useRef } from "react";
import { FiUsers } from "react-icons/fi";  // group icon
import Attachment from "./Attachment";

export default function MessageList({ messages, currentUserEmail, onViewMedia }) {
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        if (isToday) {
            return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        }
        return (
            date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
            " " +
            date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        );
    };

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-5 mb-4 shadow-inner">
                        <FiUsers size={48} />
                    </div>
                    <p className="text-gray-600 text-lg font-medium">No messages yet</p>
                    <p className="text-gray-400 text-sm mt-1">Be the first to say something!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="space-y-5 max-w-4xl mx-auto">
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.user_email === currentUserEmail;
                    const showAvatar =
                        !isCurrentUser &&
                        (index === 0 || messages[index - 1].user_email !== msg.user_email);

                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-3 ${isCurrentUser ? "justify-end" : ""} animate-fadeIn`}
                        >
                            {/* Left avatar (other user) */}
                            {!isCurrentUser && (
                                <div className="w-10 h-10 flex-shrink-0">
                                    {showAvatar && (
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                msg.user_email
                                            )}&background=random&size=128`}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                                        />
                                    )}
                                </div>
                            )}

                            {/* Message bubble */}
                            <div
                                className={`flex flex-col max-w-lg ${isCurrentUser ? "items-end" : "items-start"
                                    }`}
                            >
                                {showAvatar && !isCurrentUser && (
                                    <div className="text-xs font-semibold text-gray-600 mb-1 ml-2 flex items-center gap-1">
                                        <FiUsers className="text-gray-400" size={12} />
                                        {msg.user_email.split("@")[0]}
                                    </div>
                                )}

                                <div
                                    className={`relative group ${isCurrentUser
                                            ? "bg-gradient-to-tr from-blue-600 to-blue-500 text-white rounded-2xl rounded-br-md"
                                            : "bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-md"
                                        } p-3 transition-all duration-200 hover:shadow-lg`}
                                >
                                    {msg.text && (
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                            {msg.text}
                                        </p>
                                    )}

                                    <Attachment
                                        msg={msg}
                                        onViewMedia={onViewMedia}
                                        currentUserEmail={currentUserEmail}
                                    />

                                    <div
                                        className={`text-xs mt-1 ${isCurrentUser ? "text-blue-100" : "text-gray-400"
                                            }`}
                                    >
                                        {formatTime(msg.created_at)}
                                    </div>
                                </div>
                            </div>

                            {/* Right avatar (current user) */}
                            {isCurrentUser && (
                                <div className="w-10 h-10 flex-shrink-0">
                                    {showAvatar && (
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                msg.user_email
                                            )}&background=4F46E5&color=fff&size=128`}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
