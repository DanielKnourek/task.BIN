const apiFetch = <T>(url: string, reqBody: any): Promise<T> => {
  return fetch(url, {
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
    .then(data => {
      return data;
    })
}

export default apiFetch;

export const enableESToSync = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}