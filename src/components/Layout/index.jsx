import React from "react"
import { wrapper } from "./style"

export default function Layout({ children }) {
  return <div css={wrapper}>{children}</div>
}
