import React, { cloneElement, FC, ReactNode } from 'react'
import { ListFilters } from './listFilters'

const providers = [<ListFilters.Provider key={"list-filters"} />]

type StoreProps = {
  children: JSX.Element,
}
const Store = ({ children: initial }: StoreProps) => {
  return providers.reduce((children, parent) => cloneElement(parent, { children }), initial)
}

export { Store, ListFilters }

// import React, { cloneElement } from 'react'
// import { Counter } from './counter'

// const providers = [<Counter.Provider key={"counterprovider"} />]

// const Store = ({ children: initial }) =>
//   providers.reduce((children, parent) => cloneElement(parent, { children }), initial)

// export { Store, Counter }
