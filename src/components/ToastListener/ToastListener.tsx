import { useCallback, useEffect } from "react";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import { cleanToast } from "../../redux/slices/toastListenerSlice";

const ToastListener = () => {
  const dispatch = useAppDispatch();

  const { error, message } = useAppSelector(
    (state: RootState) => state.toastListener
  );

  useEffect(() => {
    if (error) {
      showError(error);
      dispatch(cleanToast());
    }

    if (message) {
      showMessage(message);
      dispatch(cleanToast());
    }
  }, [error, message]);

  const showError = useCallback((error: string) => {
    toast.error(error);
  }, []);

  const showMessage = useCallback((message: string) => {
    toast.success(message);
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={1}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
    />
  );
};

export default ToastListener;
