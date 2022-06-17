const request = async (url = '', optionObj = null, err = null) => {
	try {
		const response = await fetch(url, optionObj);
		if (!response.ok) throw new Error('Please reload the app');
	} catch (error) {
		err = error.message;
	} finally {
		return err;
	}
};

export default request;
