import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckIcon, ChevronDown } from '~/assets/svgs';
import styles from './AppSelectApi.module.sass';

const cx = classNames.bind(styles);

const AppSelectApi = ({ apiURL, isFullPath = false, minWidth, name, required, label, ...props }) => {
    const { register, setValue } = useFormContext();
    const [selected, setSelected] = useState('');
    const [active, setActive] = useState(0);
    const [iconClick, setIconClick] = useState(false);
    const [params, setParams] = useState('');
    const [options, setOptions] = useState();
    const selections = useRef();
    const wrapperRef = useRef();
    const _name = name;

    const handleSelect = (id, name, index) => {
        setValue(_name, id);
        setSelected({ name: name, id: id });
        setActive(index);
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
        const fetch = async () => {
            let apiPath;
            if (isFullPath) {
                apiPath = apiURL;
            } else {
                apiPath = process.env.REACT_APP_BASE_API_URL + apiURL;
                console.log(apiPath);
            }
            const response = await axios.get(apiPath);
            setOptions(response?.data?.rows);
            setSelected({ name: response?.data?.rows[0].name, id: response?.data?.rows[0].id });
        };
        fetch();
    }, []);

    useEffect(() => {
        if (params !== '') {
            selections.current.classList.remove('hide');
        }
    }, [params]);

    useEffect(() => {
        if (options) {
            setValue(_name, options[0].id);
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [options]);

    const handleSelectClick = () => {
        selections.current.classList.toggle('hide');
        setIconClick(!iconClick);
    };

    return (
        <div style={{ minWidth: minWidth ? minWidth : null }} ref={wrapperRef}>
            <div
                // value={selectValue}
                className={cx('form-select')}
                {...register(name, props.validate ? props.validate : { required: 'This field is required!' })}
            >
                <label className={cx(required ? 'required' : 'label')} htmlFor="select">
                    {label}
                </label>
                <div id="select" onClick={() => handleSelectClick()} className={cx('select-wrapper')}>
                    <div className={cx('selected-name')}>{selected.name}</div>
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
