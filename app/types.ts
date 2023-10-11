export type DataObject = {
    date: string;
    units: string;
    units_lastyear: string;
    revenue: string;
    revenue_lastyear: string;
    cogs: string;
    cogs_lastyear: string;
    ads_cost: number | string;
    ads_cost_lastyear: number | string;
    best_sellers_rank: string;
    best_sellers_rank_lastyear: string;
    ppc_revenue_adjusted: string | null;
    ppc_revenue_adjusted_lastyear: string | null;
    ads_cost_adjusted: string | null;
    ads_cost_adjusted_lastyear: string | null;
    units_dd: string;
    revenue_dd: string;
    cogs_dd: string;
    ads_dd: number | string;
    best_sellers_rank_dd: string;
    units_projected: number | string;
    revenue_projected: number | string;
    cogs_projected: number | string;
    best_sellers_rank_projected: number | string;
    ppc_revenue_dd?: number | null;
    ppc_revenue: number | string;
    ppc_revenue_lastyear: number | string;
    ppc_revenue_projected: number | string | null;
    ads_cost_projected: number | string;
};

export type DataObjectKey = keyof DataObject

export type Options<T> = {
    label: T,
    value: T
}

export type OptionsKey<T> = keyof Options<T>
