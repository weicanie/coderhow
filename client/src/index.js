import ReactDOM from 'react-dom/client';
import App from '@/views/App';
import 'assets/css/reset.less';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from 'styled-components';
import theme from './assets/theme';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
	<div>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter>
					<Suspense fallback={'loading~'}>
						<App />
					</Suspense>
				</BrowserRouter>
			</Provider>
		</ThemeProvider>
	</div>
);
