import { useEffect, useRef, useState } from "react";

export default function CustomScrollbar() {
  const [scrollbar, setScrollbar] = useState({
    height: 0,
    top: 0,
    visible: false,
  });

  const dragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartTop = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateScrollbar() {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = scrollHeight - viewportHeight;

      if (maxScroll <= 0) {
        setScrollbar({ height: 0, top: 0, visible: false });
        return;
      }

      const trackHeight = trackRef.current?.clientHeight ?? viewportHeight;
      const thumbHeight = Math.max(
        36,
        (viewportHeight / scrollHeight) * trackHeight
      );

      const maxThumbTop = trackHeight - thumbHeight;
      const thumbTop =
        (window.scrollY / maxScroll) * maxThumbTop;

      setScrollbar({
        height: thumbHeight,
        top: thumbTop,
        visible: true,
      });
    }

    updateScrollbar();

    window.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);

    const observer = new ResizeObserver(updateScrollbar);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      observer.disconnect();
    };
  }, []);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();

    dragging.current = true;
    dragStartY.current = e.clientY;
    dragStartTop.current = scrollbar.top;

    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;

    const viewportHeight = window.innerHeight;
    const trackHeight = trackRef.current?.clientHeight ?? viewportHeight;
    const maxThumbTop = trackHeight - scrollbar.height;

    const scrollHeight = document.documentElement.scrollHeight;
    const maxScroll = scrollHeight - viewportHeight;

    const delta = e.clientY - dragStartY.current;

    const newTop = Math.max(
      0,
      Math.min(maxThumbTop, dragStartTop.current + delta)
    );

    window.scrollTo({
      top: (newTop / maxThumbTop) * maxScroll,
      behavior: "instant",
    });
  }

  function handlePointerUp() {
    dragging.current = false;
  }

  if (!scrollbar.visible) return null;

  return (
    <div
      ref={trackRef}
      className="fixed right-0 sm:right-1 md:right-4 top-20 bottom-40 md:bottom-30 md:bottom-25 z-[9999] flex w-4 justify-center"
      aria-hidden="true"
    >
      <div
        className="relative h-full w-full"
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPosition = e.clientY - rect.top;

            const maxThumbTop =
              rect.height - scrollbar.height;

            const newTop = Math.max(
              0,
              Math.min(
                maxThumbTop,
                clickPosition - scrollbar.height / 2
              )
            );

            const maxScroll =
              document.documentElement.scrollHeight - window.innerHeight;

            window.scrollTo({
              top: (newTop / maxThumbTop) * maxScroll,
              behavior: "smooth",
            });
          }
        }}
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute left-1/2 w-2 -translate-x-1/2 cursor-grab rounded-full bg-primary transition-[background-color,width] duration-200 hover:w-3 hover:bg-[var(--primary-glow)] active:cursor-grabbing"
          style={{
            height: scrollbar.height,
            top: scrollbar.top,
            touchAction: "none",
          }}
        />
      </div>
    </div>
  );
}