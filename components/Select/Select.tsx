import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { BasicSelectProps } from './Select.types';
import { DataObject } from '@/app/types';

/**
 * COMPONENT - Select
 */
const BasicSelect: React.FC<BasicSelectProps> = ({
    label,
    value,
    options,
    onChange,
    ...rest
}) => {

    const handleChange = React.useCallback((event: SelectChangeEvent) => {
        onChange(event.target.value as keyof DataObject);
    }, [onChange]);

    const prepareOptions = React.useMemo(() => options.map(option => (
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
    )), [options])

    return (
        <Box sx={{ minWidth: 120, paddingTop: '8px' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={handleChange}
                    {...rest}
                >
                    {prepareOptions}
                </Select>
            </FormControl>
        </Box>
    );
}

export default React.memo(BasicSelect);