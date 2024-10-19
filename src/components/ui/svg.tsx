import React from "react"


export default function NoImage() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 400">
        <rect width="400" height="400" fill="#e2e8f0" />
        <text
          x="200"
          y="200"
          font-family="system-ui, sans-serif"
          font-size="24"
          fill="#64748b"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          400 x 400
        </text>
      </svg>
    )
}