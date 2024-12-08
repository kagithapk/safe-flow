'use client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FC } from 'react';

interface IClickableCardProps {
	title: string;
	handleClick?: () => void;
}

export const ClickableCard: FC<IClickableCardProps> = ({
	title,
	handleClick,
}) => (
	<div onClick={handleClick} className="cursor-pointer">
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardContent></CardContent>
			</CardHeader>
		</Card>
	</div>
);
