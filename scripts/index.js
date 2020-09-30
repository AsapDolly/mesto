let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');

function editData(){
	let popup = document.querySelector('.popup');
	let userName = popup.querySelector('.popup__input-text_type_username');
	let description = popup.querySelector('.popup__input-text_type_description');
	
	userName.value = document.querySelector('.profile__username').textContent;
	description.value = document.querySelector('.profile__description').textContent; 
	popup.classList.add('popup_opened');
}

function formSubmitHandler(evt){
	evt.preventDefault();
	let popup = document.querySelector('.popup');
	let userName = document.querySelector('.profile__username');
	let description = document.querySelector('.profile__description');

	userName.textContent= document.querySelector('.popup__input-text_type_username').value;
	description.textContent= document.querySelector('.popup__input-text_type_description').value; 
	popup.classList.remove('popup_opened');
}

function closePopup(){
	let popup = document.querySelector('.popup');
	popup.classList.remove('popup_opened');	
}


editButton.addEventListener('click', editData);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);