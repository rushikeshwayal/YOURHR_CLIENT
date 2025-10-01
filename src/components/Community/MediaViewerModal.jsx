import React from "react";
import { CloseIcon, DownloadIcon } from "./Icons";

export default function MediaViewerModal({ media, onClose }) {
    if (!media) return null;
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="relative max-w-4xl max-h-[80vh] bg-black rounded-lg" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-10 right-0 text-white text-2xl font-bold"><CloseIcon /></button>
                {media.type === 'image' && <img src={media.url} alt="Media content" className="max-w-full max-h-[80vh] rounded-lg object-contain" />}
                {media.type === 'video' && <video src={media.url} controls autoPlay className="max-w-full max-h-[80vh] rounded-lg" />}
                <a href={media.url} download className="absolute bottom-4 right-4 flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <DownloadIcon /> Download
                </a>
            </div>
        </div>
    );
}
