export default class UserInfo {
    constructor({userNameSelector, userDescriptionSelector, userPictureSelector}, api) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
        this._userAvatar = document.querySelector(userPictureSelector);
        this._api = api;
        this._userId = null;
    }

    getUserId(){
        return this._userId;
    }

    getInfoFromServer() {
        this._api.getUserInformation()
            .then((res) => {
                this._userId = res._id;
                this.setUserInfo({username: res.name, description: res.about});
                this.setNewAvatar(res.avatar);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getUserInfoFromPage() {
        return {username: this._userName.textContent, description: this._userDescription.textContent};
    }

    setUserInfo({username, description}) {
        this._userName.textContent = username;
        this._userDescription.textContent = description;
    }

    setNewAvatar(url) {
        this._userAvatar.src = url;
    }
}