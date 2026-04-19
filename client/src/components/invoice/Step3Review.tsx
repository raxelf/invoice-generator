import { useInvoiceStore } from "@/store/useInvoiceStore";
import { ArrowLeft, Send, Building2, Printer } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import toast from "react-hot-toast";
import { getUser } from "@/utils/getUser";
import { useRouter } from "next/router";
import { formatPrice } from "@/utils/formatPrice";
import PrintInvoice from "./PrintInvoice";

const Step3Review = () => {
  const router = useRouter();
  const {
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    items,
    setStep,
    reset,
  } = useInvoiceStore();

  const user = getUser();
  const role = user?.role || "kerani";

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  

  const mutation = useMutation({
    mutationFn: async () => {
      // Transform payload based on role
      const payloadItems = items.map((item) => {
        if (role === "kerani") {
          // Requirement: If role = Kerani, remove price and subtotal from JSON payload
          return {
            item_code: item.code,
            quantity: item.quantity,
          };
        }
        // Admin: Send everything
        return {
          item_code: item.code,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        };
      });

      const payload = {
        sender_name: senderName,
        sender_address: senderAddress,
        receiver_name: receiverName,
        receiver_address: receiverAddress,
        items: payloadItems,
      };

      return axios.post("/invoices", payload);
    },
    onSuccess: () => {
      toast.success("Invoice successfully created!");
      reset();
      router.push("/"); // Back to start of wizard
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      const msg = err.response?.data?.message || "Failed to create invoice";
      toast.error(msg);
    },
  });

  return (
    <>
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full print:hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8">
            <h3 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
              <Building2 size={16} /> Shipment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Sender
                </span>
                <span className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  {senderName}
                </span>
                <p className="text-xs sm:text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">
                  {senderAddress}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2 border-t md:border-t-0 md:border-l border-gray-50 pt-6 md:pt-0 md:pl-8">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Receiver
                </span>
                <span className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  {receiverName}
                </span>
                <p className="text-xs sm:text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">
                  {receiverAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-8 pb-0">
              <h3 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                Items
              </h3>
            </div>

            <div className="overflow-x-auto -mx-1 sm:mx-0 mt-4 px-4 sm:px-8 pb-4 sm:pb-8">
              <div className="min-w-[400px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-50 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="py-3 sm:py-4 font-semibold uppercase">Item</th>
                      <th className="py-3 sm:py-4 px-4 text-center font-semibold">QTY</th>
                      <th className="py-3 sm:py-4 px-4 text-right font-semibold">
                        Price
                      </th>
                      <th className="py-3 sm:py-4 text-right font-semibold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {items.map((item) => (
                      <tr key={item.id} className="text-xs sm:text-sm">
                        <td className="py-3 sm:py-4 pr-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">
                              {item.code}
                            </span>
                            <span className="text-gray-500 text-[10px] sm:text-xs">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-4 text-center font-medium text-gray-700">
                          {item.quantity}
                        </td>
                        <td className="py-3 sm:py-4 px-4 text-right text-gray-500">
                          {formatPrice(item.price)}
                        </td>
                        <td className="py-3 sm:py-4 text-right font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-8">
            <h3 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6">
              Summary
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                  Total Amount
                </span>
                <span className="text-xl sm:text-2xl font-black text-primary">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>


            <div className="mt-6 sm:mt-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  const originalTitle = document.title;
                  const datePart = new Date().toISOString().slice(0, 10);
                  document.title = `Invoice-${datePart}`;
                  window.print();
                  document.title = originalTitle;
                }}
                className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95 text-sm sm:text-base border-dashed"
              >
                Print Invoice <Printer size={18} />
              </button>

              <button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
                className="w-full bg-primary text-white py-3.5 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 text-sm sm:text-base"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Creating...
                  </span>
                ) : (
                  <>
                    Create Invoice <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="flex justify-between items-center mt-4 px-2 sm:px-4 gap-4">
        <button
          onClick={() => setStep(2)}
          className="flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-100 flex items-center justify-center gap-2 transition-all text-xs sm:text-sm"
        >
          <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" /> Back to Items
        </button>
      </div>

      </div>
      <PrintInvoice />
    </>
  );
};

export default Step3Review;
