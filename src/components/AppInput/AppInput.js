import classNames from 'classnames/bind';
import { useForm, useFormContext } from 'react-hook-form';
import styles from './AppInput.module.sass';

const cx = classNames.bind(styles);
function AppInput({ name, defaultValue, wrapperStyle = {}, required = false, ...props }) {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();
    if (defaultValue && name) {
        setValue(name, defaultValue);
    }
    return (
        <div className={cx('input-wrapper')} style={wrapperStyle}>
            <label htmlFor={name} className={cx(required ? 'required' : '')}>
                {props.label}
            </label>
            {name && (
                <input
                    id={name}
                    type={props.type ? props.type : 'text'}
                    className={cx('input')}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    autoComplete="off"
                    defaultValue={defaultValue ? defaultValue : ''}
                    {...register(name, {
                        ...(required ? { required: 'Trường này không được để trống' } : {}),
                        ...props.validate,
                    })}
                    {...props}
                />
            )}
            {!name && (
                <input
                    id={name}
                    type={props.type ? props.type : 'text'}
                    className={cx('input')}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    defaultValue={defaultValue ? defaultValue : ''}
                    {...props}
                />
            )}
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </div>
    );
}

export default AppInput;

// [
//     {
//         "id": 6,
//         "mo_ta": "Bàn dài đẹp",
//         "ghi_chu": "Đẹp",
//         "ngay_them": "2023-02-12T17:00:00.000Z",
//         "tinh_trang": 9,
//         "loai_id": 10,
//         "ten_tai_nguyen": "Bàn dài"
//     }
// ]
