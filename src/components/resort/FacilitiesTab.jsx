import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

function Section({ title, badge, children }) {
  return (
    <div className="bg-peak-card border border-white/5 rounded-xl p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-display font-bold text-peak-text text-base">{title}</h3>
        {badge && <span className="bg-peak-blue/10 text-peak-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
      <span className="text-peak-text-secondary">{label}</span>
      <span className={highlight ? "text-peak-green font-medium" : "text-peak-text font-medium"}>{value}</span>
    </div>
  );
}

export default function FacilitiesTab({ resort }) {
  const f = resort.facilities || {};

  return (
    <div className="space-y-4">
      {/* Restaurants */}
      <Section title="Restaurants on the mountain" badge={`${f.restaurants?.length || 0} venues`}>
        <div className="space-y-2">
          {(f.restaurants || []).map(r => (
            <div key={r.name} className="flex items-center justify-between bg-peak-surface rounded-xl px-4 py-3">
              <div>
                <p className="text-peak-text font-semibold text-sm">{r.name}</p>
                <p className="text-peak-text-secondary text-xs">{r.zone} · {r.cuisine}</p>
              </div>
              <span className="text-peak-text-secondary text-sm">{r.price}</span>
            </div>
          ))}
        </div>
        <Link to="/trip-planning" className="mt-3 inline-block text-xs text-peak-blue hover:underline">View all in Dining tab →</Link>
      </Section>

      {/* Ski school */}
      <Section title="Ski School" badge={`${f.skiSchools || 3} schools`}>
        <Row label="Group lesson from" value={`€${f.groupLessonFrom || 40}/person`} />
        <Row label="Private lesson from" value={`€${f.privateLessonFrom || 100}/hour`} />
        <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
          <span className="text-peak-text-secondary">Languages</span>
          <span className="flex gap-1 text-lg">{(f.languages || ["🇫🇷", "🇬🇧", "🇩🇪"]).join(" ")}</span>
        </div>
        <Link to="/trip-planning" className="mt-3 inline-block text-xs text-peak-blue hover:underline">Book lessons in Ski School tab →</Link>
      </Section>

      {/* Childcare */}
      <Section title="Childcare & Kids">
        {f.creche && <Row label={`Crèche / nursery (${f.crecheAgeMin}–${f.crecheAgeMax} yrs)`} value={`From €${f.crecheFrom}/day`} />}
        {f.kidsGarden && <Row label={`Kids ski garden (${f.kidsGardenAge})`} value="Available" highlight />}
        <Row label="Babysitting service" value={f.babysitting ? "Available" : "Not available"} highlight={f.babysitting} />
        <Row label="Stroller-friendly paths" value="Yes" highlight />
        <Row label="Kids menu" value="Available at all restaurants" highlight />
      </Section>

      {/* Storage */}
      <Section title="Locker & Storage">
        <Row label="Locker count" value={(f.lockerCount || 400).toLocaleString()} />
        <Row label="Sizes available" value={(f.lockerSizes || ["S", "M", "L"]).join(" / ")} />
        <Row label="Ski storage" value={f.skiStorage ? `Yes — from €${f.skiStorageFrom}/day` : "No"} highlight={f.skiStorage} />
        <Row label="Boot dryers" value={f.bootDryers ? "Yes" : "No"} highlight={f.bootDryers} />
        <Row label="Location" value="Base station + mid-mountain" />
        {resort.skiDepotUrl && (
          <a
            href={resort.skiDepotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-peak-blue text-sm hover:underline mt-2"
          >
            <ExternalLink className="w-4 h-4" />
            View all ski depot locations
          </a>
        )}
        <Link to="/trip-planning" className="mt-3 inline-block text-xs text-peak-blue hover:underline">Reserve storage in Storage tab →</Link>
      </Section>

      {/* Shops */}
      <Section title="Shops & Services">
        <Row label="Rental shops" value={`${f.rentalShops || 6} shops · ${(f.rentalBrands || []).join(", ")}`} />
        <Row label="Ski tuning & repair" value={f.skiTuning ? "Yes" : "No"} highlight={f.skiTuning} />
        <Row label="Clothing & gear shop" value={f.clothingShop ? "Yes" : "No"} highlight={f.clothingShop} />
        <Row label="Supermarket / convenience" value={f.supermarket ? "Yes" : "No"} highlight={f.supermarket} />
        <Row label="Medical centre / first aid" value={f.medicalCentre ? `Yes — ${f.medicalLocation}` : "No"} highlight={f.medicalCentre} />
        <Row label="Pharmacy" value={f.pharmacy ? "Yes" : "No"} highlight={f.pharmacy} />
        <Row label="ATM" value={f.atm ? `Yes — ${f.atmCount} locations` : "No"} highlight={f.atm} />
      </Section>

      {/* Snow cannons */}
      <Section title="Snow Cannons">
        <Row label="Total cannons" value={(resort.snowCannons || 80).toString()} />
        <Row label="Piste coverage" value={`${resort.snowCannonKm || 20}km (${Math.round(((resort.snowCannonKm || 20) / resort.pisteKm) * 100)}% of pistes)`} />
        <Row label="Altitude range" value={`${resort.minAltitude}–${Math.round(resort.maxAltitude * 0.7)}m`} />
        <Row label="Automated system" value="Yes" highlight />
        <Row label="Operating conditions" value="Active below -3°C" />
        <p className="text-peak-text-secondary text-xs mt-3">🔌 Connect API for real-time cannon status</p>
      </Section>
    </div>
  );
}