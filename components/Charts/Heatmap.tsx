import { FC, memo, useMemo } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import dayjs from 'dayjs'
import { shadesOfGreen } from '@/app/data'
import Box from '@mui/material/Box'

type HeatMapChartProps = {
    data: {
        value: number,
        day: string
    }[]
}

/**
 * CHART - HeatMap
 */
const HeatMapChart: FC<HeatMapChartProps> = ({ data }) => {
    const dateRange = useMemo(() => {
        let year = dayjs(new Date()).format('YYYY')
        if (data.length) {
            year = dayjs(data[0].day).format('YYYY')
        }
        return {
            fromDate: `${year}-01-01`,
            toDate: `${year}-12-31`,
            minValue: Math.min(...(data.map(({ value }) => value))),
            maxValue: Math.max(...(data.map(({ value }) => value)))
        }
    }, [data])

    return (
        <Box className='chart-container flex-col relative' sx={{ height: '50vh', margin: '-10px 0 -100px', width: '90vw' }}>
            <ResponsiveCalendar
                data={data}
                from={dateRange.fromDate}
                to={dateRange.toDate}
                emptyColor="#eeeeee"
                colors={shadesOfGreen}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            />
            <div className='flex absolute bottom-[15%] gap-2 justify-end right-0 items-center'>
                <div className='text-center'>Less ({dateRange.minValue.toFixed(2)})</div>
                {shadesOfGreen.map(color => <Box key={color} sx={{ height: 20, width: 20, background: color, gap: 50, display: 'flex' }} />)}
                <div className='text-center'>More ({dateRange.maxValue.toFixed(2)})</div>
            </div>
        </Box>
    )
}

export default memo(HeatMapChart);

