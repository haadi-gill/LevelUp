export async function fetchData(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorbody = await response.json();
        const errormessage = errorbody.message;
        throw Error(errormessage);
}
}