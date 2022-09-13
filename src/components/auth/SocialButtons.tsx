import React from 'react';
import type {ButtonProps} from '@mantine/core';
import {Button, Group} from '@mantine/core';
import {GithubIcon, DiscordIcon, TwitterIcon} from '@mantine/ds';
import {IconBrandGoogle, IconBrandFacebook} from '@tabler/icons';

const GoogleButton: React.FC<ButtonProps> = (props: ButtonProps) => (
	<Button
		leftIcon={<IconBrandGoogle />}
		variant='default'
		color='gray'
		{...props}
	/>
);

const FacebookButton: React.FC<ButtonProps> = (props: ButtonProps) => (
	<Button
		leftIcon={<IconBrandFacebook />}
		sx={theme => ({
			backgroundColor: '#4267B2',
			color: '#fff',
			'&:hover': {
				backgroundColor: theme.fn.darken('#4267B2', 0.1),
			},
		})}
		{...props}
	/>
);

const DiscordButton: React.FC<ButtonProps> = (props: ButtonProps) => (
	<Button
		leftIcon={<DiscordIcon size={16} />}
		sx={theme => ({
			backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
			'&:hover': {
				backgroundColor:
            theme.colorScheme === 'dark'
            	? theme.fn.lighten('#5865F2', 0.05)
            	: theme.fn.darken('#5865F2', 0.05),
			},
		})}
		{...props}
	/>
);

// Twitter button as anchor
const TwitterButton: React.FC<ButtonProps> = (
	props: ButtonProps & React.ComponentPropsWithoutRef<'a'>,
) => (
	<Button
		component='a'
		leftIcon={<TwitterIcon size={16} color='#00ACEE' />}
		variant='default'
		{...props}
	/>
);

const GithubButton: React.FC<ButtonProps> = (props: ButtonProps) => (
	<Button
		{...props}
		leftIcon={<GithubIcon size={16} />}
		sx={theme => ({
			backgroundColor:
          theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
			color: '#fff',
			'&:hover': {
				backgroundColor:
            theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
			},
		})}
	/>
);

const SocialButtons: React.FC = () => (
	<Group position='center' sx={{padding: 15}}>
		<GoogleButton>Continue with Google</GoogleButton>
	</Group>
);

export default {
	SocialButtons,
	GithubButton,
	GoogleButton,
	TwitterButton,
	DiscordButton,
	FacebookButton,
};
