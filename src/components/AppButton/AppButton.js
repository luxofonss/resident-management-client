import classNames from 'classnames/bind';
import InfinityLoading from '../Loading/InfinityLoading';
import styles from './AppButton.module.sass';

const cx = classNames.bind(styles);

function AppButton({
    children,
    type = 'button',
    color,
    border = 'var(--primary-color)',
    text = '',
    form,
    isLoading = false,
    ...buttonProps
}) {
    return (
        <button
            type={type}
            style={{
                backgroundColor: isLoading ? '#fff' : color,
                border: `1px solid ${border}`,
                color: text,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.5s',
            }}
            className={cx('primary-btn')}
            form={form}
            {...buttonProps}
        >
            {isLoading ? (
                <InfinityLoading
                    wrapperStyle={{
                        width: '50px',
                    }}
                />
            ) : (
                children
            )}
        </button>
    );
}

export default AppButton;
