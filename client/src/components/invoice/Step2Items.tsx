import { useInvoiceStore } from "@/store/useInvoiceStore";
import { ScanLine, Trash2, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import toast from "react-hot-toast";
import { ItemResult } from "@/types/invoice";
import { formatPrice } from "@/utils/formatPrice";

const Step2Items = () => {
  const { items, addItem, removeItem, updateQuantity, setStep } =
    useInvoiceStore();
  const [searchCode, setSearchCode] = useState("");
  const [debouncedCode, setDebouncedCode] = useState("");
  const [searchResults, setSearchResults] = useState<ItemResult[]>([]);

  // Debounce logic: update debouncedCode after 500ms of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCode(searchCode);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchCode]);

  // Query to fetch item data
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["items", debouncedCode],
    queryFn: async ({ signal }) => {
      if (!debouncedCode) return null;
      const res = await axios.get(`/items?code=${debouncedCode}`, { signal });
      return res.data.data;
    },
    enabled: !!debouncedCode,
  });

  // Update search results when query data changes
  useEffect(() => {
    if (data) {
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  }, [data]);

  const handleAddItem = (item: ItemResult) => {
    addItem({
      id: item.ID,
      code: item.Code,
      name: item.Name,
      price: item.Price,
      quantity: 1,
    });
    setSearchCode("");
    setDebouncedCode("");
    setSearchResults([]);
    toast.success(`Added: ${item.Name}`);
  };

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast.success(`Removed: ${name}`, { icon: "🗑️" });
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleNext = () => {
    if (items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }
    setStep(3);
  };


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8 flex flex-col gap-6 sm:gap-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Shipment Details
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm">Enter item codes to add them.</p>
      </div>

      {/* Search Section */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl flex flex-col gap-2 sm:gap-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
          Item Code
        </label>
        <div className="relative group">
          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <ScanLine size={18} className="sm:w-5 sm:h-5" />
          </div>
          <input
            type="text"
            placeholder="Search code..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
          />

          {(isLoading || isFetching) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <Loader2 size={20} className="text-primary animate-spin" />
            </div>
          )}

          {/* Search Results Dropdown */}
          {debouncedCode && !isLoading && !isFetching && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-y-auto max-h-60 divide-y divide-gray-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    key={item.ID}
                    onClick={() => handleAddItem(item)}
                    className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">
                        {item.Code}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs text-gray-500">
                          {item.Name}
                        </span>
                        <span className="text-[10px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">
                          {formatPrice(item.Price)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Add
                    </div>

                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-400 italic text-sm">
                  No items found for &quot;{debouncedCode}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[500px] px-4 sm:px-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                <th className="pb-3 sm:pb-4 pt-2">Item Code / Name</th>
                <th className="pb-3 sm:pb-4 pt-2 px-3 sm:px-4 text-center">Qty</th>
                <th className="pb-3 sm:pb-4 pt-2 px-3 sm:px-4 text-right">Price</th>
                <th className="pb-3 sm:pb-4 pt-2 px-3 sm:px-4 text-right">Subtotal</th>
                <th className="pb-3 sm:pb-4 pt-2 text-right">Action</th>
              </tr>
            </thead>

          <tbody className="divide-y divide-gray-50">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-gray-400 italic text-sm"
                >
                  No items added yet. Search for a code above to start.
                </td>
              </tr>
            ) : (
              <>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">
                          {item.code}
                        </span>
                        <span className="text-xs text-gray-600">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className="w-16 sm:w-20 bg-gray-50 border-none rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-center text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                        />

                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-gray-500">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr>
                  <td colSpan={3} className="py-4 sm:py-6 text-right">
                    <span className="text-[10px] sm:text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Grand Total
                    </span>
                  </td>
                  <td className="py-4 sm:py-6 px-3 sm:px-4 text-right">
                    <span className="text-lg sm:text-xl font-black text-primary">
                      {formatPrice(calculateTotal())}
                    </span>
                  </td>
                  <td></td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-4 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100 gap-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-100 flex items-center justify-center gap-2 transition-all text-sm"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <button
          onClick={handleNext}
          className="flex-[2] sm:flex-none bg-primary text-white px-6 sm:px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-secondary shadow-lg shadow-primary/20 transition-all text-sm"
        >
          Next <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default Step2Items;

