import React, { useEffect, useState, useRef } from 'react';
import Skeleton from '@/components/ui/Skeleton';
import { trackEvent } from '@/hooks/useAnalytics';
import styles from './PollingLocator.module.css';

export default function PollingLocator() {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkError, setSdkError] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null); // 'searching' | 'found' | 'not_found'
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const googleMap = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);

  /* ─── Load Maps SDK ─────────────────────────────────────────────── */
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === 'YOUR_MAPS_KEY_HERE') {
      setSdkError('Google Maps API key is missing or invalid.');
      return;
    }

    if (window.google && window.google.maps) {
      setSdkLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    // Script already injected — poll until google object is ready
    if (document.getElementById(scriptId)) {
      const poll = setInterval(() => {
        if (window.google && window.google.maps) {
          setSdkLoaded(true);
          clearInterval(poll);
        }
      }, 100);
      return () => clearInterval(poll);
    }

    // Handle Google Maps authentication failures gracefully
    window.gm_authFailure = () => {
      setSdkError('Google Maps API key is invalid or not authorized. Please check your Cloud Console configuration.');
      setSdkLoaded(false);
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setSdkLoaded(true);
    script.onerror = () => setSdkError('Failed to load Google Maps. Check your API key or network connection.');
    document.head.appendChild(script);
  }, []);

  /* ─── Initialise map + autocomplete ─────────────────────────────── */
  useEffect(() => {
    if (!sdkLoaded || !mapRef.current || !inputRef.current) return;

    googleMap.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 5,
      mapTypeId: 'roadmap',
    });

    infoWindowRef.current = new window.google.maps.InfoWindow();

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'in' },
      fields: ['geometry', 'name', 'formatted_address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        window.alert("No details available for: '" + place.name + "'");
        return;
      }

      trackEvent('polling_locator_search', {
        city_searched: place.name || place.formatted_address,
      });

      googleMap.current.setCenter(place.geometry.location);
      googleMap.current.setZoom(13);
      searchNearbyBooths(place.geometry.location, place.name || '');
    });
  }, [sdkLoaded]);

  /* ─── Marker helpers ─────────────────────────────────────────────── */
  const clearMarkers = () => {
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
  };

  const addMarker = (place) => {
    if (!place.geometry?.location) return;

    const marker = new window.google.maps.Marker({
      map: googleMap.current,
      position: place.geometry.location,
      title: place.name,
      animation: window.google.maps.Animation.DROP,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 9,
        fillColor: '#1A73E8',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
      },
    });

    markersRef.current.push(marker);

    marker.addListener('click', () => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      infoWindowRef.current.setContent(`
        <div style="padding:8px;max-width:220px;color:#202124;font-family:Google Sans,sans-serif;">
          <strong style="font-size:14px;">${place.name}</strong>
          <p style="margin:4px 0 8px;font-size:12px;color:#5f6368;">
            ${place.vicinity || place.formatted_address || ''}
          </p>
          <a href="https://maps.google.com/maps?daddr=${lat},${lng}"
             target="_blank" rel="noopener noreferrer"
             style="color:#1A73E8;font-size:12px;font-weight:500;text-decoration:none;">
            Get Directions →
          </a>
        </div>
      `);
      infoWindowRef.current.open(googleMap.current, marker);
    });
  };

  /* ─── Search logic ───────────────────────────────────────────────── */
  const searchNearbyBooths = (location, placeName) => {
    clearMarkers();
    setSearchStatus('searching');
    if (infoWindowRef.current) infoWindowRef.current.close();

    const service = new window.google.maps.places.PlacesService(googleMap.current);

    // ── Strategy 1: Text Search ──────────────────────────────────────
    // Most reliable — finds places explicitly named "polling booth"
    service.textSearch(
      { query: `polling booth ${placeName}`.trim(), location, radius: 5000 },
      (textResults, textStatus) => {
        if (
          textStatus === window.google.maps.places.PlacesServiceStatus.OK &&
          textResults?.length > 0
        ) {
          textResults.slice(0, 10).forEach(addMarker);
          setSearchStatus('found');
          return;
        }

        // ── Strategy 2: Nearby schools (most common polling venue) ───
        service.nearbySearch(
          { location, radius: 3000, type: 'school' },
          (schools, schoolStatus) => {
            const combined = [];
            if (schoolStatus === window.google.maps.places.PlacesServiceStatus.OK && schools) {
              combined.push(...schools);
            }

            // ── Strategy 3: Government offices ──────────────────────
            service.nearbySearch(
              { location, radius: 3000, type: 'local_government_office' },
              (govPlaces, govStatus) => {
                if (govStatus === window.google.maps.places.PlacesServiceStatus.OK && govPlaces) {
                  combined.push(...govPlaces);
                }

                if (combined.length === 0) {
                  setSearchStatus('not_found');
                  return;
                }

                // Deduplicate by place_id then render
                const seen = new Set();
                combined
                  .filter(p => p.place_id && !seen.has(p.place_id) && (seen.add(p.place_id) || true))
                  .slice(0, 10)
                  .forEach(addMarker);
                setSearchStatus('found');
              }
            );
          }
        );
      }
    );
  };

  /* ─── Render ─────────────────────────────────────────────────────── */
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Find Your Polling Station</h1>
      <p className={styles.subtitle}>
        Enter your city or locality to find nearby schools and government offices used as polling booths.
      </p>

      <div className={styles.searchContainer}>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Enter your city or address…"
          aria-label="Enter your address to find nearby polling stations"
          disabled={!sdkLoaded}
        />

        {searchStatus === 'searching' && (
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--md-on-surface-variant)' }}>
            🔍 Searching for polling stations nearby…
          </p>
        )}
        {searchStatus === 'found' && (
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--md-primary, #1A73E8)' }}>
            ✅ Polling stations found — click any marker for directions.
          </p>
        )}
        {searchStatus === 'not_found' && (
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#B00020' }}>
            No stations found nearby. Try a broader area or verify at{' '}
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">
              voters.eci.gov.in
            </a>.
          </p>
        )}
      </div>

      <div className={styles.mapContainer} aria-label="Google Map showing polling stations">
        {!sdkLoaded && !sdkError && (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
        {sdkError && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{sdkError}</p>
          </div>
        )}
        <div
          ref={mapRef}
          className={styles.mapElement}
          style={{ opacity: sdkLoaded ? 1 : 0 }}
          aria-hidden={!sdkLoaded}
        />
      </div>

      <div className={styles.chipsContainer}>
        <div className={styles.chip} aria-label="Disclaimer: Booths shown are approximate. Verify at voters.eci.gov.in">
          ⚠️ Booths shown are approximate. Verify at voters.eci.gov.in
        </div>
        <div className={styles.chip} aria-label="Voter Helpline: 1950 (Toll Free)">
          📞 Voter Helpline: 1950 (Toll Free)
        </div>
      </div>
    </div>
  );
}
