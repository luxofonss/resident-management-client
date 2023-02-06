import { Checkbox, Space } from 'antd';
import { useFormContext } from 'react-hook-form';
import './AppCheckbox.sass';

const AppCheckbox = ({ name, required = false, ...props }) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const onChange = (e) => {
        console.log(e);
        setValue(name, e.target.checked);
    };

    return (
        <Space className="space-class" direction="vertical">
            <Checkbox onChange={onChange}>{props.label}</Checkbox>
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </Space>
    );
};
export default AppCheckbox;
