
export interface ConfirmOptions {
    message:string,
    header?:string,
    icon?:string,
    severity?: 'info' | 'warn' | 'success' | 'danger';
    position?: 'top' | 'bottom'| 'left' | 'right' | 'center'|'bottomright'|'bottomleft'|'topright'|'topleft';
    acceptLabel?: string,
    rejectLabel?: string,
    visibleButton?:boolean,
    onAccept?: () => void;
    onReject?:() => void;
}