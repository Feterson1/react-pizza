type SortItem = {

    name: string;
    sortProperty: string;



};

type PopupClick = React.MouseEvent & {
    composedPath: () => Node[]
}