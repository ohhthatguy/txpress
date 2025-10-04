export type SharedFileType = {
    name: string,
    size: number,
    url: string,
}

export type SharedDataType = {
    type: "TEXT" | "PASSWORD" | "FILE",
    data: string | SharedFileType,
    time: string
 }