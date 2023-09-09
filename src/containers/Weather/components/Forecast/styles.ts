import styled from 'styled-components';

export const ForecastTempsScaleWrapper = styled.div<{ max: number; min: number; average: number; backgroundColor: string }>`
.arc {
    width: 10rem;
    border-bottom: 0.2rem solid rgba(255, 255, 255, 0.6);
    box-sizing: border-box;
    position: relative;
    border-radius: 1rem;

    @media screen and (max-width: 640px) {
        width: 7rem;
    }
}

.arc div {
    border-radius: 50%;
    aspect-ratio: 1/1;
    width: 0.75rem;
    margin: auto auto -0.45rem;
    background: #ffffff;
    border: ${({ backgroundColor }) => `1px solid ${backgroundColor}`};
    position: absolute;
    
    /* Position at the bottom of the line */
    bottom: 0; 

    /* Position based on average value */
    /* Adjust the 'left' property to change the position based on the average value */
    left: ${({ max, min, average }) => `calc((100% - 10px) * (${average} - ${min}) / (${max} - ${min}))`};
    transform: translateX(-50%);
}
`