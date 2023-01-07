import classNames from 'classnames/bind';
import { useForm, useFormContext } from 'react-hook-form';
import styles from './AppTextArea.module.sass';

const cx = classNames.bind(styles);
function AppTextArea({ name, wrapperStyle = {}, rows = 3, required = false, ...props }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className={cx('input-wrapper')} style={wrapperStyle}>
            <label htmlFor="app-textarea" className={required ? 'required' : ''}>
                {props.label}
            </label>
            <textarea
                id="app-textarea"
                className={cx('textarea')}
                placeholder={props?.placeholder}
                autoComplete="off"
                rows={rows}
                {...register(name, {
                    ...(required ? { required: 'Trường này không được để trống' } : {}),
                    ...props.validate,
                })}
            />
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </div>
    );
}

export default AppTextArea;
