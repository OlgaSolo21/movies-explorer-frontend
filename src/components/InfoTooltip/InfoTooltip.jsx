import successIcon from '../../images/successIcon.svg'
import errorIcon from '../../images/errorIcon.svg'

export default function InfoTooltip({isOpen, onClose, isSuccess, message}) {
    return (
        <div className={`tooltip ${isOpen ? 'tooltip_opened' : ''}`}>
            <div className="tooltip__content">
                <button
                    type="button"
                    aria-label="Close"
                    className='tooltip__close'
                    onClick={onClose}
                />
                <img
                    className='tooltip__image'
                    alt='Изображение уведомления'
                    src={`${isSuccess ? successIcon : errorIcon}`}
                />
                <h2 className='tooltip__title'>{message}</h2>
            </div>
        </div>
    )
}