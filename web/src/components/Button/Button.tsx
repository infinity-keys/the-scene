import { Link } from '@redwoodjs/router'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  to?: string
  href?: string
  fullWidth?: boolean
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
  disabled = false,
}: ButtonProps) => {
  const classes = clsx(
    "border bg-blend-lighten bg-cover hover:bg-accent/30 hover:border-accent transition-colors text-white rounded-none px-4 font-medium py-[2px] drop-shadow-[0_0_10px_rgba(0,0,0,1)] bg-[url('/images/static.webp')]",
    // Width
    { 'w-full': fullWidth },
    // Borders
    { 'border-white': accent },
    { 'border-accent': !accent },
    // Disabled Button
    {
      'bg-neutral-500 border-neutral-500 hover:border-neutral-500 hover:bg-neutral-500':
        disabled,
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
