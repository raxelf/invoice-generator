type InvoiceItem = {
  id: string;
  code: string;
  name: string;
  price: number;
  quantity: number;
};

export type InvoiceState = {
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  items: InvoiceItem[];
  currentStep: number;

  updateBasicInfo: (
    info: Partial<Omit<InvoiceState, "items" | "currentStep">>,
  ) => void;
  addItem: (item: InvoiceItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  setStep: (step: number) => void;
  reset: () => void;
};
