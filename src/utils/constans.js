const isEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
}

const regName = (email) => {
    return /^[а-яА-ЯёЁa-zA-Z\s-]+$/img.test(email);
}

module.exports = {
    regName,
    isEmail
};
