"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import PlaceholderMedia from "./PlaceholderMedia";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Homepage showreel.
 *
 * The file is 8.4MB, so it only starts once it's actually scrolled into view
 * and pauses again when it leaves — no point streaming it for a visitor who
 * never reaches it. It carries an audio track, so muted autoplay (the only
 * kind browsers allow) is paired with a sound toggle.
 */
export default function Showreel({
  src = "/showreel.mp4",
  poster = "/showreel-poster.jpg",
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Autoplay is a request, not a guarantee — browsers reject it freely.
  const attemptPlay = useCallback(() => {
    videoRef.current?.play().catch(() => {
      /* blocked by autoplay policy; the play button still works */
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reduced motion: never start on its own. Poster + play button only.
    if (prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attemptPlay();
        else video.pause();
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [attemptPlay]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) attemptPlay();
    else video.pause();
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  if (unavailable) {
    return (
      <PlaceholderMedia
        label="Showreel — add public/showreel.mp4"
        aspect="aspect-video"
        accent="from-[#CDE3E8] via-[#E9D9CE] to-[#F0C9C7]"
      />
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <video
        ref={videoRef}
        className="aspect-video w-full object-cover"
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setUnavailable(true)}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/45 to-transparent p-4">
        <button
          type="button"
          onClick={togglePlay}
          data-cursor="link"
          aria-label={playing ? "Pause showreel" : "Play showreel"}
          className="pointer-events-auto rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur transition-colors hover:bg-accent hover:text-background focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={toggleSound}
          data-cursor="link"
          aria-label={muted ? "Unmute showreel" : "Mute showreel"}
          className="pointer-events-auto rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur transition-colors hover:bg-accent hover:text-background focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}
