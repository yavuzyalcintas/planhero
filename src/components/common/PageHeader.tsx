import React from 'react';
import {Text} from '@mantine/core';

type IPageHeaderProps = {
	text: string;
};

const PageHeader: React.FC<IPageHeaderProps> = ({text}) => (
	<>
		<h1>
			<Text
				component='span'
				variant='gradient'
				gradient={{from: 'yellow', to: 'cyan'}}
				inherit
			>
				{text}
			</Text>
		</h1>
		<hr color='gray' />
	</>
);

export default PageHeader;
