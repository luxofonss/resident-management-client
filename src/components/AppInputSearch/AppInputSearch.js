import classNames from 'classnames/bind';
import { useForm, useFormContext } from 'react-hook-form';
import styles from './AppInputSearch.module.sass';

const cx = classNames.bind(styles);
function AppInputSearch({ apiURL, onChange, required, isFullPath = false, name, wrapperStyle = {}, ...props }) {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();
    return (
        <div className={cx('input-wrapper')} style={wrapperStyle}>
            <label htmlFor={name} className={cx(required ? 'required' : '')}>
                {props.label}
            </label>

            <input
                id={name}
                type={props.type ? props.type : 'text'}
                className={cx('input')}
                onChange={onChange}
                autoComplete="off"
                {...props}
            />
            {errors?.type === 'required' && <div className="error-message">Trường này không được để trống</div>}
        </div>
    );
}

export default AppInputSearch;
