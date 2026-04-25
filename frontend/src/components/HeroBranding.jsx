export const HeroBranding = () => (
  <div style={{ position: "relative", width: 420, height: 480, flexShrink: 0 }}>
    <svg width="420" height="480" viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* Dot grid */}
      {Array.from({ length: 11 }, (_, row) =>
        Array.from({ length: 11 }, (_, col) => (
          <circle key={`${row}-${col}`}
            cx={col * 42} cy={row * 48}
            r={1.5} fill="#2A2210" opacity="0.9"
          />
        ))
      )}

      {/* Concentric motion rings */}
      <circle cx="210" cy="240" r="185" stroke="#1E1A09" strokeWidth="1"/>
      <circle cx="210" cy="240" r="148" stroke="#241E0A" strokeWidth="1"/>
      <circle cx="210" cy="240" r="110" stroke="#2A2210" strokeWidth="1"/>
      <circle cx="210" cy="240" r="74"  stroke="#2E2412" strokeWidth="1.5"/>
      <circle cx="210" cy="240" r="40"  stroke="#3A2E15" strokeWidth="1.5"/>

      {/* Sweeping speed arcs — gold */}
      <path d="M 232 154 A 92 92 0 0 1 296 204" fill="none" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" opacity="0.95"/>
      <path d="M 294 222 A 92 92 0 0 1 294 258" fill="none" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M 291 274 A 92 92 0 0 1 232 324" fill="none" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>
      <path d="M 248 136 A 118 118 0 0 1 322 210" fill="none" stroke="#A07828" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M 320 270 A 118 118 0 0 1 248 344" fill="none" stroke="#A07828" strokeWidth="1.5" strokeLinecap="round" opacity="0.2"/>

      {/* Logo block */}
      <rect x="158" y="196" width="104" height="88" rx="18" fill="#D4A843"/>
      <text x="210" y="265" textAnchor="middle"
        fontFamily="'Manrope', sans-serif" fontWeight="800"
        fontSize="62" fill="#0A0800" letterSpacing="-2">V</text>

      {/* Brand name + descriptor */}
      <text x="210" y="336" textAnchor="middle"
        fontFamily="'Manrope', sans-serif" fontWeight="800"
        fontSize="26" fill="#F0EDE8" letterSpacing="-1">velo</text>
      <text x="210" y="356" textAnchor="middle"
        fontFamily="'Manrope', sans-serif" fontWeight="500"
        fontSize="10" fill="#666666" letterSpacing="4">MESSAGE DELIVERY</text>

      {/* Status badges — human language only */}
      {/* Delivered — left */}
      <rect x="8" y="216" width="116" height="34" rx="17" fill="#111111" stroke="#2A2210" strokeWidth="1"/>
      <circle cx="26" cy="233" r="5" fill="#4ADE80"/>
      <text x="38" y="238" fontFamily="'Manrope', sans-serif" fontSize="11" fontWeight="600" fill="#F0EDE8">2,840 delivered</text>

      {/* Sending — right */}
      <rect x="298" y="186" width="114" height="34" rx="17" fill="#111111" stroke="#2A2210" strokeWidth="1"/>
      <circle cx="316" cy="203" r="5" fill="#D4A843"/>
      <text x="328" y="208" fontFamily="'Manrope', sans-serif" fontSize="11" fontWeight="600" fill="#F0EDE8">Sending now</text>

      {/* Scheduled — top */}
      <rect x="126" y="44" width="168" height="34" rx="17" fill="#111111" stroke="#2A2210" strokeWidth="1"/>
      <circle cx="144" cy="61" r="5" fill="#94A3B8"/>
      <text x="156" y="66" fontFamily="'Manrope', sans-serif" fontSize="11" fontWeight="600" fill="#F0EDE8">1,200 scheduled</text>

      {/* Queued — bottom */}
      <rect x="116" y="404" width="178" height="34" rx="17" fill="#111111" stroke="#2A2210" strokeWidth="1"/>
      <circle cx="134" cy="421" r="5" fill="#818CF8"/>
      <text x="146" y="426" fontFamily="'Manrope', sans-serif" fontSize="11" fontWeight="600" fill="#F0EDE8">480 in the queue</text>

      {/* Leader lines */}
      <line x1="124" y1="233" x2="166" y2="240" stroke="#2A2210" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="298" y1="203" x2="276" y2="228" stroke="#2A2210" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="210" y1="78" x2="210" y2="162" stroke="#2A2210" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="210" y1="404" x2="210" y2="318" stroke="#2A2210" strokeWidth="1" strokeDasharray="3 3"/>
    </svg>
  </div>
);