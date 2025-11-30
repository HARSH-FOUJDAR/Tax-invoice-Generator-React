import { PlusIcon, PrinterIcon } from "lucide-react";

const Header = ({ setShow, handlePrint, editbtn }) => {
  return (
    <header className="bg-slate-900 w-full h-20 flex items-center justify-between px-8 md:px-16 shadow-md">
      {/* Logo / Brand */}
      <div className="text-white font-bold text-xl md:text-2xl tracking-wide">
        Invoice Builder
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Edit Button */}
        <button
          onClick={editbtn}
          className="flex cursor-pointer items-center gap-2 bg-green-600 hover:bg-green-500 transition-colors px-5 py-2 rounded-lg text-white font-semibold shadow-md"
        >
          Edit
        </button>
        {/* print Button */}
        <button
          onClick={handlePrint}
          className="flex cursor-pointer items-center gap-2 bg-green-600 hover:bg-green-500 transition-colors px-5 py-2 rounded-lg text-white font-semibold shadow-md"
        >
          <PrinterIcon className="w-5 h-5" />
          Print / Save
        </button>

        {/* New Invoice Button */}
        <button
          onClick={() => setShow((prev) => !prev)}
          className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors px-5 py-2 rounded-lg text-white font-semibold shadow-md"
        >
          <PlusIcon className="w-5 h-5" />
          New Invoice
        </button>
      </div>
    </header>
  );
};

export default Header;
