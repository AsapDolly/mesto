export default class UserInfo{
    constructor({userNameSelector, userDescriptionSelector}) {
        this._userName = document.querySelector(userNameSelector);;
        this._userDescription = document.querySelector(userDescriptionSelector);
    }

    getUserInfo(){
        return {username: this._userName.textContent, description: this._userDescription.textContent};
    }

    setUserInfo({username, description}){
        this._userName.textContent = username;
        this._userDescription.textContent = description;
    }
}