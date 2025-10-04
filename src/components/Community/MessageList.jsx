import React, { useEffect, useRef } from "react";
import Attachment from "./Attachment";

export default function MessageList({ messages, currentUserEmail, onViewMedia }) {
    const messagesEndRef = useRef(null);

    // Auto-scroll when new messages arrive
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
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-gray-500 text-lg">No messages yet.</p>
                    <p className="text-gray-400 text-sm mt-2">Start the conversation!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.user_email === currentUserEmail;
                    const showAvatar =
                        !isCurrentUser &&
                        (index === 0 || messages[index - 1].user_email !== msg.user_email);

                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-2 ${isCurrentUser ? "justify-end" : "justify-start"
                                } animate-fadeIn`}
                        >
                            {/* Left avatar */}
                            {!isCurrentUser && showAvatar && (
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        msg.user_email
                                    )}&background=random`}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full shadow-sm"
                                />
                            )}

                            {/* Message bubble */}
                            <div
                                className={`max-w-xs sm:max-w-md flex flex-col ${isCurrentUser ? "items-end text-right" : "items-start text-left"
                                    }`}
                            >
                                {!isCurrentUser && showAvatar && (
                                    <div className="text-xs font-semibold text-gray-600 mb-1 ml-1">
                                        {msg.user_email.split("@")[0]}
                                    </div>
                                )}

                                <div
                                    className={`inline-block px-4 py-2 rounded-2xl text-sm shadow ${isCurrentUser
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-white text-gray-800 rounded-bl-none"
                                        }`}
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
                                        className={`text-[11px] mt-1 ${isCurrentUser ? "text-blue-100" : "text-gray-400"
                                            }`}
                                    >
                                        {formatTime(msg.created_at)}
                                    </div>
                                </div>
                            </div>

                            {/* Right avatar (for your messages) */}
                            {isCurrentUser && showAvatar && (
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        msg.user_email
                                    )}&background=4F46E5&color=fff`}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full shadow-sm"
                                />
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
