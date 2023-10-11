import { FC, memo, useMemo, useState } from 'react'
import dayjs from 'dayjs';

import Line from '@/components/Charts/Line';
import Table from '@/components/Table/Table'

import { months, filterOptionsForChartData } from '@/app/data';
import Select from '@/components/Select/Select';
import DateRange from '@/components/DateRange/DateRange';

import { tableColumns } from './tableData'

import { SalesAnalysisProps } from './SalesAnalysis.types'
import { GetTheChartDataType, getAxisLabel, getTheChartData } from './SalesAnalysis.utils';


/**
 * SECTION - SalesAnalysis
 */
const SalesAnalysis: FC<SalesAnalysisProps> = ({ data, chart_key, label }) => {
    const [filterOption, setFilterOption] = useState<string>(filterOptionsForChartData[0].value)
    const [selectedMonth, setSelectedMonth] = useState<number>(dayjs(new Date()).get('M'))

    const statisticsData = useMemo(() => {
        const statistics = getTheChartData({
            filterOption,
            chartKey: chart_key,
            data,
            selectedMonth
        } as GetTheChartDataType)
        return JSON.parse(JSON.stringify(statistics))
    }, [data, chart_key, filterOption, selectedMonth])

    const xAxisLabel = useMemo((): string => getAxisLabel(selectedMonth, filterOption), [selectedMonth, filterOption])

    return (
        <div>
            <div className='py-5 flex items-center'>
                <Select
                    label='Filter options'
                    value={filterOption}
                    options={filterOptionsForChartData}
                    onChange={setFilterOption}
                    sx={{
                        width: 'max-content',
                        minWidth: '200px',
                        marginRight: '15px'
                    }}
                />
                {filterOption === 'yearly' &&
                    <h4 style={{ marginLeft: '15px', color: '#FF0000' }}>* At this moment current year data is present, later past years drop-down will be visible</h4>
                }
                {filterOption === 'monthly' && <Select
                    value={selectedMonth}
                    options={Object.keys(months).map((key) => ({
                        label: months[key],
                        value: key
                    })).filter(({ value }) => +value <= +dayjs(new Date).get('M'))}
                    onChange={(value) => setSelectedMonth(+value)}
                />}
                {filterOption === 'custom' && <DateRange />}
                {filterOption === 'custom' &&
                    <h4 style={{ marginLeft: '15px', color: '#FF0000' }}>Working is progress, feature will be available soon</h4>
                }
            </div>
            {statisticsData.tableData.length === 0 && <div>No Data available</div>}
            {statisticsData.tableData.length > 0 && <div className='grid row-auto sm-grid-cols-1 xl:grid-cols-2 gap-6 bg-gray-100 px-4'>
                <Table
                    columns={tableColumns}
                    rows={statisticsData.tableData}
                    isSelect={false}
                />
                <Line
                    data={statisticsData.chartData}
                    yAxisLabel={label}
                    xAxisLabel={xAxisLabel}
                />
            </div>}

        </div>
    )
}

export default memo(SalesAnalysis);