import React, { useState, useRef } from "react";
import axios from "axios";
import { PaperclipIcon, SendIcon } from "./Icons";

export default function MessageForm({ channelId, onMessageSent, accessToken, currentUserEmail }) {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const fileInputRef = useRef(null);

    // Detect file type based on MIME type
    const getFileFieldName = (file) => {
        if (!file) return null;
        const type = file.type.toLowerCase();

        console.log("File type detected:", type);

        if (type.startsWith('image/')) return 'image';
        if (type.startsWith('video/')) return 'video';
        return 'file'; // Everything else goes as 'file'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() && !file) {
            console.log("No text or file to send");
            return;
        }

        setIsSending(true);
        const formData = new FormData();
        formData.append("user_email", currentUserEmail);
        formData.append("access_token", accessToken);

        if (text.trim()) {
            formData.append("text", text.trim());
        }

        if (file) {
            const fieldName = getFileFieldName(file);
            console.log("Appending file to FormData:", {
                fieldName,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type
            });
            formData.append(fieldName, file);
        }

        // Debug: Log all FormData entries
        console.log("=== FormData Contents ===");
        for (let pair of formData.entries()) {
            console.log(pair[0], ':', pair[1]);
        }

        try {
            console.log("Sending POST request to:", `http://localhost:8000/community/channels/${channelId}/messages`);

            const res = await axios.post(
                `http://localhost:8000/community/channels/${channelId}/messages`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Response received:", res.data);

            // Check if file URL was returned
            if (file) {
                console.log("File upload result:", {
                    image_url: res.data.image_url,
                    video_url: res.data.video_url,
                    file_url: res.data.file_url
                });
            }

            onMessageSent(res.data);
            setText("");
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = null;
        } catch (err) {
            console.error("=== Error Details ===");
            console.error("Error:", err);
            console.error("Response data:", err.response?.data);
            console.error("Response status:", err.response?.status);
            alert("Failed to send message: " + (err.response?.data?.detail || err.message));
        } finally {
            setIsSending(false);
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            console.log("File selected:", {
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type
            });

            // Check file size (max 50MB)
            if (selectedFile.size > 50 * 1024 * 1024) {
                alert("File size must be less than 50MB");
                return;
            }
            setFile(selectedFile);
        }
    };

    const removeFile = () => {
        console.log("File removed");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const getFileIcon = (file) => {
        if (!file) return "📎";
        const type = file.type.toLowerCase();
        if (type.startsWith('image/')) return "🖼️";
        if (type.startsWith('video/')) return "🎥";
        if (type.includes('pdf')) return "📄";
        return "📎";
    };

    return (
        <div className="p-4 bg-white border-t border-gray-200 shadow-lg">
            {file && (
                <div className="mb-3 flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-2xl">{getFileIcon(file)}</span>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-700 truncate">{file.name}</div>
                        <div className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB • {file.type || 'unknown type'}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700 font-bold text-lg px-2"
                    >
                        ×
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSending}
                    className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Attach file"
                >
                    <PaperclipIcon />
                </button>

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={isSending ? "Sending..." : "Type your message..."}
                    disabled={isSending}
                    className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <button
                    type="submit"
                    disabled={(!text.trim() && !file) || isSending}
                    className="p-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md relative"
                    title="Send message"
                >
                    {isSending ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <SendIcon />
                    )}
                </button>
            </form>

            {isSending && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                    {file ? `Uploading ${file.name}...` : "Sending message..."}
                </div>
            )}
        </div>
    );
}