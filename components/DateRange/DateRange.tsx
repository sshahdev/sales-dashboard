import { memo, FC, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

/**
 * COMPONENT - Date Range Picker
 */
const DateRangePickerValue: FC<any> = () => {
    const [value, setValue] = useState<DateRange<Dayjs>>([
        dayjs(new Date()).add(-2, 'week'),
        dayjs(new Date()),
    ]);

    const dateRange = useMemo(() => {
        const year = dayjs(new Date()).format('YYYY')
        return {
            min: dayjs(new Date(`01-01-${year}`)),
            max: dayjs(new Date(`31-12-${year}`))
        }
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                <DateRangePicker
                    minDate={dateRange.min}
                    maxDate={dateRange.max}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    format='DD MMM YYYY'
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default memo(DateRangePickerValue)