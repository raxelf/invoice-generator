import { useInvoiceStore } from "@/store/useInvoiceStore";
import { Truck, MapPin, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Step1Info = () => {
  const {
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    updateBasicInfo,
    setStep,
  } = useInvoiceStore();

  const handleNext = () => {
    if (!senderName || !senderAddress || !receiverName || !receiverAddress) {
      toast.error("Please fill in all fields");
      return;
    }
    setStep(2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8 flex flex-col gap-6 sm:gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Sender Section */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-secondary pb-2 border-b border-gray-100">
            <Truck size={18} className="sm:w-5 sm:h-5" />
            <h3 className="font-bold text-base sm:text-lg">Sender Details</h3>
          </div>


          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Nama Pengirim
            </label>
            <input
              type="text"
              placeholder="Enter sender name"
              value={senderName}
              onChange={(e) => updateBasicInfo({ senderName: e.target.value })}
              className="bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Alamat Pengirim
            </label>
            <textarea
              placeholder="Enter full sender address"
              rows={4}
              value={senderAddress}
              onChange={(e) =>
                updateBasicInfo({ senderAddress: e.target.value })
              }
              className="bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Receiver Section */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-secondary pb-2 border-b border-gray-100">
            <MapPin size={18} className="sm:w-5 sm:h-5" />
            <h3 className="font-bold text-base sm:text-lg">Receiver Details</h3>
          </div>


          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Nama Penerima
            </label>
            <input
              type="text"
              placeholder="Enter receiver name"
              value={receiverName}
              onChange={(e) =>
                updateBasicInfo({ receiverName: e.target.value })
              }
              className="bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Alamat Penerima
            </label>
            <textarea
              placeholder="Enter full receiver address"
              rows={4}
              value={receiverAddress}
              onChange={(e) =>
                updateBasicInfo({ receiverAddress: e.target.value })
              }
              className="bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-400 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleNext}
          className="bg-primary text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-secondary transition-colors"
        >
          Next Step <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Step1Info;
