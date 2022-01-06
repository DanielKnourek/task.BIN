const apiFetch = <T>(url: string, reqBody: any): Promise<T> => {
  return fetch(url, {
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => {
      // console.log(response) //TODO remove debug
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<{ data: T }>
    })
    .then(data => {
      // console.log(data) //TODO remove debug
      return data.data
    })
}

export default apiFetch;