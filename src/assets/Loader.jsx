"use client"

import React from "react"
import { FaSpinner, FaCircleNotch, FaSyncAlt, FaCircle } from "react-icons/fa"

/**
 * Enhanced Loader component with customization options
 * @param {Object} props - Component props
 * @param {string} props.type - Type of spinner ('spinner', 'circle', 'sync', 'dots')
 * @param {string} props.size - Size of the spinner ('sm', 'md', 'lg', 'xl')
 * @param {string} props.color - Color of the spinner
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.fullScreen - Whether to display in fullscreen
 * @param {string} props.className - Additional CSS classes
 */
function Loader({
  type = "spinner",
  size = "xl",
  color = "#008080", // primary teal
  text = "Loading...",
  fullScreen = false,
  className = "",
  theme = "teal",
}) {
  // Teal color palette
  const tealPalette = {
    primary: "#008080",
    secondary: "#66b2b2",
    light: "#d9ebeb",
  }

  // Map size to actual CSS classes
  const sizeMap = {
    sm: "1.5rem",
    md: "2rem",
    lg: "3rem",
    xl: "4rem",
  }

  // Choose the icon based on type
  const icons = {
    spinner: FaSpinner,
    circle: FaCircleNotch,
    sync: FaSyncAlt,
    dots: FaCircle,
  }

  const Icon = icons[type] || FaSpinner

  // Animation styles
  const animationStyle =
    type === "dots"
      ? {
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }
      : {
          animation: "spin 1s linear infinite",
        }

  // Create keyframes for spin animation
  React.useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 0.5;
          transform: scale(0.8);
        }
        50% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Container styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: fullScreen ? "100vh" : "auto",
    width: "100%",
    backgroundColor: fullScreen ? tealPalette.light : "transparent",
    padding: "1rem",
  }

  // Render dots animation
  if (type === "dots") {
    return (
      <div style={containerStyle} className={className} role="status" aria-live="polite">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[0, 1, 2].map((i) => (
            <FaCircle
              key={i}
              style={{
                color: i === 0 ? tealPalette.primary : i === 1 ? tealPalette.secondary : tealPalette.primary,
                width: sizeMap[size],
                height: sizeMap[size],
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        {text && (
          <span
            style={{
              marginTop: "1rem",
              color: tealPalette.secondary,
              fontWeight: "medium",
            }}
          >
            {text}
          </span>
        )}
        <span
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
          }}
        >
          Loading content
        </span>
      </div>
    )
  }

  // Render standard spinner
  return (
    <div style={containerStyle} className={className} role="status" aria-live="polite">
      <Icon
        style={{
          color,
          width: sizeMap[size],
          height: sizeMap[size],
          animation: "spin 1s linear infinite",
        }}
        aria-hidden="true"
      />
      {text && (
        <span
          style={{
            marginTop: "1rem",
            color: tealPalette.secondary,
            fontWeight: "medium",
          }}
        >
          {text}
        </span>
      )}
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: "0",
        }}
      >
        Loading content
      </span>
    </div>
  )
}

export default Loader

