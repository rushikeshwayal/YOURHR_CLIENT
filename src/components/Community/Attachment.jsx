import React from "react";
import { ImageIcon, VideoIcon, DownloadIcon } from "./Icons";

export default function Attachment({ msg, onViewMedia, currentUserEmail }) {
    const baseStyle = "mt-2 flex items-center p-3 rounded-lg w-full text-left transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md";
    const isCurrentUser = msg.user_email === currentUserEmail;
    const sentStyle = "bg-blue-500 hover:bg-blue-600 text-white";
    const receivedStyle = "bg-gray-200 hover:bg-gray-300 text-gray-800";

    if (msg.image_url) {
        return (
            <button
                onClick={() => onViewMedia(msg.image_url, 'image')}
                className={`${baseStyle} ${isCurrentUser ? sentStyle : receivedStyle}`}
            >
                <ImageIcon />
                <span>View Image</span>
            </button>
        );
    }

    if (msg.video_url) {
        return (
            <button
                onClick={() => onViewMedia(msg.video_url, 'video')}
                className={`${baseStyle} ${isCurrentUser ? sentStyle : receivedStyle}`}
            >
                <VideoIcon />
                <span>Play Video</span>
            </button>
        );
    }

    if (msg.file_url) {
        return (
            <a
                href={msg.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseStyle} ${isCurrentUser ? sentStyle : receivedStyle}`}
            >
                <DownloadIcon />
                <span>Download File</span>
            </a>
        );
    }

    return null;
}