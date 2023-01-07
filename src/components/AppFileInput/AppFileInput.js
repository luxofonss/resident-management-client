import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';
import { getBase64 } from '~/helpers/media';
import styles from './AppFileInput.module.sass';

const cx = classNames.bind(styles);
function AppFileInput({ name, required = false, ...props }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const onChange = async (e) => {
        const res = await getBase64(e.target.files[0]);
        // console.log(res);
    };
    return (
        <div className={cx('input-wrapper')}>
            <label htmlFor="app-file-input" className={cx(required ? 'required' : '')}>
                {props.label}
            </label>
            <input
                id="app-file-input"
                {...register(name, {
                    ...(required ? { required: 'Vui lòng tải lên file' } : {}),
                    ...props.validate,
                })}
                style={{ width: '100%', height: '100%' }}
                type="file"
                className={cx('file-input')}
                onChange={onChange}
                {...props}
            />
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </div>
    );
}

export default AppFileInput;
