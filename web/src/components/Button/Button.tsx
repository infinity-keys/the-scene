import { Link } from '@redwoodjs/router'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  to?: string
  href?: string
  outline?: boolean
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  border?: boolean
  color?: boolean
  onClick?: () => void
}

const Button = ({
  children = 'click here',
  to,
  href,
  onClick,
  type,
  border = true,
  color = true,
  outline = false,
  fullWidth = false,
  disabled = false,
}: ButtonProps) => {
  const classes = clsx(
    "border bg-blend-lighten bg-cover hover:bg-accent/30 hover:border-accent transition-colors text-white rounded-none px-4 font-medium py-[2px] drop-shadow-[0_0_10px_rgba(0,0,0,1)] bg-[url('/images/static.webp')]",
    { 'bg-neutral-750': outline },
    { 'bg-accent': !outline },
    { 'w-full': fullWidth },
    // Borders
    { 'border-white': border },
    { 'border-accent': !border },
    // Color
    { 'bg-black': color },
    { 'bg-accent': !color },
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
