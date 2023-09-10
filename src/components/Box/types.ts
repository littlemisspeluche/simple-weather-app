import { ReactElement } from "react";
import { IconType } from 'react-icons';

export type BoxContent = {
    main?: string;
    note?: string;
}

export type BoxChildren = { children?: ReactElement; }

export type TBox = {
    backgroundColor: string;
    content: BoxContent | BoxChildren
    title?: string;
    icon?: IconType;
}
