import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InvoiceState } from "@/types/invoice";

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set) => ({
      senderName: "",
      senderAddress: "",
      receiverName: "",
      receiverAddress: "",
      items: [],
      currentStep: 1,

      updateBasicInfo: (info) => set((state) => ({ ...state, ...info })),
      setStep: (step) => set({ currentStep: step }),
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
          ),
        })),
      reset: () =>
        set({
          senderName: "",
          senderAddress: "",
          receiverName: "",
          receiverAddress: "",
          items: [],
          currentStep: 1,
        }),
    }),
    {
      name: "invoice-storage",
    }
  )
);
