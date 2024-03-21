import { User } from '../models/user';

async function fetchData(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorbody = await response.json();
        const errormessage = errorbody.error;
        throw Error(errormessage);
}
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET"});
    return response.json();
}