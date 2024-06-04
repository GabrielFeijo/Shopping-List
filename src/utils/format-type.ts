export const formatType = (measureType: string) => {
	let unit = '';

	switch (measureType) {
		case 'UNIT':
			unit = 'unidades';
			break;
		case 'LITER':
			unit = 'litros';
			break;
		case 'KILOGRAM':
			unit = 'kg';
			break;
	}

	return unit;
};
