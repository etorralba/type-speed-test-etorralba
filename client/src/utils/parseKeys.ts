const parseKeys = (key: string) => {
    return key === 'Enter' ? '\n' : key
}

export default parseKeys;