
import DropDownpng from '../../assets/icons8-sort-down-30.png'
function DropDownBlack() {

  function DropdownIn() {
    const DropDown = document.getElementById('DropDown');
    DropDown.style.display = 'block';
  }

  function DropdownOut() {
    const DropDown = document.getElementById('DropDown');
    DropDown.style.display = 'none';
  }



  return (
    <div>
      <div className="relative text-black  ">
        <button
          className=" rounded-lg w-44 flex justify-between  px-5 py-2 items-center transition duration-300 hover:bg-black hover:text-white"
          onMouseOver={DropdownIn}
          onMouseOut={DropdownOut}
        >
          YourHR.Academy

          <img className="h-5 ml-3" src={DropDownpng} alt="Dropdown Icon" />
        </button>

        {/* Dropdown menu */}
        <ul
          className="hidden absolute  left-0 w-52 text-black shadow-lg pt-2 z-10"
          id="DropDown"
          onMouseOver={DropdownIn}
          onMouseOut={DropdownOut}
        >
          <li className="hover:bg-black hover:text-white transition duration-300 rounded-lg">
            <a className="block px-3 py-2 text-end mr-5" href="/learnings">Learnings</a>
          </li>
          <li className="hover:bg-black hover:text-white transition duration-300 rounded-lg">
            <a className="block px-3 py-2 text-end mr-5" href="/workwithcoach">Work With A Coach</a>
          </li>
          <li className="hover:bg-black hover:text-white transition duration-300 rounded-lg">
            <a className="block px-3 py-2 text-end mr-5" href="/sessions" >Sessions</a>
          </li>
          <li className="hover:bg-black hover:text-white transition duration-300 rounded-lg">
            <a className="block px-3 py-2 text-end mr-5" href="/getbadges">Get Badges</a>
          </li>
          <li className="hover:bg-black hover:text-white transition duration-300 rounded-lg">
            <a className="block px-3 py-2 text-end mr-5" href="/community" >Community</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default DropDownBlack;