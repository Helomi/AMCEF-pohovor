export enum TODOITEM_STATUS {
    AKTIVNA = 'AKTÍVNA',
    DOKONCENA = 'DOKONČENÁ',
    ZRUSENA = 'ZRUŠANÁ'
}

export enum GET_TODOLISTS_ORDER {
    ID = 'id',
    TITLE = 'title'
}

export enum ORDER {
    ASC = 'asc',
    DESC = 'desc'
}

export const TODOITEM_STATUSES = Object.values(TODOITEM_STATUS)
export const GET_TODOLISTS_ORDERS = Object.values(GET_TODOLISTS_ORDER)
export const ORDERS = Object.values(ORDER)