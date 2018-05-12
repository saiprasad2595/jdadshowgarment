export interface IGarment {
    id: number,
    imgUrls?: Array<string>,
    washInstructions: Array<string>,
    styleInstruction: Array<string>
}
export interface IReview {
    name?: string,
    emailId?: string,
    comments?: string,
    id?: number,
    reviewUrl ? : string
}