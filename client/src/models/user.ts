interface UserBody {
    _id: string;
    username: string;
    email: string;
}

export interface User {
    message: string;
    user: UserBody;
}

