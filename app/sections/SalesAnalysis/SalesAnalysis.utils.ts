import dayjs from "dayjs"

import { months } from "@/app/data"

import { calculateMonthAverage } from "@/utils/utils"

import { DataObject } from "@/app/types"
import { ChartKeyType } from "./SalesAnalysis.types"

export type GetTheChartDataType = {
    filterOption: string
    data: DataObject[]
    chartKey: ChartKeyType
    selectedMonth: number
}

export const getTheChartData = ({
    filterOption,
    chartKey,
    selectedMonth,
    data
}: GetTheChartDataType) => {
    switch(filterOption) {
        case 'yearly': {
            return getYearlyData(data, chartKey)
        }
        case 'monthly': {
            return getMonthlyData(data, chartKey, selectedMonth)
        }
        default: {
            return getYearlyData(data, chartKey)
        }
    }
}

const getMonthlyData = (data: DataObject[], chartKey: ChartKeyType, selectedMonth: number) => {
    const monthlyData: DataObject[] = data.filter(({date}) => dayjs(date).get('M') === selectedMonth)
    return {
        tableData: monthlyData.map((item: DataObject) => ({
            date: dayjs(item.date).format('DD MMMM, YYYY'),
            currentYear: Math.round(+item[`${chartKey}`]),
            lastYear: Math.round(+item[`${chartKey}_lastyear`]),
            upcomingYear: item[`${chartKey}_projected`] ? Math.round(Number(item[`${chartKey}_projected`])) : 0,
        })),
        chartData: [{
            id: 'Previous Year',
            data: monthlyData.map((item) => ({
                x: dayjs(item.date).format('DD'),
                y: item[`${chartKey}_lastyear`]
            }))
        }, {
            id: 'Current Year',
            data: monthlyData.map((item) => ({
                x: dayjs(item.date).format('DD'),
                y: item[`${chartKey}`]
            }))
        },
        {
            id: 'Upcoming Year',
            data: monthlyData.map((item) => ({
                x: dayjs(item.date).format('DD'),
                y: item[`${chartKey}_projected`]
            }))
        }]
    }
}

const getYearlyData = (data: DataObject[], chart_key: ChartKeyType) => {
const currentYearData = calculateMonthAverage(data, chart_key)
        const lastYearData = calculateMonthAverage(data, `${chart_key}_lastyear`)
        const upcomingYearData = calculateMonthAverage(data, `${chart_key}_projected`)
        return {
            tableData: data.map((item: DataObject) => ({
                date: dayjs(item.date).format('DD MMMM, YYYY'),
                currentYear: Math.round(+item[`${chart_key}`]),
                lastYear: Math.round(+item[`${chart_key}_lastyear`]),
                upcomingYear: item[`${chart_key}_projected`] ? Math.round(Number(item[`${chart_key}_projected`])) : 0,
            })),
            chartData: [{
                id: 'Previous Year',
                data: Object.keys(lastYearData).map((item) => ({
                    x: months[item],
                    y: lastYearData[item]
                }))
            }, {
                id: 'Current Year',
                data: Object.keys(currentYearData).map((item) => ({
                    x: months[item],
                    y: currentYearData[item]
                }))
            },
            {
                id: 'Upcoming Year',
                data: Object.keys(upcomingYearData).map((item) => ({
                    x: months[item],
                    y: upcomingYearData[item]
                }))
            }]
        }
}

export const getAxisLabel = (selectedMonth: number, filterOption: string): string => {
    switch(filterOption) {
        case 'yearly': return 'Months';
        case 'monthly': return `${months[selectedMonth]}, ${dayjs(new Date()).format('YYYY')}`
        default: return 'Months';
    }
}