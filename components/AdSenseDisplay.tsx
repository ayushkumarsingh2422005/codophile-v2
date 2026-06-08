"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT_ID, ADSENSE_DEFAULT_SLOT } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdStatus = "pending" | "filled" | "unfilled";

type AdSenseDisplayProps = {
  className?: string;
  /** Ad unit slot from AdSense (defaults to Google’s sample slot for the test publisher). */
  adSlot?: string;
};

const AD_RESOLVE_TIMEOUT_MS = 4000;

function readAdStatus(ins: HTMLModElement): AdStatus {
  const status = ins.getAttribute("data-ad-status");
  if (status === "filled") return "filled";
  if (status === "unfilled") return "unfilled";

  const iframe = ins.querySelector("iframe");
  if (iframe && iframe.offsetHeight > 0) return "filled";

  return "pending";
}

export default function AdSenseDisplay({
  className = "",
  adSlot = ADSENSE_DEFAULT_SLOT,
}: AdSenseDisplayProps) {
  const clientId = ADSENSE_CLIENT_ID;
  const pushed = useRef(false);
  const insRef = useRef<HTMLModElement>(null);
  const [adStatus, setAdStatus] = useState<AdStatus>("pending");

  useEffect(() => {
    if (pushed.current || !insRef.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setAdStatus("unfilled");
    }
  }, []);

  useEffect(() => {
    const ins = insRef.current;
    if (!ins) return;

    const syncStatus = () => {
      setAdStatus((prev) => {
        const next = readAdStatus(ins);
        if (next === "pending") return prev;
        return next;
      });
    };

    const attrObserver = new MutationObserver(syncStatus);
    attrObserver.observe(ins, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });

    const childObserver = new MutationObserver(syncStatus);
    childObserver.observe(ins, { childList: true, subtree: true });

    syncStatus();

    const timeout = window.setTimeout(() => {
      setAdStatus((prev) => (prev === "pending" ? "unfilled" : prev));
    }, AD_RESOLVE_TIMEOUT_MS);

    return () => {
      attrObserver.disconnect();
      childObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  if (!clientId || !adSlot) return null;
  if (adStatus === "unfilled") return null;

  const isFilled = adStatus === "filled";

  return (
    <div
      className={
        isFilled
          ? `flex justify-center ${className}`
          : "fixed left-[-9999px] w-px h-px overflow-hidden opacity-0 pointer-events-none"
      }
      aria-hidden={!isFilled}
    >
      <div
        className={
          isFilled
            ? "w-full overflow-hidden rounded-xl border border-white/5 bg-white/4"
            : undefined
        }
      >
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
