import ReactDOM from 'react-dom'
import App from './App'

// eslint-disable-next-line react-refresh/only-export-components
export default (container: HTMLElement, label?: string) =>
  ReactDOM.render(<App label={label} />, container)
