import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from "date-fns/locale";

export const formatDateToRelativeDate = (date: string | Date): string => {
    const result = formatDistanceToNow(date instanceof Date ? date : new Date(date), {
        addSuffix: true,
        includeSeconds: true,
        locale: ptBR,
    })
    return result
}


export const formatDate = (date: string | Date, formatString = "d 'de' MMMM 'de' yyyy") => {
    return format(date instanceof Date ? date : new Date(date), formatString, { locale: ptBR });
};