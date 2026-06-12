The WORKO call-to-action button — solid indigo for primary actions, used anywhere a user commits to a step (start focus, add task, sign up).

```jsx
<Button variant="primary" size="md" onClick={start}>Start focus</Button>
<Button variant="secondary">Skip</Button>
<Button variant="ghost">Cancel</Button>
```

Variants: `primary` (solid indigo), `secondary` (white + border), `ghost` (text only), `accent` (cyan). Sizes `sm | md | lg`. Supports `leadingIcon`/`trailingIcon`, `fullWidth`, `disabled`. Hover darkens the fill; press scales to 0.97.
