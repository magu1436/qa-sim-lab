import type { FC } from "react"

import { Button, DialogActions, DialogContent, DialogTitle, Dialog as MUIDialog } from "@mui/material"

type ActionsProps = {
    submitButtonlabel: string,
    cancelButtonLabel: string,
    onSubmit?: () => void,
    onCancel?: () => void,
}

type DialogProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    children: React.ReactNode[],
    actions?: ActionsProps,
}

/**
 * QASim Lab 共通で使用するカスタムダイアログコンポーネント
 */
const Dialog: FC<DialogProps> = ({ open, onClose, title, children, actions }) => {
    return (
        <MUIDialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            {actions && (
                <DialogActions>
                    <Button onClick={actions.onCancel}>{actions.cancelButtonLabel}</Button>
                    <Button type="submit" onClick={actions.onSubmit}>{actions.submitButtonlabel}</Button>
                </DialogActions>
            )}
        </MUIDialog>
    );
};

export default Dialog;