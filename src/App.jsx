import React, { useState, useRef } from "react";
import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import Home from "./components/Home";

function App() {
  const [show, setShow] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [items, setItems] = useState([]);
  const invoicesRef = useRef();

  // Print using window.print
  const handlePrint = () => {
    if (invoicesRef.current) {
      const printContents = invoicesRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // reload to restore React state
    }
  };

  const editbtn =()=>{
    setFormdata(formdata);
    setItems(items)
    setShow(true)
  }

  return (
    <div className="bg-slate-950 min-h-screen w-full">
      <Header setShow={setShow} handlePrint={handlePrint} editbtn={editbtn}/>

      {show && (
        <InvoiceForm
          setShow={setShow}
          setFormdata={setFormdata}
          setItems={setItems}
        />
      )}

      {!show && <Home ref={invoicesRef} formdata={formdata} items={items} />}
    </div>
  );
}

export default App;
