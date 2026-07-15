/** Ambient animated gradient backdrop. Purely decorative. */
export function MeshBackground() {
  return (
    <>
      <div className="mesh-bg" aria-hidden />
      <div
        className="grid-texture fixed inset-0 -z-10 opacity-40"
        aria-hidden
      />
    </>
  );
}
