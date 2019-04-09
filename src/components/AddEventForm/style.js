import { css } from '@emotion/core'

export const form = css`
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;

    & > * {
        margin-bottom: 10px;
        width: 100%;
    }
`
export const time = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > [type='time'] {
        flex: auto;
    }

    label {
        width: 80px;
    }
`
