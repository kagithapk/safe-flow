'use client';
import { useActionState } from 'react';

import { signup } from '@/controllers/auth/signup';
import { RegistrationForm } from './registration-form';
import { RegistrationSuccess } from './registration-success';
import { STATUS } from '@/utils/constants';

export default function Signup() {
	const [state, action, isPending] = useActionState(signup, undefined);

	if (state?.status === STATUS.success) {
		return <RegistrationSuccess />;
	}

	return (
		<RegistrationForm state={state} action={action} isPending={isPending} />
	);
}
