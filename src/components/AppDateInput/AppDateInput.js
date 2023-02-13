import React from 'react';
import { DatePicker, Space } from 'antd';
import { useFormContext } from 'react-hook-form';
import './AppDateInput.sass';
import dayjs from 'dayjs';

const AppDateInput = ({ name, required = false, ...props }) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    if (props.defaultValue) {
        setValue(name, props.defaultValue);
    }
    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setValue(name, dateString);
    };

    return (
        <Space className="space-class" direction="vertical">
            <label className={required ? 'required label' : 'label'} htmlFor="antd-date-picker">
                {props.label}
            </label>
            <DatePicker
                id="antd-date-picker"
                {...register(name, {
                    ...(required ? { required: 'Vui lòng chọn ngày' } : {}),
                    ...props.validate,
                })}
                disabled={props.disabled === true ? true : false}
                format="YYYY-MM-DD"
                placement="bottomRight"
                onChange={onChange}
                defaultValue={props.defaultValue ? dayjs(props.defaultValue, 'YYYY-MM-DD') : null}
            />
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </Space>
    );
};
export default AppDateInput;
