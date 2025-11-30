import React, { useState } from "react";
import countries from "../store/State";
import indianCities from "../store/Indiastate";
import indianStates from "../store/indianStates";
import { X, Trash2Icon, Plus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceForm = ({
  setShow,
  setFormdata: saveForm,
  setItems: saveItems,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    date: today,
    time: currentTime,
    shipName: "",
    shipAddress: "",
    shipCity: "",
    shipState: "",
    shipZip: "",
  });

  const [items, setItems] = useState([]);

  const removeAllData = () => {
    setFormdata({
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      date: today,
      time: currentTime,
      shipName: "",
      shipAddress: "",
      shipCity: "",
      shipState: "",
      shipZip: "",
    });
    setItems([]);
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "", qty: 1, price: 0, total: 0 },
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    if (field === "qty" || field === "price")
      value = value === "" ? 0 : Number(value);
    updated[index][field] = value;
    updated[index].total =
      (Number(updated[index].qty) || 0) * (Number(updated[index].price) || 0);
    setItems(updated);
  };

  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const grandTotal = items.reduce((sum, item) => sum + (item.total || 0), 0);

  const handleSubmit = () => {
    if (!formdata.firstName) return toast.error("Enter customer name!");
    toast.success("Invoice Saved!");
    saveForm(formdata);
    saveItems(items);
    setShow(false);
    removeAllData();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-6 sm:p-8 bg-gray-900 rounded-2xl shadow-2xl text-white mt-10">
      {/* Close */}
      <button
        onClick={() => setShow(false)}
        className="absolute top-4 cursor-pointer right-4 p-2 rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">New Invoice</h2>
        <p className="text-gray-400">Enter invoice details below</p>
      </div>

      {/* Billing Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <Input
          label="First Name"
          value={formdata.firstName}
          onChange={(e) =>
            setFormdata({ ...formdata, firstName: e.target.value })
          }
        />
        <Input
          label="Last Name"
          value={formdata.lastName}
          onChange={(e) =>
            setFormdata({ ...formdata, lastName: e.target.value })
          }
        />
        <Input
          label="Email"
          value={formdata.email}
          onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
        />
        <Select
          label="Country"
          options={countries}
          value={formdata.country}
          onChange={(e) =>
            setFormdata({ ...formdata, country: e.target.value })
          }
        />
        <Input
          label="Street Address"
          className="md:col-span-2"
          value={formdata.address}
          onChange={(e) =>
            setFormdata({ ...formdata, address: e.target.value })
          }
        />
        <Select
          label="City"
          options={indianCities}
          value={formdata.city}
          onChange={(e) => setFormdata({ ...formdata, city: e.target.value })}
        />
        <Select
          label="State"
          options={indianStates}
          value={formdata.state}
          onChange={(e) => setFormdata({ ...formdata, state: e.target.value })}
        />
        <Input
          label="ZIP Code"
          value={formdata.zip}
          onChange={(e) => setFormdata({ ...formdata, zip: e.target.value })}
        />
        <Input
          label="Date"
          type="date"
          value={formdata.date}
          onChange={(e) => setFormdata({ ...formdata, date: e.target.value })}
        />
        <Input
          label="Time"
          type="time"
          value={formdata.time}
          onChange={(e) => setFormdata({ ...formdata, time: e.target.value })}
        />
      </div>

      {/* Ship To Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Ship To
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Input
            label="Recipient Name"
            value={formdata.shipName}
            onChange={(e) =>
              setFormdata({ ...formdata, shipName: e.target.value })
            }
          />
          <Input
            label="Address"
            className="md:col-span-2"
            value={formdata.shipAddress}
            onChange={(e) =>
              setFormdata({ ...formdata, shipAddress: e.target.value })
            }
          />
          <Select
            label="City"
            options={indianCities}
            value={formdata.shipCity}
            onChange={(e) =>
              setFormdata({ ...formdata, shipCity: e.target.value })
            }
          />
          <Select
            label="State"
            options={indianStates}
            value={formdata.shipState}
            onChange={(e) =>
              setFormdata({ ...formdata, shipState: e.target.value })
            }
          />
          <Input
            label="ZIP Code"
            value={formdata.shipZip}
            onChange={(e) =>
              setFormdata({ ...formdata, shipZip: e.target.value })
            }
          />
        </div>
      </div>
      

      {/* Items */}
      <h2 className="text-xl  mt-10 mb-3 text-2xl font-black">Items</h2>
        {/* Grand Total */}
      <div className="mt-6 bg-gray-800 p-4 rounded-xl flex justify-between text-xl font-bold border border-gray-700">
        <span>Grand Total</span>
        <span>₹ {grandTotal}</span>
      </div>
      <br />
      <div className="space-y-4">
        {items.map((item, idx) => (
          <ItemRow
            key={item.id}
            item={item}
            index={idx}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
        >
          <Plus size={18} /> Add Item
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition"
        >
          Save & Close
        </button>
      </div>

    

      <ToastContainer />
    </div>
  );
};

/* Input Component */
const Input = ({ label, className = "", ...props }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className="font-medium">{label}</label>
    <input
      className="p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-400 transition"
      {...props}
    />
  </div>
);

/* Select Component */
const Select = ({ label, options, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="font-medium">{label}</label>
    <select
      className="p-2 rounded-lg bg-gray-700 border border-gray-600 text-white cursor-pointer focus:outline-none focus:border-blue-400 transition"
      {...props}
    >
      <option value="">Select</option>
      {options.map((o, idx) => (
        <option key={idx} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

/* Item Row Component */
const ItemRow = ({ item, index, updateItem, removeItem }) => (
  <div className="flex flex-col sm:flex-row items-center gap-3 bg-gray-800 p-4 rounded-xl border border-gray-700">
    <input
      type="text"
      placeholder="Item Name"
      className="input w-full sm:w-28"
      value={item.name}
      onChange={(e) => updateItem(index, "name", e.target.value)}
    />
    <input
      type="number"
      placeholder="Qty"
      className="input w-full sm:w-20"
      value={item.qty}
      onChange={(e) => updateItem(index, "qty", e.target.value)}
    />
    <input
      type="number"
      placeholder="Price"
      className="input w-full sm:w-24"
      value={item.price}
      onChange={(e) => updateItem(index, "price", e.target.value)}
    />
    <div className="text-lg font-semibold w-20 text-center">₹ {item.total}</div>
    <button onClick={() => removeItem(index)}>
      <Trash2Icon className="text-red-500 w-7 h-7 cursor-pointer hover:scale-110 transition" />
    </button>
  </div>
);

export default InvoiceForm;
