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
  onClick?: () => void
}

const Button = ({
  children,
  to,
  href,
  onClick,
  type,
  outline = false,
  fullWidth = false,
  disabled = false,
}: ButtonProps) => {
  const classes = clsx(
    'border-2 border-accent hover:bg-accent-dark hover:border-accent-dark transition-colors text-white rounded-full px-4 font-medium py-[2px]',
    { 'bg-neutral-750': outline },
    { 'bg-accent': !outline },
    {
      'bg-neutral-500 border-neutral-500 hover:border-neutral-500 hover:bg-neutral-500':
        disabled,
    },
    { 'w-full': fullWidth }
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
