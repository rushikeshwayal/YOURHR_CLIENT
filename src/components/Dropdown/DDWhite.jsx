import DropDownpng from '../../assets/icons8-sort-down-30.png'
import { useState } from 'react';
function DropDownBlack() {

    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative inline-block text-white"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                className="w-44 flex justify-between items-center px-4 py-2 rounded-lg transition duration-300 hover:bg-white hover:text-black"
            >
                Academy
                <img className="h-5 ml-2" src={DropDownpng} alt="Dropdown Icon" />
            </button>

            {/* Dropdown menu */}
            {open && (
                <ul
                    className="absolute left-0 w-44 mt-0 text-white   pt-1 z-10"
                >
                    <li className="rounded-lg px-4 py-2 hover:bg-white hover:text-black transition duration-300">
                        <a className="block text-right" href="/learnings">Learnings</a>
                    </li>
                    <li className="rounded-lg px-4 py-2 hover:bg-white hover:text-black transition duration-300">
                        <a className="block text-right" href="/connect">Connect</a>
                    </li>
                    <li className="rounded-lg px-4 py-2 hover:bg-white hover:text-black transition duration-300">
                        <a className="block text-right" href="/community">Community</a>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default DropDownBlack;
