import { Sort, SortPropertyEnum } from "../store/filter/FilterSliceType";

export type SortItem = {

    name: string;
    sortProperty: SortPropertyEnum;



};

export type PopupClick = React.MouseEvent & {
    composedPath: () => Node[]
}

export type SortPopupProps = {
    value: Sort;
}