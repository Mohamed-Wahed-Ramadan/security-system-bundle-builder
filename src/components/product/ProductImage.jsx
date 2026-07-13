import wyzeLogo from "../../assets/icon.png";

export default function ProductImage({ shape, tint = "#F5F5F5", size = 72, className = "" }) {
  const body = tint;
  const dark = "#20242C";
  const common = { width: size, height: size, viewBox: "0 0 96 96", className };

  switch (shape) {
    case "camera":
      return (
        <svg {...common}>
          <rect x="18" y="52" width="60" height="8" rx="4" fill="#D8DCE3" />
          <rect x="40" y="30" width="16" height="24" rx="3" fill="#B9BFC9" />
          <circle cx="48" cy="34" r="22" fill={body} stroke="#C7CBD3" strokeWidth="1.5" />
          <circle cx="48" cy="34" r="13" fill={dark} />
          <circle cx="48" cy="34" r="8" fill="#3A4150" />
          <circle cx="44" cy="30" r="2.4" fill="#8B93A6" />
        </svg>
      );
    case "cameraPan":
      return (
        <svg {...common}>
          <rect x="30" y="60" width="36" height="10" rx="4" fill="#D8DCE3" />
          <rect x="40" y="46" width="16" height="16" rx="3" fill="#C7CBD3" />
          <rect x="24" y="18" width="48" height="30" rx="14" fill={body} stroke="#C7CBD3" strokeWidth="1.5" />
          <circle cx="48" cy="33" r="11" fill={dark} />
          <circle cx="48" cy="33" r="6.5" fill="#3A4150" />
          <path d="M20 33a28 28 0 0156 0" stroke="#C7CBD3" strokeWidth="1.4" fill="none" strokeDasharray="3 4" />
        </svg>
      );
    case "floodlight":
      return (
        <svg {...common}>
          <rect x="42" y="54" width="12" height="26" rx="3" fill="#B9BFC9" />
          <rect x="16" y="30" width="26" height="18" rx="4" fill={body} stroke="#C7CBD3" strokeWidth="1.5" />
          <rect x="54" y="30" width="26" height="18" rx="4" fill={body} stroke="#C7CBD3" strokeWidth="1.5" />
          <circle cx="48" cy="44" r="10" fill={dark} />
          <circle cx="48" cy="44" r="5.5" fill="#4C5568" />
          <path d="M10 22l6 6M86 22l-6 6" stroke="#D8DCE3" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "doorbell":
      return (
        <svg {...common}>
          <rect x="34" y="14" width="28" height="60" rx="10" fill={dark} />
          <circle cx="48" cy="34" r="7" fill="#3A4150" />
          <rect x="42" y="50" width="12" height="12" rx="3" fill="#5B4FE5" />
        </svg>
      );
    case "batteryCam":
      return (
        <svg {...common}>
          <rect x="38" y="46" width="20" height="10" rx="5" fill="#B9BFC9" />
          <circle cx="48" cy="30" r="20" fill={body} stroke="#C7CBD3" strokeWidth="1.5" />
          <circle cx="48" cy="30" r="10" fill={dark} />
          <circle cx="48" cy="30" r="5.5" fill="#3A4150" />
          <rect x="30" y="58" width="36" height="20" rx="6" fill="#C7CBD3" />
        </svg>
      );
    case "sensor":
      return (
        <svg {...common}>
          <rect x="28" y="34" width="40" height="28" rx="8" fill="#F5F5F5" stroke="#D8DCE3" strokeWidth="1.5" />
          <circle cx="48" cy="48" r="6" fill="#B9BFC9" />
        </svg>
      );
    case "hub":
      return (
        <svg {...common}>
          <rect x="22" y="24" width="52" height="48" rx="10" fill="#F5F5F5" stroke="#D8DCE3" strokeWidth="1.5" />
          <circle cx="48" cy="48" r="10" fill="#E4E7EC" />
          <circle cx="48" cy="48" r="4" fill="#5B4FE5" />
        </svg>
      );
    case "sdcard":
      return (
        <svg {...common}>
          <path d="M30 16h28l10 10v54a4 4 0 01-4 4H30a4 4 0 01-4-4V20a4 4 0 014-4z" fill={dark} />
          <rect x="34" y="24" width="6" height="14" fill="#C7CBD3" />
          <rect x="44" y="24" width="6" height="14" fill="#C7CBD3" />
          <rect x="54" y="24" width="6" height="14" fill="#C7CBD3" />
        </svg>
      );
    case "plan":
      return (
        <svg {...common}>
          <foreignObject width="96" height="96">
            <img src={wyzeLogo} alt="Wyze logo" width="96" height="96" />
          </foreignObject>
        </svg>
      );
    default:
      return <svg {...common}><rect width="96" height="96" rx="12" fill="#EEE" /></svg>;
  }
}
