export default class UserInfo {
    constructor({userNameSelector, userDescriptionSelector, userPictureSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
        this._userAvatar = document.querySelector(userPictureSelector);
        this._userId = null;
    }

    setUserInfo({username = this._userName.textContent, description = this._userDescription.textContent,
                    userId = this._userId, avatarUrl = this._userAvatar.src}) {
        username ? this._userName.textContent = username : console.log('Не заполнен пользователь');
        description ? this._userDescription.textContent = description : console.log('Не заполнено описание пользователя');
        userId ? this._userId = userId : console.log('Не заполнен ид пользователя');
        avatarUrl ? this._userAvatar.src = avatarUrl : console.log('Не указана ссылка на аватар');
    }

    getUserInfo(){
       return {
           username: this._userName.textContent,
           description: this._userDescription.textContent,
           userId: this._userId,
           avatarUrl: this._userAvatar.src
       };
    }
}