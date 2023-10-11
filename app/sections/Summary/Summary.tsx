import { FC, memo, useMemo } from 'react';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { SummaryProps } from './Summary.types';

/**
 * SECTIONS - Summary
 */
const Summary: FC<SummaryProps> = ({ data }) => {
    const statisticsData = useMemo(() => {
        return {
            adsCost: (data.reduce((a, b) => a + +b.ads_cost, 0) / data.length).toFixed(2),
            revenue: (data.reduce((a, b) => a + +b.revenue, 0) / data.length).toFixed(2),
            revenueProjected: (data.reduce((a, b) => a + +b.revenue_projected, 0) / data.length).toFixed(2),
            ppcRevenue: (data.reduce((a, b) => a + +b.ppc_revenue, 0) / data.length).toFixed(2),

        }
    }, [data])
    return (
        <Card className='bg-gray-100 pb-4 m-4'>
            <Typography className='text-4xl font-bold p-4'>
                <strong>Current year data</strong> (Average data)
            </Typography>
            <Box className='grid md:grid-cols-2 xl:grid-cols-4 gap-6 bg-gray-100 p-4'>
                <Card className='flex items-center bg-white shadow rounded-lg flex-col justify-between'>
                    <div className='flex justify-between w-full p-4 m-4'>
                        <h3> Advertisement Cost</h3> <strong>${statisticsData.adsCost}</strong>
                    </div>
                    <div className='h-2 bg-red-500 w-full'></div>
                </Card>
                <Card className='flex items-center bg-white shadow rounded-lg flex-col justify-between'>
                    <div className='flex justify-between w-full p-4 m-4'>
                        <h3>Revenue</h3> <strong>${statisticsData.revenue}</strong>
                    </div>
                    <div className='h-2 bg-green-500 w-full'></div>
                </Card>
                <Card className='flex items-center bg-white shadow rounded-lg flex-col justify-between'>
                    <div className='flex justify-between w-full m-4 p-4'>
                        <h3>Revenue Projected</h3> <strong>${statisticsData.revenueProjected}</strong>
                    </div>
                    <div className='h-2 bg-yellow-500 w-full'></div>
                </Card>
                <Card className='flex items-center bg-white shadow rounded-lg flex-col justify-between'>
                    <div className='flex justify-between w-full m-4 p-4'>
                        <h3>PPC Revenue (pay per click)</h3> <strong>${statisticsData.ppcRevenue}</strong>
                    </div>
                    <div className='h-2 bg-blue-500 w-full '></div>
                </Card>
            </Box>
        </Card>
    )
}

export default memo(Summary)