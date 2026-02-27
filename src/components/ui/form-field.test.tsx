import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './form-field';

describe('FormField', () => {
  it('renders label and children', () => {
    render(
      <FormField label="Email" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByText('Email')).toBeDefined();
    expect(screen.getByRole('textbox')).toBeDefined();
  });

  it('does not render error when not provided', () => {
    render(
      <FormField label="Email" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('does not set aria-invalid when no error', () => {
    render(
      <FormField label="Email" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders error with role=alert and correct id', () => {
    render(
      <FormField label="Email" htmlFor="email" error="Invalid email">
        <input id="email" />
      </FormField>,
    );
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Invalid email');
    expect(alert.id).toBe('email-error');
  });

  it('automatically injects aria-describedby onto child input', () => {
    render(
      <FormField label="Name" htmlFor="name" error="Required">
        <input id="name" />
      </FormField>,
    );
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-describedby')).toBe('name-error');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById('name-error')?.textContent).toBe('Required');
  });

  it('does not inject aria-describedby when no error', () => {
    render(
      <FormField label="Name" htmlFor="name">
        <input id="name" />
      </FormField>,
    );
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-describedby')).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormField label="Test" htmlFor="test" className="mt-4">
        <input id="test" />
      </FormField>,
    );
    expect(container.firstElementChild?.className).toContain('mt-4');
  });
});
