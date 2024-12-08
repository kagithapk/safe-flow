export const getUsernameFromEmail = (email: string) => {
	return email.split('@')[0];
};
