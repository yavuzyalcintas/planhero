import React from 'react';
import type {TextInputProps} from '@mantine/core';
import {TextInput, ActionIcon, useMantineTheme} from '@mantine/core';
import {IconArrowRight, IconArrowLeft} from '@tabler/icons';

export function InputWithButton(
	props: TextInputProps,
	placeholder: string,
	onActionIconClick: () => Promise<void>,
) {
	const theme = useMantineTheme();

	return (
		<TextInput
			//   Icon={<IconSearch size={18} stroke={1.5} />}
			radius='xl'
			size='md'
			rightSection={
				<ActionIcon
					size={32}
					radius='xl'
					color={theme.primaryColor}
					variant='filled'
					onClick={async () => onActionIconClick()}
				>
					{theme.dir === 'ltr' ? (
						<IconArrowRight size={18} stroke={1.5} />
					) : (
						<IconArrowLeft size={18} stroke={1.5} />
					)}
				</ActionIcon>
			}
			placeholder={placeholder}
			rightSectionWidth={42}
			{...props}
		/>
	);
}