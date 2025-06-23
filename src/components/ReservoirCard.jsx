import reservoirImg from "../assets/reservoir.svg";
import reservoirNameImg from "../assets/reservoir-name.svg";
import fullnessImg from "../assets/fullness.svg";
import stuffImg from "../assets/stuff.svg";
import volumeImg from "../assets/volume.svg";
import lockiconImg from "../assets/lock-icon.svg";
import "../styles/ReservoirCard.css";

export function ReservoirCard({
  reservoir,
  onSave,
  onCancel,
  onDelete,
  onToggleLock,
}) {
  if (!reservoir) return null;

  return (
    <div className="reservoir-card">
      <div className="reservoir-card-title">Информация о резервуаре</div>
      <img src={reservoirImg} alt="Резервуар" className="reservoir-card-img" />
      <div className="info-field">
        <span className="icons">
          <img src={reservoirNameImg} alt="" />
        </span>
        {reservoir.name}
      </div>
      <div className="info-field">
        <span className="icons">
          <img src={stuffImg} alt="" />
        </span>
        {reservoir.product?.name || "—"}
      </div>
      <div className="info-field">
        <span className="icons">
          <img src={volumeImg} alt="" />
        </span>
        {reservoir.capacity}
      </div>
      <div className="units">
        <span className="unit-one">ТОННЫ</span>
        <span className="unit-two">%</span>
      </div>
      <div className="info-field">
        <span className="icons">
          <img src={fullnessImg} alt="" />
        </span>
        {reservoir.volume}
      </div>
      <div className="actions">
        <button className="save-btn" onClick={onSave}>
          Сохранить
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Отменить
        </button>
      </div>
      <div className="lock-status">
        <span className="icons">
          <img src={lockiconImg} alt="" />
        </span>
        {reservoir.isLocked
          ? "Резервуар заблокирован"
          : "Резервуар не заблокирован"}
        <label className="switch">
          <input
            type="checkbox"
            checked={reservoir.isLocked}
            onChange={onToggleLock}
          />
          <span className="slider"></span>
        </label>
      </div>
      <button className="delete-btn" onClick={onDelete}>
        Удалить резервуар
      </button>
    </div>
  );
}
