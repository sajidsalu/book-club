import { toast } from "react-toastify";

export const showSucessToast = (message: string) => {
  toast.success(message, {
    theme: "light",
    hideProgressBar: true,
    autoClose: 2000,
    position: "top-center",
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    theme: "light",
    hideProgressBar: true,
    autoClose: 2000,
    position: "top-center",
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    theme: "light",
    hideProgressBar: true,
    autoClose: 2000,
    position: "top-center",
  });
};
