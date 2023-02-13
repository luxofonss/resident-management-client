import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CheckIcon, ChevronDown } from '~/assets/svgs';
import { LAY_NK, LAY_NK_FAIL, LAY_NK_RESET } from '~/containers/app/screens/Resident/redux/action';
import useDebounceValue from '~/hooks/useDebounceValue';
import styles from './AppSelectApi.module.sass';

const cx = classNames.bind(styles);

const AppSelectApi = ({ apiURL, isFullPath = false, indexValue, minWidth, name, required, label, ...props }) => {
    const { register, setValue } = useFormContext();
    const [selected, setSelected] = useState('');
    const [active, setActive] = useState(0);
    const [iconClick, setIconClick] = useState(false);
    const [params, setParams] = useState('');
    const [options, setOptions] = useState();
    const [cccd, setCccd] = useState('');
    const nkInfo = useSelector((state) => state.resident.list);
    const dispatch = useDispatch();

    const selections = useRef([]);
    const wrapperRef = useRef();
    const _name = name;
    const searchValue = useDebounceValue(cccd, 1000);

    const handleSelect = (id, name, index) => {
        setSelected({ name: name, id: id });
        setValue(_name, id);
        dispatch(LAY_NK_RESET());
        setActive(index);
        selections.current[indexValue].classList.toggle('hide');
        setIconClick(!iconClick);
    };

    console.log('nkInfo', nkInfo);

    const handleClick = (event) => {
        const { target } = event;
        if (!selections.current[indexValue].classList.contains('hide'))
            if (!wrapperRef.current.contains(target)) {
                selections.current[indexValue].classList.add('hide');
                setIconClick(!iconClick);
            }
    };

    useEffect(() => {
        console.log('searchValue', searchValue);
        if (searchValue !== '') dispatch(LAY_NK({ cccd: searchValue }));
        else {
        }
    }, [searchValue]);

    useEffect(() => {
        setOptions(nkInfo?.data?.data);
    }, [nkInfo?.data?.data]);

    useEffect(() => {
        if (params !== '') {
            selections.current[indexValue].classList.remove('hide');
        }
    }, [params]);

    useEffect(() => {
        // if (options) {
        //     if (selections.current[indexValue].classList.contains('hide'))
        //         selections.current[indexValue].classList.remove('hide');
        // }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [options]);

    const handleSelectClick = () => {
        selections.current[indexValue].classList.toggle('hide');
        setIconClick(!iconClick);
    };

    const onChange = (e) => {
        console.log(e.target.value);
        setCccd(e.target.value);
    };

    return (
        <div id={indexValue} style={{ minWidth: minWidth ? minWidth : null }} ref={wrapperRef}>
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
                        id={name}
                        type={props.type ? props.type : 'text'}
                        className={cx('input')}
                        onChange={(e) => onChange(e)}
                        defaultValue={selected.name}
                        {...props}
                    />
                    <div className={cx('selected-name')}>{selected.name}</div>
                    <div className={cx(iconClick ? 'click' : 'un-click', 'flex-center')}>
                        <ChevronDown />
                    </div>
                </div>
                <ul
                    ref={(el) => (selections.current[indexValue] = el)}
                    className={cx('selections', 'hide')}
                    id="select"
                >
                    {options &&
                        options?.map((option, index) => {
                            return (
                                <li
                                    key={index}
                                    className={cx(active === index ? 'active' : '')}
                                    onClick={() => {
                                        handleSelect(option.id, option.ho + option.ten_dem + option.ten, index);
                                    }}
                                >
                                    <div>{option.cccd}</div>
                                    <div>{option.ho + option.ten_dem + option.ten}</div>
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

export default AppSelectApi;

// {
//     "id": 1,
//     "name": "nhan van hoa",
//     "thu_phi": 200,
//     "la_cong_trinh": 1,
//     "xuat_xu": "string",
//     "mo_ta": "string",
//     "ghi_chu": "string",
//     "thu_phi_coc": 100,
//     "gia_tri": 10000
// }

// "id": 1,
// "mo_ta": "string",
// "ghi_chu": "string",
// "ngay_them": "2023-01-24T17:00:00.000Z",
// "tinh_trang": 10,
// "loai_id": 1
