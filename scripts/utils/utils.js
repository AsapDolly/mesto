export function openPopup(popupType) {
    const popupOverlay = popupType.querySelector('.popup__overlay');
    popupOverlay.addEventListener('click', closeOnClickOverlay);
    popupType.classList.add('popup_opened');
}

export function closeOnClickOverlay(evt) {
    const openedPopup = evt.currentTarget.closest('.popup');
    closePopup(openedPopup);
}

export function closeByEscapeButton(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
        document.removeEventListener('keydown', closeByEscapeButton);
    }
}

export function closePopup(popupType) {
    const popupOverlay = popupType.querySelector('.popup__overlay');
    popupOverlay.removeEventListener('click', closeOnClickOverlay);
    popupType.classList.remove('popup_opened');
}