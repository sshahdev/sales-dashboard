import { DataObject, DataObjectKey } from "@/app/types";
type MonthlyData = {
    item: number
    count: number
}

type MonthlyAverage = Record<string, number>

export const calculateMonthAverage = (data: DataObject[], key: DataObjectKey): MonthlyAverage => {
    const monthlyData: { [month: number]: MonthlyData } = {};

    for (const item of data) {
        const date = new Date(item.date);
        const month = date.getMonth();
        const cogsValue = parseFloat(item[key] as string);

        if (monthlyData[month]) {
            monthlyData[month]['item'] += cogsValue;
            monthlyData[month].count += 1;
        } else {
            monthlyData[month] = {
                item: cogsValue,
                count: 1,
            };
        }
    }

    const monthlyAverage: MonthlyAverage = {};
    for (const month in monthlyData) {
        if (monthlyData.hasOwnProperty(month) && monthlyData[month].count > 0) {
            monthlyAverage[month] = +(monthlyData[month].item / monthlyData[month].count).toFixed(2);
            if(isNaN(monthlyAverage[month])) {
                monthlyAverage[month] = 0
            }
        }
    }

    return monthlyAverage;
};

export const calculateDailyAverage = () => {

}
