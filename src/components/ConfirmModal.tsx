import warningImg from "../assets/warning.svg";
import "../styles/ConfirmModal.css";

export function ConfirmModal({
  open,
  onConfirm,
  onCancel,
  text,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-warning-icon">
            <img src={warningImg} alt="Внимание" />
          </span>
          <span className="modal-header-title">Обратите внимание</span>
        </div>
        <div className="modal-main-text">{text}</div>
        <div className="modal-actions">
          <button className="save-btn" onClick={onConfirm}>Подтвердить</button>
          <button className="cancel-btn" onClick={onCancel}>Отменить</button>
        </div>
      </div>
    </div>
  );
}