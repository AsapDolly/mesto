export function openPopup(popupType) {
    const popupOverlay = popupType.querySelector('.popup__overlay');
    popupOverlay.addEventListener('click', closeOnClickOverlay);
    document.addEventListener('keydown', closeByEscapeButton);
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
    }
}

export function closePopup(popupType) {
    const popupOverlay = popupType.querySelector('.popup__overlay');
    popupOverlay.removeEventListener('click', closeOnClickOverlay);
    document.removeEventListener('keydown', closeByEscapeButton);
    popupType.classList.remove('popup_opened');
}