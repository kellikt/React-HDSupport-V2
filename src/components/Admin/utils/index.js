export const createYears = () => {
    let currentYear = new Date().getFullYear();
    const years = [];

    while (currentYear >= 2005) {
        years.push(currentYear);
        currentYear--;
    }

    return years;
};
