import { FC, memo, useMemo, useState } from 'react'
import dayjs from 'dayjs';

import HeatMapChart from '@/components/Charts/Heatmap';
import BasicSelect from '@/components/Select/Select';

import { dailyDifferenceOptions } from '@/app/data';

import { DailyDifferenceProps } from './DailyDifference.types'
import { DataObjectKey } from '@/app/types';

/**
 * SECTIONS - DailyDifference
 */
const DailyDifference: FC<DailyDifferenceProps> = ({ data }) => {
    const [selectedDailyDifference, setSelectedDailyDifference] = useState<DataObjectKey>('units_dd')

    const chartData = useMemo(() => data.map((item) => ({
        value: +(isNaN(Number(item[selectedDailyDifference])) ? 0 : Number(item[selectedDailyDifference])).toFixed(2) as number,
        day: dayjs(item.date).format('YYYY-MM-DD')
    })), [data, selectedDailyDifference])

    return (
        <div className='p-2 lg:p-10'>
            <BasicSelect
                value={selectedDailyDifference}
                label={dailyDifferenceOptions.find(({ value }) => value === selectedDailyDifference)?.label}
                options={dailyDifferenceOptions}
                onChange={setSelectedDailyDifference}
            />
            <HeatMapChart data={chartData} />
        </div>
    )
}

export default memo(DailyDifference);