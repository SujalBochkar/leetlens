/**
 * Global Color System - Production Configuration
 *
 * This file defines all colors used throughout the application.
 * Use these constants for consistency and easy theme management.
 *
 * USAGE:
 * - For Tailwind classes: Use the CSS variable classes (e.g., `text-foreground`, `bg-surface-primary`)
 * - For JS/TS code: Import colors from this file
 *
 * NAMING CONVENTIONS:
 * - Semantic names (primary, secondary, etc.) over color names (blue, green, etc.)
 * - Surface for backgrounds, text for foregrounds
 * - Use numbered variants for hierarchy (100, 200, 300 = lighter to darker)
 */

// ============================================================================
// BRAND COLORS
// ============================================================================

export const brand = {
	primary: 'var(--brand-primary)', // Main brand color - Emerald
	primaryHover: 'var(--brand-primary-hover)',
	primaryMuted: 'var(--brand-primary-muted)',
	secondary: 'var(--brand-secondary)', // Secondary brand color
	accent: 'var(--brand-accent)', // Accent highlights - Orange
	accentHover: 'var(--brand-accent-hover)',
} as const;

// ============================================================================
// DIFFICULTY COLORS (LeetCode specific)
// ============================================================================

export const difficulty = {
	easy: {
		text: 'var(--difficulty-easy)',
		bg: 'var(--difficulty-easy-bg)',
		border: 'var(--difficulty-easy-border)',
	},
	medium: {
		text: 'var(--difficulty-medium)',
		bg: 'var(--difficulty-medium-bg)',
		border: 'var(--difficulty-medium-border)',
	},
	hard: {
		text: 'var(--difficulty-hard)',
		bg: 'var(--difficulty-hard-bg)',
		border: 'var(--difficulty-hard-border)',
	},
} as const;

// ============================================================================
// STATUS COLORS
// ============================================================================

export const status = {
	success: 'var(--status-success)',
	successBg: 'var(--status-success-bg)',
	warning: 'var(--status-warning)',
	warningBg: 'var(--status-warning-bg)',
	error: 'var(--status-error)',
	errorBg: 'var(--status-error-bg)',
	info: 'var(--status-info)',
	infoBg: 'var(--status-info-bg)',
} as const;

// ============================================================================
// SURFACE COLORS (Backgrounds)
// ============================================================================

export const surface = {
	// Main backgrounds
	page: 'var(--surface-page)', // Page background
	primary: 'var(--surface-primary)', // Primary surface (cards, containers)
	secondary: 'var(--surface-secondary)', // Secondary surface (nested elements)
	tertiary: 'var(--surface-tertiary)', // Tertiary surface (deep nested)

	// Interactive surfaces
	hover: 'var(--surface-hover)', // Hover state
	active: 'var(--surface-active)', // Active/pressed state
	selected: 'var(--surface-selected)', // Selected state

	// Overlay
	overlay: 'var(--surface-overlay)', // Modal/dialog overlays
} as const;

// ============================================================================
// TEXT COLORS
// ============================================================================

export const text = {
	primary: 'var(--text-primary)', // Main text
	secondary: 'var(--text-secondary)', // Secondary text
	tertiary: 'var(--text-tertiary)', // Tertiary/muted text
	disabled: 'var(--text-disabled)', // Disabled text
	inverse: 'var(--text-inverse)', // Text on dark backgrounds
	link: 'var(--text-link)', // Link text
	linkHover: 'var(--text-link-hover)', // Link hover text
} as const;

// ============================================================================
// BORDER COLORS
// ============================================================================

export const border = {
	primary: 'var(--border-primary)', // Default borders
	secondary: 'var(--border-secondary)', // Subtle borders
	focus: 'var(--border-focus)', // Focus state
	error: 'var(--border-error)', // Error state
} as const;

// ============================================================================
// CHART COLORS (for data visualization)
// ============================================================================

export const chart = {
	1: 'var(--chart-1)',
	2: 'var(--chart-2)',
	3: 'var(--chart-3)',
	4: 'var(--chart-4)',
	5: 'var(--chart-5)',
} as const;

// ============================================================================
// TAILWIND CLASS MAPPINGS
// These are the recommended Tailwind classes to use
// ============================================================================

export const tw = {
	// Backgrounds
	bgPage: 'bg-surface-page',
	bgPrimary: 'bg-surface-primary',
	bgSecondary: 'bg-surface-secondary',
	bgTertiary: 'bg-surface-tertiary',
	bgHover: 'hover:bg-surface-hover',
	bgSelected: 'bg-surface-selected',

	// Text
	textPrimary: 'text-text-primary',
	textSecondary: 'text-text-secondary',
	textTertiary: 'text-text-tertiary',
	textDisabled: 'text-text-disabled',

	// Brand
	textBrand: 'text-brand-primary',
	bgBrand: 'bg-brand-primary',
	textAccent: 'text-brand-accent',
	bgAccent: 'bg-brand-accent',

	// Borders
	borderPrimary: 'border-border-primary',
	borderSecondary: 'border-border-secondary',
	borderFocus: 'focus:border-border-focus',

	// Difficulty
	difficultyEasy: 'text-difficulty-easy',
	difficultyMedium: 'text-difficulty-medium',
	difficultyHard: 'text-difficulty-hard',

	// Status
	statusSuccess: 'text-status-success',
	statusWarning: 'text-status-warning',
	statusError: 'text-status-error',
	statusInfo: 'text-status-info',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type BrandColors = typeof brand;
export type DifficultyColors = typeof difficulty;
export type StatusColors = typeof status;
export type SurfaceColors = typeof surface;
export type TextColors = typeof text;
export type BorderColors = typeof border;
export type ChartColors = typeof chart;
