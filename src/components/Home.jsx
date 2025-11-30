import { forwardRef } from "react";

const Home = forwardRef(({ formdata, items }, ref) => {
  const data = formdata || {};
  const it = items || [];

  const grandTotal = it.reduce((sum, i) => sum + (i.total || 0), 0);

  return (
    <div className="w-full flex justify-center mt-10 px-3">
      <div
        ref={ref}
        className="w-full max-w-3xl bg-gray-900 text-white shadow-2xl rounded-xl p-8 border border-gray-700"
      >
        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-700 pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">TAX INVOICE</h1>
            <p className="text-gray-400 text-sm mt-1">Amazon Style Invoice</p>
          </div>
          <div className="text-right text-sm mt-3 md:mt-0">
            <p className="text-gray-400 font-semibold">Invoice No:</p>
            <p className="text-white font-medium">
              {data.invoiceNumber || "INV-001"}
            </p>
            <p className="text-gray-400 font-semibold mt-2">Date:</p>
            <p className="text-white font-medium">
              {data.date || new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-400 font-semibold mt-2">Time:</p>
            <p className="text-white font-medium">
              {data.time || new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* ---------------- BILL TO & SHIP TO ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-700 pb-6 mb-6">
          {/* BILL TO */}
          <div>
            <h2 className="text-lg font-bold text-gray-400 mb-2">Bill To</h2>
            <p className="text-white font-semibold">
              {data.firstName} {data.lastName}
            </p>
            <p className="text-gray-300">{data.address}</p>
            <p className="text-gray-300">
              {data.city}, {data.state} - {data.zip}
            </p>
            <p className="text-gray-300">{data.country}</p>
            <p className="text-gray-300">Email: {data.email}</p>
          </div>

          {/* SHIP TO */}
          <div>
            <h2 className="text-lg font-bold text-gray-400 mb-2">Ship To</h2>
            <p className="text-white font-semibold">{data.shipName || "N/A"}</p>
            <p className="text-gray-300">{data.shipAddress || ""}</p>
            <p className="text-gray-300">
              {data.shipCity || ""}
              {data.shipState ? `, ${data.shipState}` : ""}{" "}
              {data.shipZip ? `- ${data.shipZip}` : ""}
            </p>
            <p className="text-gray-300">{data.shipCountry || ""}</p>
            <p className="text-gray-300">{data.shipEmail || ""}</p>
          </div>
        </div>

        {/* ---------------- ITEMS TABLE ---------------- */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-400 mb-3">Order Items</h2>
          <table className="w-full text-left border-collapse shadow-md">
            <thead>
              <tr className="bg-gray-800 text-gray-400">
                <th className="py-2 px-3">Item</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {it.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-2 px-3">{item.name}</td>
                  <td className="py-2 px-3">{item.qty}</td>
                  <td className="py-2 px-3">₹ {item.price}</td>
                  <td className="py-2 px-3 text-right font-semibold">
                    ₹ {item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------------- TOTAL SECTION ---------------- */}
        <div className="flex justify-end">
          <div className="w-64 border border-gray-700 rounded-md shadow-md">
            <div className="flex justify-between px-4 py-2 border-b border-gray-600">
              <span className="text-gray-300 font-semibold">Subtotal</span>
              <span className="text-white">₹ {grandTotal}</span>
            </div>
            <div className="flex justify-between px-4 py-2 border-b border-gray-600">
              <span className="text-gray-300 font-semibold">Tax (18%)</span>
              <span className="text-white">
                ₹ {(grandTotal * 0.18).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between px-4 py-2 bg-gray-800 font-bold text-white text-lg">
              <span>Grand Total</span>
              <span>₹ {(grandTotal * 1.18).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;
