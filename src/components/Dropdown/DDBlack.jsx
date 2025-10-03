import { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
function DropDownBlack() {

    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative inline-block text-black"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                className="z-50 w-44 flex justify-between items-center px-4 py-2 rounded-lg transition duration-300 hover:bg-black hover:text-white"
            >
                Academy
                {/* <img className="h-5 ml-2" src={DropDownpng} alt="Dropdown Icon" />
                 */}
                <IoMdArrowDropdown />
            </button>

            {/* Dropdown menu */}
            {open && (
                <ul
                    className="absolute left-0 w-44 mt-0 text-black pt-1 z-10"
                >
                    <li className="rounded-lg px-4 py-2 hover:bg-black hover:text-white transition duration-300">
                        <a className="block text-right" href="/learnings">Learnings</a>
                    </li>
                    <li className="rounded-lg px-4 py-2 hover:bg-black hover:text-white transition duration-300">
                        <a className="block text-right" href="/connect">Work With Coach</a>
                    </li>
                    <li className="rounded-lg px-4 py-2 hover:bg-black hover:text-white transition duration-300">
                        <a className="block text-right" href="/community">Community</a>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default DropDownBlack;
