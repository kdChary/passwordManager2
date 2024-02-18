import './index.css'

const PasswordItem = props => {
  const {passwordDetails, removePassword, showPassword} = props
  const {id, userName, website, password, initialBgColor} = passwordDetails
  const initial = userName ? userName[0].toUpperCase() : ''

  const deletePassword = () => {
    removePassword(id)
  }
  return (
    <li className="saved-password-item">
      <div className="user-details">
        <div className={`initial-card ${initialBgColor}`}>{initial}</div>
        <div className="password-item-details">
          <p className="password-text">{website}</p>
          <p className="password-text">{userName}</p>
          {showPassword ? (
            <p className="password-text">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="password-mask"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={deletePassword}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
