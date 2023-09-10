
export const uvIndexMap = (uvIndex) => {
    switch (uvIndex) {
        case 0:
        case 1:
        case 2:
            return 'Low'

        case 3:
        case 4:
        case 5:
            return 'Medium'

        case 6:
        case 7:
            return 'High'

        case 8:
        case 9:
        case 10:
            return 'Very High'

        case 11:
            return 'Extreme'

        default:
            return 'Low'
    };
};
