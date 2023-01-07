import React from 'react';
import { DatePicker, Space } from 'antd';
import { useFormContext } from 'react-hook-form';
import './AppDateInput.sass';

const AppDateInput = ({ name, required = false, ...props }) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const onChange = (date, dateString) => {
        // console.log(date, dateString);
        setValue(name, date);
    };

    return (
        <Space className="space-class" direction="vertical">
            <label className={required ? 'required, label' : 'label'} htmlFor="antd-date-picker">
                {props.label}
            </label>
            <DatePicker
                id="antd-date-picker"
                {...register(name, {
                    ...(required ? { required: 'Vui lòng chọn ngày' } : {}),
                    ...props.validate,
                })}
                placement="bottomRight"
                onChange={onChange}
            />
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </Space>
    );
};
export default AppDateInput;
