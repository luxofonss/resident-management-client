import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CheckIcon, ChevronDown } from '~/assets/svgs';
import {
    LAY_LOAI_TB,
    LAY_LOAI_TB_RESET,
    LAY_TAI_NGUYEN,
    LAY_TAI_NGUYEN_RESET,
} from '~/containers/app/screens/Equipment/redux/action';
import useDebounceValue from '~/hooks/useDebounceValue';
import styles from './AppSelectEquipment.module.sass';

const cx = classNames.bind(styles);

const AppSelectEquipment = ({ apiURL, isFullPath = false, minWidth, name, required, label, ...props }) => {
    const { register, setValue } = useFormContext();
    const [selected, setSelected] = useState('');
    const [active, setActive] = useState(0);
    const [iconClick, setIconClick] = useState(false);
    const [params, setParams] = useState('');
    const [options, setOptions] = useState();
    const [nameInput, setNameInput] = useState('');
    const loaiTaiNguyen = useSelector((state) => state.equipment.danhSachLoaiThietBi);
    const input = useRef();
    const dispatch = useDispatch();

    const selections = useRef();
    const wrapperRef = useRef();
    const _name = name;
    const searchValue = (nameInput, 1000);

    const handleSelect = (id, name, index) => {
        console.log(name, id);
        setSelected({ name: name, id: id });
        setValue(_name, id);
        // dispatch(LAY_LOAI_TB_RESET());
        setActive(index);
        selections.current.classList.toggle('hide');
        setIconClick(!iconClick);
    };

    console.log('loaiTaiNguyen', loaiTaiNguyen);

    const handleClick = (event) => {
        const { target } = event;
        if (!selections.current.classList.contains('hide'))
            if (!wrapperRef.current.contains(target)) {
                selections.current.classList.add('hide');
                setIconClick(!iconClick);
            }
    };

    useEffect(() => {
        console.log('searchValue', searchValue);
        dispatch(LAY_LOAI_TB({ name: searchValue }));
    }, [searchValue]);

    useEffect(() => {
        setOptions(loaiTaiNguyen?.data);
    }, [loaiTaiNguyen?.data]);

    useEffect(() => {
        if (params !== '') {
            selections.current.classList.remove('hide');
        }
    }, [params]);

    useEffect(() => {
        console.log('input: ', input);
        input.current.value = selected.name;
    }, [selected.name]);

    useEffect(() => {
        // if (options) {
        //     if (selections.current.classList.contains('hide')) selections.current.classList.remove('hide');
        // }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [options]);

    const handleSelectClick = () => {
        selections.current.classList.toggle('hide');
        setIconClick(!iconClick);
    };

    const onChange = (e) => {
        console.log(e.target.value);
        setNameInput(e.target.value);
    };

    return (
        <div style={{ minWidth: minWidth ? minWidth : null }} ref={wrapperRef}>
            <div
                // value={selectValue}
                className={cx('form-select')}
                {...register(name, props.validate ? props.validate : { required: 'This field is required!' })}
            >
                <label className={required ? 'required label' : 'label'} htmlFor="select">
                    {label}
                </label>
                <div id="select" onClick={() => handleSelectClick()} className={cx('select-wrapper')}>
                    <input
                        ref={input}
                        id={name}
                        type={props.type ? props.type : 'text'}
                        className={cx('input')}
                        onChange={(e) => onChange(e)}
                        // defaultValue={selected.name}
                        {...props}
                    />
                    {/* <div className={cx('selected-name')}>{selected.name}</div> */}
                    <div className={cx(iconClick ? 'click' : 'un-click', 'flex-center')}>
                        <ChevronDown />
                    </div>
                </div>
                <ul ref={selections} className={cx('selections', 'hide')} id="select">
                    {options &&
                        options.map((option, index) => {
                            return (
                                <li
                                    key={index}
                                    className={cx(active === index ? 'active' : '')}
                                    onClick={() => {
                                        handleSelect(option.id, option.name, index);
                                    }}
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

export default AppSelectEquipment;
