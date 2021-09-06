export interface User {
    name: string,
    login: string,
    email: string,
    password: string
}

export interface UserLite {
    name: string,
    user: string
}

export interface Base {
    user?: string,
    name: string,
    video: string,
    use?: number,
    _id?: string
}

export interface Message {
    message: string
}

export interface Support {
    user?: string,
    theme: string,
    description: string
}

export interface Workout {
    user?: string,
    name: string,
    description: string,
    date: Date,
    countWeek: Number,
    countDay: Number,
    weeks: [
        days: [
            exercise: string,
            reps: [],
            status?: boolean
        ],
    ],
    image?: string,
    key?: string
}