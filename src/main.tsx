import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './utilities/authProvider';
import {NotificationsProvider} from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<NotificationsProvider>
					<App />
				</NotificationsProvider>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
);
