'use client';
import { ClickableCard } from '@/components/custom/ClickableCard';
import { IApp } from '@/models/apps';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface IAppCardProps {
	name: IApp['name'];
	path: IApp['path'];
}

export const AppCard: FC<IAppCardProps> = ({ name, path }) => {
	const handleClick = () => {
		redirect(path);
	};

	return <ClickableCard title={name} handleClick={handleClick} />;
};
