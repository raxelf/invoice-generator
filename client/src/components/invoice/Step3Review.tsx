import { useInvoiceStore } from "@/store/useInvoiceStore";
import { ArrowLeft, Send, Building2, Package } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import toast from "react-hot-toast";
import { getUser } from "@/utils/getUser";
import { useRouter } from "next/router";

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
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
      toast.success("Invoice successfully submitted!");
      reset();
      router.push("/"); // Back to start of wizard
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      const msg = err.response?.data?.message || "Failed to submit invoice";
      toast.error(msg);
    },
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Building2 size={16} /> Shipment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Sender
                </span>
                <span className="text-lg font-bold text-gray-900 leading-tight">
                  {senderName}
                </span>
                <p className="text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">
                  {senderAddress}
                </p>
              </div>
              <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-gray-50 pt-6 md:pt-0 md:pl-8">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Receiver
                </span>
                <span className="text-lg font-bold text-gray-900 leading-tight">
                  {receiverName}
                </span>
                <p className="text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">
                  {receiverAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 pb-0">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Package size={16} /> Items
              </h3>
            </div>
            <div className="overflow-x-auto mt-4 px-8 pb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="py-4 font-semibold">Item</th>
                    <th className="py-4 px-4 text-center font-semibold">QTY</th>
                    <th className="py-4 px-4 text-right font-semibold">
                      Price
                    </th>
                    <th className="py-4 text-right font-semibold">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="py-4 pr-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">
                            {item.code}
                          </span>
                          <span className="text-gray-500">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-medium text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-500">
                        {formatPrice(item.price)}
                      </td>
                      <td className="py-4 text-right font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sticky top-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
              Summary
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-2xl font-black text-primary">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Submitting...
                  </span>
                ) : (
                  <>
                    Submit Invoice <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-100 flex items-center gap-2 transition-all"
        >
          <ArrowLeft size={18} /> Back to Items
        </button>
      </div>
    </div>
  );
};

export default Step3Review;
