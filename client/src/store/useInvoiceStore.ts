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
      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.code === newItem.code);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.code === newItem.code
                  ? { ...i, quantity: i.quantity + (newItem.quantity || 1) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: newItem.quantity || 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
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
