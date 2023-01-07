import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckIcon, ChevronDown } from '~/assets/svgs';
import styles from './AppSelectInput.module.sass';

const cx = classNames.bind(styles);

const AppSelectInput = ({ name, required, options, label, ...props }) => {
    const { register, setValue } = useFormContext();
    const [selectValue, setSelectValue] = useState(options.options[0].value);
    const [selectValueName, setSelectValueName] = useState(options.options[0].name);
    const [active, setActive] = useState(0);
    const [iconClick, setIconClick] = useState(false);
    const selections = useRef();
    const wrapperRef = useRef();

    const handleSelect = (value, valueName, index) => {
        setValue(name, value);
        setSelectValue(value);
        setSelectValueName(valueName);
        setActive(index);
        handleSelectClick();
    };

    const handleSelectClick = () => {
        selections.current.classList.toggle('hide');
        setIconClick(!iconClick);
    };

    const handleClick = (event) => {
        const { target } = event;

        if (!selections.current.classList.contains('hide'))
            if (!wrapperRef.current.contains(target)) {
                selections.current.classList.add('hide');
                setIconClick(!iconClick);
            }
    };

    useEffect(() => {
        setValue(name, options.options[0].value);
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div ref={wrapperRef}>
            <div
                value={selectValue}
                className={cx('form-select')}
                {...register(name, props.validate ? props.validate : { required: 'This field is required!' })}
            >
                <label className={required ? 'required, label' : 'label'} htmlFor="select">
                    {label}
                </label>
                <div id="select" onClick={() => handleSelectClick()} className={cx('select-wrapper')}>
                    <div>{selectValueName}</div>
                    <div className={cx(iconClick ? 'click' : 'un-click', 'flex-center')}>
                        <ChevronDown />
                    </div>
                </div>
                <ul ref={selections} className={cx('selections', 'hide')} id="select">
                    {options.options.map((option, index) => {
                        return (
                            <li
                                key={index}
                                className={cx(active === index ? 'active' : '')}
                                onClick={() => handleSelect(option.value, option.name, index)}
                            >
                                <div>{option.name}</div>
                                <div className={cx(active !== index ? 'hide' : '')}>
                                    <CheckIcon />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AppSelectInput;
