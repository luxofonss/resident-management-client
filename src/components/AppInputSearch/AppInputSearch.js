import classNames from 'classnames/bind';
import { useForm, useFormContext } from 'react-hook-form';
import styles from './AppInputSearch.module.sass';

const cx = classNames.bind(styles);
function AppInputSearch({ apiURL, onChange, isFullPath = false, name, wrapperStyle = {}, ...props }) {
    return (
        <div className={cx('input-wrapper')} style={wrapperStyle}>
            <label htmlFor={name}>{props.label}</label>

            <input
                id={name}
                type={props.type ? props.type : 'text'}
                className={cx('input')}
                onChange={onChange}
                autoComplete="off"
                {...props}
            />
        </div>
    );
}

export default AppInputSearch;
