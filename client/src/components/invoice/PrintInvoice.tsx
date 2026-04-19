import React from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { formatPrice } from "@/utils/formatPrice";

const PrintInvoice = () => {
  const { senderName, senderAddress, receiverName, receiverAddress, items } =
    useInvoiceStore();

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const invoiceDate = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Mock invoice number for preview
  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="hidden print:block bg-white">
      <div className="w-[210mm] mx-auto p-[8mm] bg-white text-gray-900 flex flex-col font-sans overflow-hidden">
        {/* Header */}

        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 p-2 rounded text-white font-bold text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-2.235-2.794A1 1 0 0 0 17.063 9.5H15" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter uppercase leading-none">
                Fleet Logistic
              </h1>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-400 leading-relaxed font-medium">
            <p>Terminal 4, Industrial Sector B</p>
            <p>Jakarta, 14430, Indonesia</p>
            <p>+62 811 990 4902</p>
            <p>dispatch@fleet-logistics.id</p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            INVOICE
          </h2>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 grid grid-cols-2 gap-8 p-4 rounded-lg mb-8">
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              Invoice Number
            </span>
            <span className="font-bold text-sm tracking-tight text-gray-900">
              {invoiceNumber}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              Date of Issue
            </span>
            <span className="font-bold text-sm tracking-tight text-gray-900">
              {invoiceDate}
            </span>
          </div>
        </div>

        {/* Parties Section */}
        <div className="grid grid-cols-2 gap-12 mb-8 px-2">
          <div>
            <div className="border-b border-amber-400 w-16 mb-3 pb-0.5">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                Sender
              </span>
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1 leading-tight">
              {senderName}
            </h3>
            <p className="text-[11px] text-gray-500 leading-relaxed whitespace-pre-wrap">
              {senderAddress}
            </p>
          </div>
          <div>
            <div className="border-b border-amber-400 w-16 mb-3 pb-0.5">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                Receiver
              </span>
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1 leading-tight">
              {receiverName}
            </h3>
            <p className="text-[11px] text-gray-500 leading-relaxed whitespace-pre-wrap">
              {receiverAddress}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Description</th>
                <th className="py-3 px-4 text-center font-semibold">
                  Qty
                </th>
                <th className="py-3 px-4 text-right font-semibold">
                  Price (IDR)
                </th>
                <th className="py-3 px-4 text-right font-semibold">
                  Subtotal (IDR)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="text-[11px]">
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 leading-tight">
                        {item.name}
                      </span>
                      <span className="text-gray-400 text-[9px] uppercase font-medium">
                        {item.code}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-gray-700">
                    {item.quantity} Unit
                  </td>
                  <td className="py-3 px-4 text-right text-gray-500 tabular-nums">
                    {formatPrice(item.price).replace("Rp\u00a0", "")}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900 tabular-nums">
                    {formatPrice(item.price * item.quantity).replace(
                      "Rp\u00a0",
                      "",
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="mt-4 flex justify-end px-4">
            <div className="w-64 bg-gray-50 p-3 rounded-lg flex flex-col gap-2">
              <div className="flex justify-between items-center text-[11px] text-gray-500">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold tabular-nums text-gray-900">
                  {formatPrice(calculateTotal()).replace("Rp\u00a0", "")}
                </span>
              </div>
              <div className="border-t border-gray-200 mt-1 pt-2 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">
                  Total Amount
                </span>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-amber-500 uppercase leading-none">
                    IDR
                  </div>
                  <div className="text-lg font-black text-gray-900 tabular-nums leading-none">
                    {formatPrice(calculateTotal()).replace("Rp\u00a0", "")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="mt-6 grid grid-cols-2 gap-12 text-center mb-4 px-12">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-10">
              Authorized Dispatcher
            </span>
            <div className="border-t border-gray-200 w-32 mb-1"></div>
            <span className="font-bold text-gray-900 text-[10px]">
              John Doe
            </span>
            <span className="text-[8px] text-gray-400 font-medium tracking-tight">
              ID: 1234 - Fleet Command
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-10">
              Receiver Confirmation
            </span>
            <div className="border-t border-gray-200 w-32 mb-1"></div>
            <span className="text-[8px] text-gray-400 font-medium italic">
              Sign & Date
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-gray-50 pt-8 mt-auto">
          <p className="text-[8px] text-gray-400 text-center uppercase tracking-[0.2em]">
            Payment Terms: Net 14 Days. Bank Transfer to BCA A/N Fleet
            Logistics: 123456789
          </p>
        </div>
      </div>

      {/* Print Styles Helper */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            print-color-adjust: exact;
            background: white;
          }
          nav,
          button,
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintInvoice;
