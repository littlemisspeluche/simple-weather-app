import styled from 'styled-components';

export const SunriseToSunSetScaleWrapper = styled.div<{ point: number; }>`
    .arc {
        width: 250px;
        aspect-ratio: 2/1;
        border: 10px dotted rgba(255, 255, 255, 0.6);
        border-bottom: 0;
        border-radius: 200px 200px 0 0;
        box-sizing: border-box;
        display: grid;
    }

    .arc > div {
        aspect-ratio: 1/1;
        grid-area: 1/1;
        border-radius: 50%;
        width: 25px;
        margin: auto auto -10px;
        background: linear-gradient(190deg, rgba(242,190,34,1) 0%, rgba(255,255,255,1) 100%);
        border: 1px solid rgba(255, 255, 255, 0.6);
        transform: ${({ point }) => `rotate(calc(180deg*${point} - 180deg)) translate(120px)`};
    }

    .arc:before {
        margin: auto auto -5px -10px;
    }

    .arc:after {
        margin: auto -10px -5px auto;
    }
`