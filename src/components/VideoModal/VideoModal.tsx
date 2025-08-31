import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./VideoModal.module.scss";

type Props = {
  open: boolean;
  videoUrl?: string | null;
  title?: string;
  onClose: () => void;
};

export default function VideoModal({ open, videoUrl, title, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <strong className={styles.title}>{title ?? "Course video"}</strong>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.videoBox}>
          {videoUrl ? (
            <video className={styles.video} src={videoUrl} controls autoPlay />
          ) : (
            <div className={styles.noVideo}>No video URL</div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
