import {Component} from 'react'
import {v4 as uidV4} from 'uuid'

import './index.css'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    showPassword: false,
    inputWebSite: '',
    inputUserName: '',
    inputPassword: '',
    passwordsList: [],
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {
      inputPassword,
      inputUserName,
      inputWebSite,
      passwordsList,
    } = this.state
    const newPasswordsList = {
      id: uidV4(),
      website: inputWebSite,
      userName: inputUserName,
      password: inputPassword,
    }

    this.setState({
      passwordsList: [...passwordsList, newPasswordsList],
      inputPassword: '',
      inputUserName: '',
      inputWebSite: '',
    })
  }

  onChangeWebsite = event => {
    this.setState({inputWebSite: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({inputUserName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  removePassword = passwordId => {
    const {passwordsList} = this.state
    const filteredPasswords = passwordsList.filter(
      password => passwordId !== password.id,
    )
    this.setState({passwordsList: filteredPasswords})
  }

  searchPasswords = event => {
    const {passwordsList} = this.state
    const sortResults = passwordsList.filter(password =>
      password.includes(event.target.value),
    )

    this.setState({passwordsList: sortResults})
  }

  renderForm = () => {
    const {inputWebSite, inputUserName, inputPassword} = this.state
    const webImgUrl =
      'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
    const userImgUrl =
      'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
    const lockImgUrl =
      'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'

    return (
      <form onSubmit={this.onSubmitForm} className="details-form">
        <p className="form-title">Add New Password</p>
        <div className="input-card">
          <div className="input-image-card">
            <img src={webImgUrl} alt="website" className="input-image" />
          </div>
          <input
            type="text"
            placeholder="Enter Website"
            className="input"
            value={inputWebSite}
            onChange={this.onChangeWebsite}
            id="web"
          />
        </div>
        <div className="input-card">
          <div className="input-image-card">
            <img src={userImgUrl} alt="username" className="input-image" />
          </div>
          <input
            type="text"
            placeholder="Enter Username"
            className="input"
            value={inputUserName}
            onChange={this.onChangeUserName}
            id="username"
          />
        </div>
        <div className="input-card">
          <div className="input-image-card">
            <img src={lockImgUrl} alt="password" className="input-image" />
          </div>
          <input
            type="text"
            placeholder="Enter Password"
            className="input"
            value={inputPassword}
            onChange={this.onChangePassword}
            id="password"
          />
        </div>
        <button type="submit" className="form-button">
          Add
        </button>
      </form>
    )
  }

  renderSavedPasswordsList = () => {
    const {passwordsList, showPassword} = this.state

    return (
      <ul className="saved-passwords-list">
        {passwordsList.map(eachList => (
          <PasswordItem
            key={eachList.id}
            passwordDetails={eachList}
            removePassword={this.removePassword}
            showPassword={showPassword}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {passwordsList} = this.state
    const totalSavedPasswords = passwordsList.length

    return (
      <div className="app-background">
        <div className="password-manager-app">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="password-details">
            <div className="password-manager-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-manager-image"
              />
            </div>
            {this.renderForm()}
          </div>
          <div className="saved-passwords-section">
            <div className="password-controls">
              <p className="saved-passwords-section-title">
                Your Passwords{' '}
                <span className="passwords-count">{totalSavedPasswords}</span>
              </p>
              <div className="passwords-filter-card">
                <div className="search-image-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="input-image"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="input"
                  onChange={this.searchPasswords}
                  id="passwords"
                />
              </div>
            </div>
            <hr className="line" />
            <div className="check-box-card">
              <input
                type="checkbox"
                onChange={this.toggleShowPassword}
                className="checkbox"
              />
              <p className="checkbox-label">Show Passwords</p>
            </div>
            <div className="saved-passwords">
              {totalSavedPasswords === 0 && (
                <>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="empty-passwords-image"
                  />
                  <h2 className="empty-password-msg">No Passwords</h2>
                </>
              )}
              {this.renderSavedPasswordsList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
