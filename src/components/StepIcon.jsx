export default function StepIcon({ name, className }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", className };

  switch (name) {
    case "camera":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="10" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M17 10.5L21 8v9l-4-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "sensor":
      return (
        <svg {...common}>
          <path d="M6 9a8 8 0 0112 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8.5 12a4.5 4.5 0 017 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1.8" fill="currentColor" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <rect x="14" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <rect x="4" y="14" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <rect x="14" y="14" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "chevron-up":
      return (
        <svg {...common} width="14" height="14">
          <path d="M5 13l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common} width="14" height="14">
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
