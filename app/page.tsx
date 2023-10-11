'use client'
import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import axios from 'axios';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Alert from '@/components/Alert/Alert';

import { DataObject } from './types'

import './page.css'

const DailyDifference = lazy(() => import('./sections/DailyDifference/DailyDifference'))
const SalesAnalysis = lazy(() => import('./sections/SalesAnalysis/SalesAnalysis'))
const Summary = lazy(() => import('./sections/Summary/Summary'))

import { statisticsData } from './data';

const API_URL = 'https://dev-api2.profasee.com/reports/test-data'
export default function Home() {
  const [statistics, setStatistics] = useState<DataObject[]>(statisticsData)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setIsError] = useState<string>('')

  const getStatisticsData = useCallback(async () => {
    try {
      const { data: { payload: { results } } } = await axios.get(`${API_URL}`)
      setStatistics(results)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        setStatistics([])
        setIsLoading(false)
        setIsError(error.message)
      }
    }
  }, [])

  useEffect(() => {
    // api s private now
    // getStatisticsData()
  }, [getStatisticsData])

  if (isLoading && !statistics.length || error) {
    return (
      <div className='bg-gray-100 w-full h-screen'>
        {isLoading && 'Loading Content...'}
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    )
  }

  return (
    <div className='w-full h-screen'>
      <Suspense fallback='Loading...'>
        <Summary data={statistics} />
      </Suspense>
      <div className='p-4 bg-gray flex w-full '>
        <div className='transition-shadow border rounded-lg shadow-sm hover:shadow-lg w-full'>
          <Accordion className='mt-0 shadow-none'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              defaultChecked={true}
            >
              <Typography>Daily Differences</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Suspense fallback="Loading...">
                <DailyDifference data={statistics} />
              </Suspense>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Suspense fallback="Loading...">
        <div className='grid grid-cols-1 gap-5  sm:grid-cols-2 lg:grid-cols-1 p-4'>

          <div className=' transition-shadow border rounded-lg shadow-sm hover:shadow-lg'>
            <Accordion className='mt-0 shadow-none'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                defaultChecked={true}
              >
                <Typography>Units</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SalesAnalysis data={statistics} chart_key='units' label='Units' />
              </AccordionDetails>
            </Accordion>
          </div>

          <div className=' transition-shadow border rounded-lg shadow-sm hover:shadow-lg'>
            <Accordion className='mt-0 shadow-none'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                defaultChecked={true}
              >
                <Typography>Revenue</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SalesAnalysis data={statistics} chart_key='revenue' label='Revenue' />
              </AccordionDetails>
            </Accordion>
          </div>

          <div className=' transition-shadow border rounded-lg shadow-sm hover:shadow-lg'>

            <Accordion className='mt-0 shadow-none'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                defaultChecked={true}
              >
                <Typography>Adjusted PPC Revenue</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SalesAnalysis data={statistics} chart_key='ppc_revenue' label='Adjusted PPC Revenue' />
              </AccordionDetails>
            </Accordion>
          </div>

          <div className=' transition-shadow border rounded-lg shadow-sm hover:shadow-lg'>
            <Accordion className='mt-0 shadow-none'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                defaultChecked={true}
              >
                <Typography>Advertisement Cost</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SalesAnalysis data={statistics} chart_key='ads_cost' label='Advertisement Cost' />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className=' transition-shadow border rounded-lg shadow-sm hover:shadow-lg'>

            <Accordion className='mt-0 shadow-none'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                defaultChecked={true}
              >
                <Typography>Cost of Goods Sold</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SalesAnalysis data={statistics} chart_key='cogs' label='Cost of Goods Sold' />
              </AccordionDetails>
            </Accordion>
          </div>

        </div>
      </Suspense>
    </div>
  )
}
