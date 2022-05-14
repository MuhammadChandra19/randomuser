import { ReactElement, Component } from 'react'
import {render as customRender, RenderOptions} from '@testing-library/react'

const render = (
  ui: ReactElement<any, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)>,
  options?: Omit<RenderOptions, 'wrapper'>
) => customRender(ui, { ...options })

export * from '@testing-library/react'
export { render }