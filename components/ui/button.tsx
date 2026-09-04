import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva('inline-flex items-center justify-center gap-1.5 rounded-sm border text-[10px] tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-50', { variants: { variant: { default: 'border-blue-300/25 bg-slate-950/70 text-blue-100 hover:bg-blue-950/80', ghost: 'border-transparent bg-transparent text-slate-400 hover:text-blue-100 hover:bg-slate-900/70' }, size: { default: 'h-7 px-2.5', icon: 'size-7' } }, defaultVariants: { variant: 'default', size: 'default' } });
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...props }, ref) => { const Comp = asChild ? Slot : 'button'; return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />; });
Button.displayName = 'Button';
