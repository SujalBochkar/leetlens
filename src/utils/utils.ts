export const calculateAcceptanceRate = (accepted: number, submitted: number): string => {
	return ((accepted / submitted) * 100).toFixed(1);
};

export const formatNumber = (num: number): string => {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return num.toString();
};
