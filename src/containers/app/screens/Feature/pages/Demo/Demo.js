import React from 'react';
import styles from './Demo.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';

const cx = classNames.bind(styles);

const options = [
    { name: 'Phương án A', value: 'A' },
    { name: 'Phương án B', value: 'B' },
    { name: 'Phương án C', value: 'C' },
    { name: 'Phương án E', value: 'E' },
    { name: 'Phương án F', value: 'F' },
];

function Demo(props) {
    return (
        <div>
            <AppForm onSubmit={(data) => console.log(data)}>
                <AppDateInput required label="Date" name="date"></AppDateInput>
                <AppFileInput required label="File" name="file"></AppFileInput>
                <AppInput required label="Text" name="name"></AppInput>
                <AppSelectInput required options={{ options }} label="Select" name="select"></AppSelectInput>
                <AppTextArea required label="Textarea" name="textarea"></AppTextArea>
                <AppButton type="submit">Submit</AppButton>
            </AppForm>
        </div>
    );
}

export default Demo;
