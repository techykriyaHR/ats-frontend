"use client"

import React from "react"
import { FaSpinner, FaCircleNotch, FaSyncAlt, FaCircle } from "react-icons/fa"

/**
 * Enhanced Loader component with responsive design and customization options
 * @param {Object} props - Component props
 * @param {string} props.type - Type of spinner ('spinner', 'circle', 'sync', 'dots')
 * @param {string} props.size - Size of the spinner ('sm', 'md', 'lg', 'xl')
 * @param {string} props.color - Color of the spinner
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.fullScreen - Whether to display in fullscreen
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.theme - Theme color scheme
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

  // Map size to actual CSS values (responsive)
  const sizeMap = {
    sm: { default: "1rem", tablet: "1.25rem", desktop: "1.5rem" },
    md: { default: "1.5rem", tablet: "1.75rem", desktop: "2rem" },
    lg: { default: "2rem", tablet: "2.5rem", desktop: "3rem" },
    xl: { default: "2.5rem", tablet: "3rem", desktop: "4rem" },
  }

  // Get size based on screen width
  const [currentSize, setCurrentSize] = React.useState(sizeMap[size].default)

  // Update size based on screen width
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setCurrentSize(sizeMap[size].default)
      } else if (width < 1024) {
        setCurrentSize(sizeMap[size].tablet)
      } else {
        setCurrentSize(sizeMap[size].desktop)
      }
    }

    // Initial setup
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [size])

  // Choose the icon based on type
  const icons = {
    spinner: FaSpinner,
    circle: FaCircleNotch,
    sync: FaSyncAlt,
    dots: FaCircle,
  }

  const Icon = icons[type] || FaSpinner

  // Create keyframes for animations
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

      @media (max-width: 640px) {
        .loader-container {
          padding: 0.5rem !important;
        }
        .loader-text {
          font-size: 0.875rem !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Dynamic text size based on screen width
  const [textSize, setTextSize] = React.useState("1rem")

  React.useEffect(() => {
    const handleTextResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setTextSize("0.875rem")
      } else if (width < 1024) {
        setTextSize("1rem")
      } else {
        setTextSize("1.125rem")
      }
    }

    // Initial setup
    handleTextResize()

    // Add event listener
    window.addEventListener('resize', handleTextResize)

    // Clean up
    return () => window.removeEventListener('resize', handleTextResize)
  }, [])

  // Container styles with responsive padding and overflow handling
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: fullScreen ? "80vh" : "auto",
    width: "100%",
    backgroundColor: fullScreen ? tealPalette.light : "transparent",
    padding: "1rem",
    boxSizing: "border-box",
    overflow: "hidden", // Prevent overflow
    maxWidth: "100vw", // Ensure it doesn't exceed viewport width
    maxHeight: "100vh", // Ensure it doesn't exceed viewport height
  }

  // Render dots animation
  if (type === "dots") {
    return (
      <div style={containerStyle} className={`loader-container ${className}`} role="status" aria-live="polite">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[0, 1, 2].map((i) => (
            <FaCircle
              key={i}
              style={{
                color: i === 0 ? tealPalette.primary : i === 1 ? tealPalette.secondary : tealPalette.primary,
                width: currentSize,
                height: currentSize,
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        {text && (
          <span
            className="loader-text"
            style={{
              marginTop: "1rem",
              color: tealPalette.secondary,
              fontWeight: "medium",
              fontSize: textSize,
              textAlign: "center",
              maxWidth: "100%",
              wordBreak: "break-word",
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
    <div style={containerStyle} className={`loader-container ${className}`} role="status" aria-live="polite">
      <Icon
        style={{
          color,
          width: currentSize,
          height: currentSize,
          animation: "spin 1s linear infinite",
        }}
        aria-hidden="true"
      />
      {text && (
        <span
          className="loader-text"
          style={{
            marginTop: "1rem",
            color: tealPalette.secondary,
            fontWeight: "medium",
            fontSize: textSize,
            textAlign: "center",
            maxWidth: "100%",
            wordBreak: "break-word",
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