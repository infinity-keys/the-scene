import { Link } from '@redwoodjs/router'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  to?: string
  href?: string
  fullWidth?: boolean
  selected?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  accent?: boolean
  onClick?: () => void
}

const Button = ({
  children,
  to,
  href,
  onClick,
  type,
  accent = false,
  fullWidth = false,
  selected = false,
  disabled = false,
}: ButtonProps) => {
  const classes = clsx(
    "button-text-shadow border-2 bg-blend-lighten bg-cover hover:bg-accent/30 hover:border-accent transition-colors text-white inline-block text-center px-4 py-2 bg-[url('/images/static.webp')] uppercase font-bold text-sm relative transition-transform transform hover:scale-105 active:scale-90",
    // Width
    { 'w-full': fullWidth },
    // Borders
    { 'border-white': !accent },
    { 'border-accent': accent },
    // Selected
    { 'bg-accent/30': selected },
    // Disabled Button
    {
      'hover:bg-transparent opacity-50': disabled,
    }
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
