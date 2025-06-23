import reservoirImg from '../assets/reservoir.svg'
import '../styles/ReservoirCard.css'

export function ReservoirCard({
  reservoir,
  onSave,
  onCancel,
  onDelete,
  onToggleLock
}) {
  if (!reservoir) return null

  return (
    <div className="reservoir-card">
      <div className="reservoir-card-title">Информация о резервуаре</div>
      <img src={reservoirImg} alt="Резервуар" className="reservoir-card-img" />
      <div className="reservoir-card-name">{reservoir.name}</div>
      <div className="reservoir-card-field">
        {reservoir.product?.name || '—'}
      </div>
      <div className="reservoir-card-field">
         {reservoir.capacity} т
      </div>
      <div className="reservoir-card-units">
        <span className="unit-badge">тонны</span>
        <span className="unit-badge">%</span>
      </div>
      <div className="reservoir-card-field">
        {reservoir.volume} т
      </div>
      <div className="reservoir-card-actions">
        <button className="save-btn" onClick={onSave}>Сохранить</button>
        <button className="cancel-btn" onClick={onCancel}>Отменить</button>
      </div>
      <div className="reservoir-card-status-row">
          <b>{reservoir.isLocked ? 'Резервуар заблокирован' : 'Резервуар не заблокирован'}</b>
        <button
          className="lock-btn"
          onClick={onToggleLock}
        >
          {reservoir.isLocked ? 'Разблокировать' : 'Заблокировать'}
        </button>
      </div>
      <button className="delete-btn" onClick={onDelete}>Удалить резервуар</button>
    </div>
  )
}