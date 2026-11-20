import { getCountryFlag } from "@/utils/countryFlag";

// White pill with the country's flag and name; position it with `className`.
// `flagOnly` shows just the flag, bare (no pill or background; the name stays in the alt/title).
// A country without a flag file falls back to the full pill so it's never empty.
export default function CountryChip({ country, flagOnly = false, className = "" }) {
  if (!country) return null;
  const flag = getCountryFlag(country);

  if (flagOnly && flag) {
    return (
      <img
        src={flag}
        title={country}
        alt={country}
        className={`w-5 h-3.5 rounded-xs object-cover ring-1 ring-black/10 ${className}`}
      />
    );
  }

  return (
    <div
      title={country}
      className={`flex items-center justify-center gap-1 rounded-full bg-white px-2 py-1 font-raleway text-[10px] font-medium ${className}`}
    >
      {flag && (
        <img
          src={flag}
          className="w-4.5 h-3 rounded-xs object-cover ring-1 ring-black/10"
          alt={country}
        />
      )}
      <span className="tracking-wider leading-3">{country}</span>
    </div>
  );
}
