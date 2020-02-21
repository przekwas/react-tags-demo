export const json = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
	const headers: any = {
		'Content-type': 'application/json'
	};

	try {
		let res = await fetch(uri, {
			method,
			headers,
			body: JSON.stringify(body)
		});

		if (res.ok) {
			return <T>await res.json();
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};
