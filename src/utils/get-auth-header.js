const getAuthHeader = async () => {
    const token = await localStorage.getItem('token');
    return token
        ? { Authorization: `Bearer: ${token}` }
        : {};
};

export { getAuthHeader };
