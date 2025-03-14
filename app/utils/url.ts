export function getObjFromSearchParams(searchParams: URLSearchParams) {
    const params: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}
