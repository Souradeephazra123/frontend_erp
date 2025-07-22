import { Toaster as Sonner } from "sonner";

// type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = () => {
  return (
    <Sonner
      theme="light"
      visibleToasts={1}
      position="top-right"
      toastOptions={TOAST_OPTIONS}
    />
  );
};

export default Toaster;
const TOAST_OPTIONS = {
  unstyled: true,
  classNames: {
    toast:
      "flex w-full items-center gap-2 rounded-6 p-4 font-sans text-base font-medium",
    error: "bg-red-700 font-semibold text-white rounded-lg",
    success: "bg-green-700 text-white rounded-lg",
    info: "bg-blue-600 font-semibold text-white rounded-lg",
  },
};
