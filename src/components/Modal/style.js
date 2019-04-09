import { css } from '@emotion/core'

export const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100vw;
    height: 100vw;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
`
export const modal = css`
    display: inline-block;
    padding: 30px;
    background: #fff;
`
