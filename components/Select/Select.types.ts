import { SelectProps } from '@mui/material'
import { DataObject } from '@/app/types'

export type BasicSelectProps = Omit<SelectProps<string>, 'onChange' | 'value'> & {
    value: any,
    onChange: (value: keyof DataObject | any) => void,
    options: Array<{
        label: string,
        value: string,
    }>
}