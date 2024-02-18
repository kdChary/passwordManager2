import {Component} from 'react'
import {v4 as uidV4} from 'uuid'

import './index.css'
import PasswordItem from '../PasswordItem'

const bgColorsForUserLogo = [
  'bg-color1',
  'bg-color2',
  'bg-color3',
  'bg-color4',
  'bg-color5',
  'bg-color6',
  'bg-color7',
]

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
    const colorIndex = Math.ceil(Math.random() * bgColorsForUserLogo.length - 1)
    const initialBgColor = bgColorsForUserLogo[colorIndex]

    const newPasswordsList = {
      id: uidV4(),
      website: inputWebSite,
      userName: inputUserName,
      password: inputPassword,
      initialBgColor,
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
      password.website.toLowerCase().includes(event.target.value.toLowerCase()),
    )

    this.setState({passwordsList: sortResults})
  }

  renderForm = () => {
    const {
      inputWebSite,
      inputUserName,
      inputPassword,
      passwordsList,
    } = this.state
    const printError = passwordsList.includes(undefined)
    const webImgUrl =
      'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
    const userImgUrl =
      'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
    const lockImgUrl =
      'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'

    return (
      <form onSubmit={this.onSubmitForm} className="details-form">
        <h2 className="form-title">Add New Password</h2>
        {printError && <p className="error-msg">*please Enter valid details</p>}
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
            type="password"
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
              <div className="password-count-card">
                <h2 className="saved-passwords-section-title">
                  Your Passwords
                </h2>
                <p className="passwords-count">{totalSavedPasswords}</p>
              </div>
              <div className="passwords-filter-card">
                <div className="input-image-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="input-image"
                  />
                </div>
                <input
                  type="search"
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
                id="checkbox"
                type="checkbox"
                onChange={this.toggleShowPassword}
                className="checkbox"
              />
              <label className="checkbox-label" htmlFor="checkbox">
                Show passwords
              </label>
            </div>
            <div className="saved-passwords">
              {totalSavedPasswords === 0 && (
                <>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="empty-passwords-image"
                  />
                  <p className="empty-password-msg">No Passwords</p>
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
