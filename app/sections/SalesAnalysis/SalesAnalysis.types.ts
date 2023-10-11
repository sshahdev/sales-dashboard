import { DataObjectKey } from "@/app/types"

export type SalesAnalysisProps = {
    data: any
    // Which value need to pick to display in chart
    chart_key: ChartKeyType,
    label: string
}

export type ChartKeyType = Extract<DataObjectKey, 'units' | 'ads_cost' | 'ppc_revenue' | 'revenue' | 'cogs'>