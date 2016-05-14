import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './containers/App'

const store = createStore(
    todoApp,
    {},
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);