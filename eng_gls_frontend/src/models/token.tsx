export interface Token {
    refresh: string,
    access: string
}

export interface UserDataFromToken {
    user_id: number,
    user_name: string
}