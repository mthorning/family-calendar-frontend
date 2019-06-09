import { css } from '@emotion/core'

export const form = css`
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;

    & > * {
        margin-bottom: 10px !important;
        width: 100%;
    }
`
export const textFieldStyle = css`
    margin-bottom: 10px;
`
export const saveStyle = css`
    margin-right: 8px;
`
