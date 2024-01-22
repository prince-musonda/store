import { toast } from "react-toastify";

// React Toastify emmiters (for showing notifications in the app)

export function showSuccessNotification(message) {
  toast.success(message);
}

export function showErrorNotification(message) {
  toast.error(message);
}

export function showWarningNotification(message) {
  toast.warn(message);
}
